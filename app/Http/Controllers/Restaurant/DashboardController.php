<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $productsCount = Product::where('restaurant_id', auth()->user()->restaurant->id)
            ->count();
        $orderCounts = DB::table('orders')
            ->select(
                DB::raw('COUNT(*) as total_orders'),
                DB::raw('SUM(CASE WHEN status = "delivered" THEN 1 ELSE 0 END) as completed_orders'),
                DB::raw('SUM(CASE WHEN status IN ("canceled_restaurant", "canceled_customer", "canceled_driver") THEN 1 ELSE 0 END) as canceled_orders'),
                DB::raw('SUM(CASE WHEN status NOT IN ("canceled_restaurant", "canceled_customer", "canceled_driver", "delivered") THEN 1 ELSE 0 END) as in_progress_orders')
            )
            ->where('restaurant_id', auth()->user()->restaurant->id)
            ->first();

        $ordersByDay = Order::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('restaurant_id', auth()->user()->restaurant->id)
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($order) {
                return [
                    'x' => $order->date,
                    'y' => $order->count,
                ];
            });

        $topSellingProducts = Product::withCount('orders')
            ->orderBy('orders_count', 'desc')
            ->where('restaurant_id', auth()->user()->restaurant->id)
            ->take(3)
            ->get();

        return inertia('RestaurantViews/Dashboard', [
            'productsCount' => $productsCount,
            'orderCounts' => $orderCounts,
            'ordersByDay' => $ordersByDay,
            'topSellingProducts' => $topSellingProducts,
        ]);
    }
}
