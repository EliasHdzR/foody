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
        $restaurants = Restaurant::orderBy('id', 'desc')->get();
        return Inertia::render('AdminViews/Restaurants/Index', [
            'restaurants' => $restaurants
        ]);
    }
}
