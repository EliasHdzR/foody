<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function index()
    {
        $ingredients = auth()->user()->restaurant->ingredients;
        $products = auth()->user()->restaurant->products;
        return Inertia::render('RestaurantViews/Products/Index', [
            'products' => $products,
            'restaurantID' => auth()->user()->restaurant->id,
            'ingredients' => $ingredients,
        ]);
    }

    public function store(Request $request)
    {
        $restaurantId = auth()->user()->restaurant->id;

        DB::beginTransaction();

        try {
            $data = $request->validate([
                'code' => 'required|string|max:20',
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:1',
                'ingredients' => 'required|array',
                'ingredients.*.id' => 'required|exists:ingredients,id',
                'ingredients.*.quantity' => 'required|numeric|min:1',
                'description' => 'required|string',
                'image' => 'nullable|image',
            ]);
            $data['restaurant_id'] = $restaurantId;
            $product = Product::create($data);

            foreach ($request->ingredients as $ingredient) {
                $product->ingredients()->attach($ingredient['id'], ['quantity' => $ingredient['quantity']]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function update(Request $request, Product $product)
    {
        DB::beginTransaction();

        try {
            $data = $request->validate([
                'code' => 'required|string|max:20',
                'name' => 'required|string|max:255',
                'type' => 'required|string',
                'price' => 'required|numeric|min:1',
                'description' => 'required|string',
                'ingredients' => 'required|array',
                'image' => 'nullable|image',
            ]);
            $product->update($data);

            $product->ingredients()->sync($request->ingredients);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function destroy(Product $product)
    {
        $product->delete();
    }
}
