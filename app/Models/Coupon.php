<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Coupon extends Model
{
    protected $fillable = [
        'restaurant_id',
        'code',
        'discount',
        'discount_percent',
        'expires_at'
    ];

    public function restaurant(): BelongsTo {
        return $this->belongsTo(Restaurant::class);
    }
}
