<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Driver;
use App\Models\Order;
use App\Models\Product;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::count();
        $customers = Customer::count();
        $products = Product::count();
        $drivers = Driver::count();
        $orderCounts = DB::table('orders')
            ->select(
                DB::raw('COUNT(*) as total_orders'),
                DB::raw('SUM(CASE WHEN status = "delivered" THEN 1 ELSE 0 END) as completed_orders'),
                DB::raw('SUM(CASE WHEN status IN ("canceled_restaurant", "canceled_customer", "canceled_driver") THEN 1 ELSE 0 END) as canceled_orders'),
                DB::raw('SUM(CASE WHEN status NOT IN ("canceled_restaurant", "canceled_customer", "canceled_driver", "delivered") THEN 1 ELSE 0 END) as in_progress_orders')
            )
            ->first();

        $counters = [
            'restaurants' => $restaurants,
            'customers' => $customers,
            'products' => $products,
            'drivers' => $drivers,
            'orders' => $orderCounts,
        ];

        $orders = DB::table('orders')
            ->join('restaurants', 'orders.restaurant_id', '=', 'restaurants.id')
            ->join('categories', 'restaurants.category_id', '=', 'categories.id')
            ->select(
                'categories.name as category_name',
                DB::raw('DATE_FORMAT(orders.created_at, "%Y-%m") as month'),
                DB::raw('COUNT(orders.id) as order_count')
            )
            ->groupBy('categories.name', DB::raw('DATE_FORMAT(orders.created_at, "%Y-%m")'))
            ->orderByDesc(DB::raw('COUNT(orders.id)'))
            ->limit(3)
            ->get();

        $restaurants = DB::table('restaurants')
            ->join('orders', 'restaurants.id', '=', 'orders.restaurant_id')
            ->select(
                'restaurants.name as name',
                DB::raw('COUNT(orders.id) as orders'),
                DB::raw('SUM(CASE
                        WHEN orders.status NOT IN ("canceled_restaurant", "canceled_customer", "canceled_driver", "delivered")
                        THEN 1 ELSE 0 END) as inProgress'),
                DB::raw('SUM(orders.total_price) as total')
            )
            ->groupBy('restaurants.name')
            ->orderByDesc(DB::raw('COUNT(orders.id)'))
            ->limit(3)
            ->get();

        $products = DB::table('order_details')
            ->join('products', 'order_details.product_id', '=', 'products.id')
            ->join('restaurants', 'products.restaurant_id', '=', 'restaurants.id')
            ->select(
                'products.name',
                DB::raw('COUNT(order_details.product_id) as total_sold'),
                'products.image_url as image',
                'restaurants.name as store'
            )
            ->groupBy('products.name', 'products.image_url', 'restaurants.name')
            ->orderByDesc('total_sold')
            ->limit(3)
            ->get();

        return Inertia::render('AdminViews/Dashboard', [
            'counters' => $counters,
            'orders' => $orders,
            'restaurants' => $restaurants,
            'products' => $products,
        ]);
    }
}
