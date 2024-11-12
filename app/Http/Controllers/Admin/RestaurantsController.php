<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RestaurantsController extends Controller
{
    public function index(): Response {
        return Inertia::render('AdminViews/Restaurants', [
            'restaurants' => Restaurant::all()->map(function ($restaurant) {
                return [
                    'id' => $restaurant->id,
                    'name' => $restaurant->name,
                    'phone_number' => $restaurant->phone_number,
                    'address' => $restaurant->address,
                    'neighborhood' => $restaurant->neighborhood,
                    'city' => $restaurant->city,
                    'state' => $restaurant->state,
                    'postal_code' => $restaurant->postal_code,
                ];
            })
        ]);
    }
}
