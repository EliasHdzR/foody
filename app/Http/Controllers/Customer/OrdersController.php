<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function index()
    {
        $orders = auth()->user()->customer->orders->load('customer', 'restaurant', 'products');
        return inertia('CustomerViews/OrdersPage', ['orders' => $orders]);
    }

    
    public function fetchOrders()
    {
        $orders = auth()->user()->customer->orders()->with(['restaurant', 'products' => function ($query) {
            $query->withPivot('quantity', 'sale_price');
        }])->get();

        \Log::info($orders); // Log the orders to verify the data

        return response()->json($orders);
    }

    public function cancelOrder(Request $request, $orderId)
    {
        try {
            $order = auth()->user()->customer->orders()->with(['products' => function ($query) {
                $query->withPivot('quantity', 'sale_price');
            }])->findOrFail($orderId);
            $order->status = 'canceled_customer';
            $order->save();

            \Log::info('Order canceled successfully', ['order' => $order]);

            return response()->json(['status' => 'success', 'order' => $order]);
        } catch (\Exception $e) {
            \Log::error('Error canceling order', ['error' => $e->getMessage()]);
            return response()->json(['status' => 'error', 'message' => 'Error canceling order'], 500);
        }
    }
}
