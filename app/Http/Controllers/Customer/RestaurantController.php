<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index(Restaurant $restaurant)
    {
        return inertia('CustomerViews/Tiendas', [
            'restaurant' => $restaurant->load('products', 'coupons')
        ]);
    }
}
