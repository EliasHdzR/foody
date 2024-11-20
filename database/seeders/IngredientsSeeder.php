<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IngredientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ingredients')->insert([
            ['name' => 'Zanahoria',
             'stock' => 10],
            ['name' => 'Manzana',
             'stock' => 20],
            ['name' => 'Kiwi',
             'stock' => 30],
            ['name' => 'Papa',
             'stock' => 40],
        ]);
    }
}
