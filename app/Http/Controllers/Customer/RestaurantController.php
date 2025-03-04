<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Driver;
use App\Models\Order;
use App\Models\Product;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestaurantController extends Controller
{
    public function index(Restaurant $restaurant)
    {
        $restaurant = $restaurant->load('coupons', 'productCategories','category','user');
        $products = Product::with(['category'])
            ->where('restaurant_id', $restaurant->id)
            ->where('availability', 1)
            ->get();
        return inertia('CustomerViews/Tiendas', [
            'restaurant' => $restaurant,
            'products' => $products,
        ]);
    }

    public function store(Request $request, Restaurant $restaurant)
    {
        $data = $request->validate([
            'ownerName' => 'required|string',
            'cardNumber' => 'required|numeric|digits:16',
            'expirationDate' => 'required|date|after:today',
            'cvv' => 'required|numeric|digits:3',
            'cartItems' => 'required|array',
            'cartItems.*.id' => 'required|exists:products,id',
            'cartItems.*.quantity' => 'required|integer|min:1',
            'cartItems.*.price' => 'required|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
            'shipping_cost' => 'required|numeric|min:0',
            'taxes' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {
            $user = auth()->User();
            $driver = Driver::getAvailableDriver();

            $order = Order::create([
                'customer_id' => $user->customer->id,
                'restaurant_id' => $restaurant->id,
                'driver_id' => $driver->id,
                'number' => time(),
                'status' => 'pending',
                'subtotal' => $data['subtotal'],
                'shipping_cost' => $data['shipping_cost'],
                'taxes' => $data['taxes'],
                'discount' => $data['discount'],
                'total_price' => $data['total_price'],
            ]);

            foreach ($data['cartItems'] as $item) {
                $order->products()->attach($item['id'], [
                    'quantity' => $item['quantity'],
                    'sale_price' => $item['price'],
                ]);

                $product = Product::find($item['id']);
                $product->reduceIngredientsStock();
            }

            DB::commit();
            return redirect()->route('cliente.orders.index')->with('success', 'Order created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
        }
    }

    public function getRestaurantDetailsByOrder($orderId)
    {
        $order = Order::findOrFail($orderId);
        $restaurant = Restaurant::select('image_url', 'name', 'category_id', 'address')
            ->where('id', $order->restaurant_id)
            ->firstOrFail();

        $category = Category::select('name')
            ->where('id', $restaurant->category_id)
            ->firstOrFail();

        $restaurant->category_name = $category->name;

        return response()->json($restaurant);
    }
}
