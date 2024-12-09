<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function index()
    {
        $restaurantId = auth()->user()->restaurant->id;
        $products = Product::with(['category',  'ingredients' => function($query) {
            $query->select('ingredients.id', 'ingredients.name', 'ingredients.stock','products_ingredients.quantity');
        }])->where('restaurant_id', $restaurantId)->get();
        return Inertia::render('RestaurantViews/Products/Index', [
            'products' => $products,
            'restaurantID' => auth()->user()->restaurant->id,
            'ingredients' => auth()->user()->restaurant->ingredients,
            'productCategories' => auth()->user()->restaurant->productCategories,
        ]);
    }

    public function store(Request $request)
    {
        $restaurantId = auth()->user()->restaurant->id;
        $data = $request->validate([
            'code' => 'required|string|max:20|unique:products',
            'name' => 'required|string|max:255',
            'product_category_id' => 'required',
            'price' => 'required|numeric|min:1',
            'ingredients' => 'required|array',
            'ingredients.*.id' => 'required|exists:ingredients,id|distinct',
            'ingredients.*.quantity' => 'required|numeric|min:1',
            'description' => 'required|string',
            'image' => 'mimes:png,jpg,jpeg,max:2048',
        ]);

        DB::beginTransaction();

        try {
            $data['code'] = strtoupper($restaurantId . '-' . $data['code']);
            $image = $request->file('image');
            $image_url = $image->store('product_images/restaurant_'.$restaurantId, ['disk' => 'public']);
            $data['image_url'] = $image_url;

            $data['restaurant_id'] = $restaurantId;
            $product = Product::create($data);
            foreach ($request->ingredients as $ingredient) {
                $product->ingredients()->attach($ingredient['id'], ['quantity' => $ingredient['quantity']]);
            }

            $product->load('ingredients');
            $product->updateAvailability();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function update(Request $request, Product $product)
    {
        $restaurantId = auth()->user()->restaurant->id;
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:1',
            'product_category_id' => 'required',
            'description' => 'required|string',
            'ingredients' => 'required|array',
            'ingredients.*.id' => 'required|exists:ingredients,id',
            'ingredients.*.quantity' => 'required|numeric|min:1',
            'image' => 'sometimes|nullable|mimes:png,jpg,jpeg|max:2048',
        ]);

        DB::beginTransaction();

        try {
            if($request->hasFile('image')){
                Storage::disk('public')->delete($product->image_url);
                $image = $request->file('image');
                $image_url = $image->store('product_images/restaurant_'.$restaurantId, ['disk' => 'public']);
                $data['image_url'] = $image_url;
            }

            $product->update($data);

            $ingredientsData = [];
            foreach ($request->ingredients as $ingredient) {
                $ingredientsData[$ingredient['id']] = ['quantity' => $ingredient['quantity']];
            }
            $product->ingredients()->sync($ingredientsData);

            $product->load('ingredients');
            $product->updateAvailability();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function destroy(Product $product)
    {
        $image_url = $product->image_url;
        Storage::disk('public')->delete($image_url);
        $product->delete();
    }
}
