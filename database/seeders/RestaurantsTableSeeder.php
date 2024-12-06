<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'elias',
            'email' => 'elias1@restaurante.com',
            'password' => bcrypt('pruebita'),
            'role' => 'restaurant',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('restaurants')->insert([
            [
                'id' => 1,
                'user_id' => 4, // Asegúrate de que el usuario con ID 1 existe en la tabla `users`.
                'category_id' => 1, // Asegúrate de que esta categoría existe.
                'name' => 'KFC',
                'image_url' => 'restaurant_images/UHKbJi1U4dKfRNJqPm8gzU888a365EKr97RNXZyh.jpg',
                'address' => 'Calle Principal 123',
                'city' => 'Ciudad A',
                'state' => 'Estado A',
                'opening_time' => '10:00:00',
                'close_time' => '22:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('restaurants')->insert([
            [
                'id' => 2,
                'user_id' => 7, // Asegúrate de que el usuario con ID 1 existe en la tabla `users`.
                'category_id' => 1, // Asegúrate de que esta categoría existe.
                'name' => 'Dominos Pizza',
                'image_url' => 'restaurant_images/TefKNHUpqGP9id7dcvkfy07ASojHW68DCDTs1Kph.png',
                'address' => 'Calle Principal 123',
                'city' => 'Ciudad A',
                'state' => 'Estado A',
                'opening_time' => '10:00:00',
                'close_time' => '22:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        User::factory()->create([
            'name' => 'elias',
            'email' => 'elias2@restaurante.com',
            'password' => bcrypt('pruebita'),
            'role' => 'restaurant',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('restaurants')->insert([
            [
                'id' => 3,
                'user_id' => 8, // Asegúrate de que el usuario con ID 1 existe en la tabla `users`.
                'category_id' => 1, // Asegúrate de que esta categoría existe.
                'name' => 'KFC 2',
                'image_url' => 'restaurant_images/UHKbJi1U4dKfRNJqPm8gzU888a365EKr97RNXZyh.jpg',
                'address' => 'Calle Principal 123',
                'city' => 'Ciudad A',
                'state' => 'Estado A',
                'opening_time' => '10:00:00',
                'close_time' => '22:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
