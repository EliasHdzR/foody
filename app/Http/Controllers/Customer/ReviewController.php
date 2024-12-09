<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function storeDriverReview(Request $request)
    {
        $request->validate([
            'driver_id' => 'required|exists:drivers,id',
            'rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string|max:300',
        ]);

        $review = Review::create([
            'customer_id' => auth()->user()->customer->id,
            'driver_id' => $request->driver_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json(['status' => 'success', 'review' => $review]);
    }
}