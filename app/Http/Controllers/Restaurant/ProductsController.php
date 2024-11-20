<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function index($restaurantId)
    {
        $products = Product::where('restaurant_id', $restaurantId)->orderBy(column: 'id')->get();
        return Inertia::render('RestaurantViews/Products/Index', ['products' => $products]);
    }

    public function store(Request $request, $restaurantId)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'image' => 'nullable|image',
        ]);
        $data['restaurant_id'] = $restaurantId;
        Product::create($data);
    }

    public function update(Request $request, $restaurantId, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'image' => 'nullable|image',
        ]);
        $product->update($data);
    }

    public function destroy($restaurantId, Product $product)
    {
        $product->delete();
    }
}