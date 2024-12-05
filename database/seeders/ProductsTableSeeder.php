<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'restaurant_id' => 1, // Ensure this restaurant exists in the `restaurants` table
                'product_category_id' => 1, // Ensure this category exists in the `product_categories` table
                'code' => 'PROD001',
                'name' => 'Spaghetti Carbonara',
                'image_url' => 'product_images/restaurant_1/spaghetti_carbonara.jpg',
                'description' => 'Delicious spaghetti with creamy carbonara sauce.',
                'price' => 12.99,
                'availability' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 1, // Ensure this restaurant exists in the `restaurants` table
                'product_category_id' => 2, // Ensure this category exists in the `product_categories` table
                'code' => 'PROD002',
                'name' => 'Bruschetta',
                'image_url' => 'product_images/restaurant_1/bruschetta.jpg',
                'description' => 'Crispy bread topped with fresh tomatoes and basil.',
                'price' => 6.99,
                'availability' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}