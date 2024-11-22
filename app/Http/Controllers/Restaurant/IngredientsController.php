<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class IngredientsController extends Controller
{
    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->format('d-m-Y H:i:s');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(){
        $ingredients = Ingredient::orderBy('id')->get();
        return Inertia::render('RestaurantViews/Ingredients/Index', [
            'ingredients' => $ingredients->map(function ($ingredient) {
                return [
                    'name' => $ingredient->name,
                    'stock' => $ingredient->stock,
                    'created_at' => $this->getCreatedAtAttribute($ingredient->created_at),
                    'updated_at' => $this->getCreatedAtAttribute($ingredient->updated_at)
                ];
            }),
        ]);
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
