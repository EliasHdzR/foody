<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (range(1, 15) as $i) {
            // Crear usuario
            $user = User::factory()->create([
                'name' => "driver$i",
                'email' => "driver$i@driver.com",
                'password' => bcrypt('pruebita'),
                'role' => 'driver',
            ]);

            // Crear conductor asociado
            DB::table('drivers')->insert([
                'user_id' => $user->id,
                'shift_start' => now(),
                'shift_end' => now()->addHours(8),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

    }
}
