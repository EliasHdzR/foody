<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Models\Driver;
use App\Models\User;
use Inertia\Inertia;

class DriversController extends Controller
{
    public function index() {
        $drivers = Driver::with('user:id,name,email,phone_number')->orderBy('id')->get();
        return Inertia::render('AdminViews/Drivers/Index', [
            'drivers' => $drivers->map(function ($driver) {
                return [
                    'id' => $driver->id,
                    'user_name' => $driver->user->name,
                    'email' => $driver->user->email,
                    'phone_number' => $driver->user->phone_number,
                    'shift_start' => $driver->shift_start,
                    'shift_end' => $driver->shift_end,
                ];
            }),
        ]);
    }
    
    public function destroy(Driver $driver) {
    $user = $driver->user;

    if ($user) {
        $user->delete();
    }
    }
}
