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
            ['restaurant_id' => 1,
             'name' => 'Zanahoria',
             'stock' => 10,
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['restaurant_id' => 3,
             'name' => 'Manzana',
             'stock' => 20,
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['restaurant_id' => 1,
             'name' => 'Kiwi',
             'stock' => 30,
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['restaurant_id' => 1,
             'name' => 'Papa',
             'stock' => 40,
             'created_at' => now(),
             'updated_at' => now(),
            ],
            ['restaurant_id' => 2,
                'name' => 'Tomate',
                'stock' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            ['restaurant_id' => 2,
                'name' => 'Harina',
                'stock' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            ['restaurant_id' => 3,
                'name' => 'Queso',
                'stock' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            ['restaurant_id' => 3,
                'name' => 'Chorizo',
                'stock' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
