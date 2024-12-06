<?php
namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

    public function acceptOrder($id)
    {
        Log::info("Accept order request received for order ID: $id");

        $order = Order::findOrFail($id);
        Log::info("Order status before update: {$order->status}");

        if ($order->status === 'pending') {
            $order->status = 'accepted';
            $order->save();
            Log::info("Order status after update: {$order->status}");
        }

        return response()->json(['message' => 'Order accepted successfully']);
    }

    public function cancelOrder($id)
    {
        Log::info("Cancel order request received for order ID: $id");

        $order = Order::findOrFail($id);
        Log::info("Order status before update: {$order->status}");

        if ($order->status === 'pending') {
            $order->status = 'canceled_restaurant';
            $order->save();
            Log::info("Order status after update: {$order->status}");
        }

        return response()->json(['message' => 'Order canceled successfully']);
    }

    public function awaitingOrder($id)
    {
        Log::info("Awaiting order request received for order ID: $id");

        $order = Order::findOrFail($id);
        Log::info("Order status before update: {$order->status}");

        if ($order->status === 'accepted') {
            $order->status = 'awaiting';
            $order->save();
            Log::info("Order status after update: {$order->status}");
        }

        return response()->json(['message' => 'Order set to awaiting successfully']);
    }
}