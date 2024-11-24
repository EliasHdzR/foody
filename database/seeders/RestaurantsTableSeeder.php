<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('restaurants')->insert([
            [
                'id' => 1,
                'user_id' => 1, // Asegúrate de que el usuario con ID 1 existe en la tabla `users`.
                'category_id' => 1, // Asegúrate de que esta categoría existe.
                'name' => 'Restaurante Italiano',
                'image_url' => 'italiano.jpg',
                'address' => 'Calle Principal 123',
                'city' => 'Ciudad A',
                'state' => 'Estado A',
                'opening_time' => '10:00:00',
                'close_time' => '22:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'user_id' => 1, // O el ID de otro usuario válido.
                'category_id' => 2, // Asegúrate de que esta categoría existe.
                'name' => 'Hamburguesería Americana',
                'image_url' => 'americana.jpg',
                'address' => 'Avenida Secundaria 456',
                'city' => 'Ciudad B',
                'state' => 'Estado B',
                'opening_time' => '11:00:00',
                'close_time' => '23:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
