<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'dante',
            'email' => 'dante@correo.com',
            'password' => bcrypt('12345678'),
            'role' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::factory()->create([
            'name' => 'elias',
            'email' => 'elias@correo.com',
            'password' => bcrypt('pruebita'),
            'role' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::factory()->create([
            'name' => 'elias',
            'email' => 'elias@customer.com',
            'password' => bcrypt('pruebita'),
            'role' => 'customer',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::factory()->create([
            'name' => 'elias',
            'email' => 'elias@restaurante.com',
            'password' => bcrypt('pruebita'),
            'role' => 'restaurant',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->call([
            CategoriesSeeder::class,
            RestaurantsTableSeeder::class,
            IngredientsSeeder::class,
            ProductCategorySeeder::class,
        ]);
    }
}
