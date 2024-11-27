<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faqs\StoreRequest;
use Illuminate\Support\Carbon;
use App\Models\FAQ;
use Inertia\Inertia;

class FaqsController extends Controller
{
    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->format('d-m-Y H:i:s');
    }

    public function index(){
        $faqs = FAQ::orderBy('id')->get();
        return Inertia::render('AdminViews/Faqs/Index', [
            'faqs' => $faqs->map(function ($faq) {
                return [
                    'id' => $faq->id,
                    'question' => $faq->question,
                    'answer' => $faq->answer,
                    'created_at' => $this->getCreatedAtAttribute($faq->created_at),
                    'updated_at' => $this->getCreatedAtAttribute($faq->updated_at)
                ];
            }),
        ]);
    }

    public function store(StoreRequest $request){
        $data = $request->only(['question', 'answer']);
        FAQ::create($data);
    }

    public function update(StoreRequest $request, FAQ $faq){
        $data = $request->all();
        $faq->update($data);
    }

    public function destroy(FAQ $faq){
        $faq->delete();
    }
}
