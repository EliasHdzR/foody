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
                'restaurant_id' => 1,
                'code' => 'PIZZA01',
                'name' => 'Pizza Margarita',
                'image_url' => 'pizza_margarita.jpg',
                'description' => 'Pizza clásica con tomate, albahaca y queso mozzarella.',
                'price' => 12.99,
                'availability' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 1,
                'code' => 'PASTA01',
                'name' => 'Pasta Alfredo',
                'image_url' => 'pasta_alfredo.jpg',
                'description' => 'Pasta cremosa con salsa Alfredo y queso parmesano.',
                'price' => 10.50,
                'availability' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 2,
                'code' => 'BURGER01',
                'name' => 'Hamburguesa Clásica',
                'image_url' => 'hamburguesa_clasica.jpg',
                'description' => 'Hamburguesa con carne de res, queso cheddar y salsa especial.',
                'price' => 8.99,
                'availability' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 2,
                'code' => 'SALAD01',
                'name' => 'Ensalada César',
                'image_url' => 'ensalada_cesar.jpg',
                'description' => 'Ensalada fresca con lechuga, aderezo César y crutones.',
                'price' => 6.50,
                'availability' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
