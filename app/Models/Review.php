<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    protected $fillable = [
        "rating",
        "comment",
    ];

    public function customer(): BelongsTo {
        return $this->belongsTo(Customer::class);
    }

    public function product(): BelongsTo {
        return $this->belongsTo(Product::class);
    }

    public function driver(): BelongsTo {
        return $this->belongsTo(Driver::class);
    }
}
