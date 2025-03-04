<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreRequest;
use App\Models\Category;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->format('d-m-Y H:i:s');
    }

    public function index(){
        $categories = Category::orderBy('name')->get();
        return Inertia::render('AdminViews/Categories/Index', [
            'categories' => $categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'image_url' => $category->image_url,
                    'created_at' => $this->getCreatedAtAttribute($category->created_at),
                    'updated_at' => $this->getCreatedAtAttribute($category->updated_at)
                ];
            }),
        ]);
    }

    public function store(StoreRequest $request){
        $data = $request->validate(
            [
                'name' => 'required|string|max:30',
            ]
        );

        DB::beginTransaction();

        try {
            Category::create($data);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
        }

    }

    public function update(StoreRequest $request, Category $category){
        $data = $request->validate(
            [
                'name' => 'required|string|max:30',
            ]
        );

        DB::beginTransaction();

        try {
            $category->update($data);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
        }

        $category->update($data);
    }

    public function destroy(Category $category){
        $category->delete();
    }
}
