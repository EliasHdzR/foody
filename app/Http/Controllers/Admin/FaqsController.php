<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faqs\StoreRequest;
use App\Models\FAQ;
use Inertia\Inertia;

class FaqsController extends Controller
{
    public function index(){
        $faqs = FAQ::orderBy('id')->get();
        return Inertia::render('AdminViews/Faqs/Index', ['faqs' => $faqs]);
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
