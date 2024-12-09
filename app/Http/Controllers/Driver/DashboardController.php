<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $activeOrder = Order::where('driver_id', auth()->user()->driver->id)
            ->where('status', '!=', 'delivered')
            ->where('status', '!=', 'canceled_restaurant')
            ->where('status', '!=', 'canceled_driver')
            ->where('status', '!=', 'canceled_customer')
            ->orderBy('created_at', 'desc')
            ->first();

        if($activeOrder){
            $activeOrder->load('restaurant', 'customer', 'driver');
        }

        $ordersByMonth = Order::selectRaw('MONTH(created_at) as month, COUNT(*) as total_orders')
            ->where('driver_id', auth()->user()->driver->id)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $ordersByRestaurant = Order::select('restaurant_id', DB::raw('count(*) as total_orders'))
            ->where('driver_id', auth()->user()->driver->id)
            ->groupBy('restaurant_id')
            ->orderBy('total_orders', 'desc')
            ->with('restaurant')
            ->get()
            ->map(function ($order) {
                return [
                    'Nombre' => $order->restaurant->name,
                    'Ordenes' => $order->total_orders,
                ];
            });

        return inertia('DriverViews/Dashboard', [
            'activeOrder' => $activeOrder,
            'ordersByRestaurant' => $ordersByRestaurant,
            'ordersByMonth' => $ordersByMonth,
        ]);
    }
}
