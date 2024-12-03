<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RestaurantsController extends Controller
{
    public function index(): Response {
        $restaurants = Restaurant::orderBy('id', 'desc')->get();
        $restaurants->load('user','category');
        return Inertia::render('AdminViews/Restaurants/Index', [
            'restaurants' => $restaurants
        ]);
    }

    public function indexProducts($id): Response {
        $restaurant = Restaurant::find($id);
        $products = Product::with(['category',  'ingredients' => function($query) {
            $query->select('ingredients.id', 'ingredients.name', 'ingredients.stock','products_ingredients.quantity');
        }])->where('restaurant_id', $id)->get();
        return Inertia::render('AdminViews/Restaurants/restaurant-products', [
            'products' => $products,
            'productCategories' => $restaurant->productCategories,
        ]);
    }

    public function indexOrders($id): Response {
        $restaurant = Restaurant::find($id);
        $orders = $restaurant->orders;
        $orders->load('customer', 'products', 'restaurant');
        return Inertia::render('AdminViews/Restaurants/restaurant-orders', [
            'orders' => $orders,
        ]);
    }
}
