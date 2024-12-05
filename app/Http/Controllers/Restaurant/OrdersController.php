<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrdersController extends Controller
{
    public function index()
    {
        $restaurant = auth()->user()->restaurant;
        $orders = $restaurant->orders;
        $orders->load('customer.user', 'products', 'driver.user');
        return Inertia::render('RestaurantViews/Orders/Index', [
            'orders' => $orders,
        ]);
    }
}
