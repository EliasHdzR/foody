<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IngredientsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $ingredients = Ingredient::orderBy('id')->get();
        return Inertia::render('RestaurantViews/Ingredients/Index', ['ingredients' => $ingredients]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->only('name', 'stock');
        Ingredient::create($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRequest $request, Ingredient $ingredient)
    {
        $data = $request->all();
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
