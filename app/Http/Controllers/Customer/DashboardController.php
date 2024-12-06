<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::orderBy('name')->get();
        $restaurants->load('products', 'category');

        $categories =  Category::orderBy('name')->get();

        foreach ($categories as $category) {
            $category->restaurants_count = $restaurants->where('category_id', $category->id)->count();
        }

        return Inertia::render('CustomerViews/Dashboard', [
            'restaurants' => $restaurants,
            'categories' => $categories
        ]);
    }
}
