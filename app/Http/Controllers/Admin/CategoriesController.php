<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Models\Category;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    public function index(){
        $categories = Category::orderBy('id')->get();
        return Inertia::render('AdminViews/Categories/Index', ['categories' => $categories]);
    }

    public function store(StoreRequest $request){
        $data = $request->only('name');
        Category::create($data);
    }

    public function update(StoreRequest $request, Category $category){
        $data = $request->all();
        $category->update($data);
    }

    public function destroy(Category $category){
        $category->delete();
    }
}
