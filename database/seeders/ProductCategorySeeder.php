<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('product_categories')->insert([
            [
                'restaurant_id' => 1, // Asegúrate de que el restaurante con ID 1 existe en la tabla `restaurants`.
                'name' => 'Plato Principal',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 1, // Asegúrate de que el restaurante con ID 1 existe en la tabla `restaurants`.
                'name' => 'Entrada',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 1, // Asegúrate de que el restaurante con ID 1 existe en la tabla `restaurants`.
                'name' => 'Complementos',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 1, // Asegúrate de que el restaurante con ID 1 existe en la tabla `restaurants`.
                'name' => 'Bebidas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 1, // Asegúrate de que el restaurante con ID 1 existe en la tabla `restaurants`.
                'name' => 'Postres',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
