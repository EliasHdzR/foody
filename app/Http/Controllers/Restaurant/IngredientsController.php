<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Models\Ingredient;
use Illuminate\Container\Attributes\Auth;
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
        $ingredients = auth()->user()->restaurant->ingredients;
        return Inertia::render('RestaurantViews/Ingredients/Index', [
            'ingredients' => $ingredients->map(function ($ingredient) {
                return [
                    'id' => $ingredient->id,
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

        $products = $ingredient->products;
        $products->each(function ($product) {
            $product->updateAvailability();
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ingredient $ingredient)
    {
        $products = $ingredient->products;
        $products->each(function ($product) {
            $product->delete();
        });
        $ingredient->delete();
    }
}
