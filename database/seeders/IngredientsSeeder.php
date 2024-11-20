<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
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
             'stock' => 10,
             'created_at' => Carbon::now(),
             'updated_at' => Carbon::now(),
            ],
            ['name' => 'Manzana',
             'stock' => 20,
             'created_at' => Carbon::now(),
             'updated_at' => Carbon::now(),
            ],
            ['name' => 'Kiwi',
             'stock' => 30,
             'created_at' => Carbon::now(),
             'updated_at' => Carbon::now(),
            ],
            ['name' => 'Papa',
             'stock' => 40,
             'created_at' => Carbon::now(),
             'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
