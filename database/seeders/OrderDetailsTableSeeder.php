<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderDetailsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('order_details')->insert([
            [
                'order_id' => 1, // Ensure this order exists in the `orders` table
                'product_id' => 1, // Ensure this product exists in the `products` table
                'quantity' => 1,
                'sale_price' => 12.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 1, // Ensure this order exists in the `orders` table
                'product_id' => 2, // Ensure this product exists in the `products` table
                'quantity' => 1,
                'sale_price' => 6.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => 2, // Ensure this order exists in the `orders` table
                'product_id' => 1, // Ensure this product exists in the `products` table
                'quantity' => 1,
                'sale_price' => 12.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}