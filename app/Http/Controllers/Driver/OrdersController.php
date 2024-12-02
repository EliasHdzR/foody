<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function index()
    {
        $orders = auth()->user()->driver->orders->load('customer', 'restaurant', 'products');
        return inertia('DriverViews/Orders/Index', ['orders' => $orders]);
    }
}
