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
            ['name' => 'Comida China','created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Italiana','created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Mexicana','created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Rápida','created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida India','created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Japonesa','created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Árabe','created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Peruana','created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Española','created_at' => now(),'updated_at' => now()],
            ['name' => 'Comida Francesa','created_at' => now(),'updated_at' => now()],
        ]);
    }
}
