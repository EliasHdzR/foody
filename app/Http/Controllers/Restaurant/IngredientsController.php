<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Models\Ingredient;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IngredientsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $ingredients = auth()->user()->restaurant->ingredients;
        return Inertia::render('RestaurantViews/Ingredients/Index', ['ingredients' => $ingredients]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'stock' => 'required|numeric',
        ]);
        $data['restaurant_id'] = auth()->user()->restaurant->id;
        Ingredient::create($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ingredient $ingredient)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'stock' => 'required|numeric',
        ]);
        $ingredient->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ingredient $ingredient)
    {
        $ingredient->delete();
    }
}
