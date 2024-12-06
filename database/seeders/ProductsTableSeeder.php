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
                'image_url' => 'product_images/restaurant_1/2vFRagHBKJvy6S4OjWM2dq1yWWXmjQr3gCia4Tz4.jpg',
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
                'image_url' => 'product_images/restaurant_1/UooDD8OM5XTWY37Lpse6pP6pK0rGeOOnsJZYKXH7.jpg',
                'description' => 'Crispy bread topped with fresh tomatoes and basil.',
                'price' => 6.99,
                'availability' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 2, // Ensure this restaurant exists in the `restaurants` table
                'product_category_id' => 1, // Ensure this category exists in the `product_categories` table
                'code' => 'PROD0w01',
                'name' => 'Spaghetti',
                'image_url' => 'product_images/restaurant_1/2vFRagHBKJvy6S4OjWM2dq1yWWXmjQr3gCia4Tz4.jpg',
                'description' => 'Delicious spaghetti with creamy carbonara sauce.',
                'price' => 12.99,
                'availability' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 2, // Ensure this restaurant exists in the `restaurants` table
                'product_category_id' => 2, // Ensure this category exists in the `product_categories` table
                'code' => 'PROD00g2',
                'name' => 'Pizza Margherita',
                'image_url' => 'product_images/restaurant_1/UooDD8OM5XTWY37Lpse6pP6pK0rGeOOnsJZYKXH7.jpg',
                'description' => 'Crispy bread topped with fresh tomatoes and basil.',
                'price' => 6.99,
                'availability' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 3, // Ensure this restaurant exists in the `restaurants` table
                'product_category_id' => 1, // Ensure this category exists in the `product_categories` table
                'code' => 'PRODn00d1',
                'name' => 'Pescado con papas',
                'image_url' => 'product_images/restaurant_1/2vFRagHBKJvy6S4OjWM2dq1yWWXmjQr3gCia4Tz4.jpg',
                'description' => 'Delicious spaghetti with creamy carbonara sauce.',
                'price' => 12.99,
                'availability' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 3, // Ensure this restaurant exists in the `restaurants` table
                'product_category_id' => 2, // Ensure this category exists in the `product_categories` table
                'code' => 'PROD0j02',
                'name' => 'Margherita',
                'image_url' => 'product_images/restaurant_1/UooDD8OM5XTWY37Lpse6pP6pK0rGeOOnsJZYKXH7.jpg',
                'description' => 'Crispy bread topped with fresh tomatoes and basil.',
                'price' => 6.99,
                'availability' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
