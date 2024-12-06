<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Comida China','image_url' => '', 'created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Italiana','image_url' => '', 'created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Mexicana','image_url' => '', 'created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Rápida','image_url' => '', 'created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida India','image_url' => '', 'created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Japonesa','image_url' => '', 'created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Árabe','image_url' => '', 'created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Peruana','image_url' => '', 'created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Española','image_url' => '', 'created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Francesa','image_url' => '', 'created_at' => now(),'updated_at' => now()],
        ]);
    }
}
