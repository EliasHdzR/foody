<?php
namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrdersController extends Controller
{
    public function index()
    {
        $orders = auth()->user()->driver->orders->load('customer', 'restaurant', 'products');
        return inertia('DriverViews/Orders/Index', ['orders' => $orders]);
    }

    public function acceptOrder($id)
    {
        Log::info("Accept order request received for order ID: $id");

        $order = Order::findOrFail($id);
        Log::info("Order status before update: {$order->status}");

        if ($order->status === 'awaiting') {
            $order->status = 'on_way';
            $order->save();
            Log::info("Order status after update: {$order->status}");
        }

        return response()->json(['message' => 'Order accepted successfully']);
    }

    public function rejectOrder($id)
    {
        Log::info("Reject order request received for order ID: $id");

        $order = Order::findOrFail($id);
        Log::info("Order status before update: {$order->status}");

        if ($order->status === 'awaiting') {
            $order->status = 'canceled_driver';
            $order->save();
            Log::info("Order status after update: {$order->status}");
        }

        return response()->json(['message' => 'Order rejected successfully']);
    }

    public function deliverOrder($id)
    {
        Log::info("Deliver order request received for order ID: $id");

        $order = Order::findOrFail($id);
        Log::info("Order status before update: {$order->status}");

        if ($order->status === 'on_way') {
            $order->status = 'delivered';
            $order->save();
            Log::info("Order status after update: {$order->status}");
        }

        return response()->json(['message' => 'Order delivered successfully']);
    }
}