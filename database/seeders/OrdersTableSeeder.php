<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('orders')->insert([
            [
                'customer_id' => 1, // Ensure this customer exists in the `customers` table
                'restaurant_id' => 1, // Ensure this restaurant exists in the `restaurants` table
                'driver_id' => 1, // Ensure this driver exists in the `drivers` table
                'number' => 'ORD0001',
                'status' => 'pending',
                'subtotal' => 19.98,
                'shipping_cost' => 10.00,
                'taxes' => 1.00,
                'discount' => 0.00,
                'total_price' => 19.98,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'customer_id' => 1, // Ensure this customer exists in the `customers` table
                'restaurant_id' => 1, // Ensure this restaurant exists in the `restaurants` table
                'driver_id' => 2, // Ensure this driver exists in the `drivers` table
                'number' => 'ORD0002',
                'status' => 'pending',
                'subtotal' => 12.99,
                'shipping_cost' => 2.00,
                'taxes' => 1.00,
                'discount' => 2.00,
                'total_price' => 10.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}