<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->format('d-m-Y H:i:s');
    }

    public function index(){
        $categories = ProductCategory::orderBy('name')->get();
        return Inertia::render('RestaurantViews/Categories/Index', [
            'categories' => $categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'stock' => $category->stock,
                    'created_at' => $this->getCreatedAtAttribute($category->created_at),
                    'updated_at' => $this->getCreatedAtAttribute($category->updated_at)
                ];
            }),
        ]);
    }

    public function store(StoreRequest $request){
        $restaurantId = auth()->user()->restaurant->id;
        $data = $request->only('name');
        $data['restaurant_id'] = $restaurantId;
        ProductCategory::create($data);
    }

    public function update(StoreRequest $request, ProductCategory $category){
        $data = $request->all();
        $category->update($data);
    }

    public function destroy(ProductCategory $category){
        $category->delete();
    }
}
