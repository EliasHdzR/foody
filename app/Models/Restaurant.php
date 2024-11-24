<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restaurant extends Model
{
    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'image_url',
        'address',
        'city',
        'state',
        'opening_time',
        'close_time',
    ];

    public function category(): BelongsTo {
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function products(): HasMany {
        return $this->hasMany(Product::class);
    }

    public function coupons(): HasMany {
        return $this->hasMany(Coupon::class);
    }

    public function ingredients(): HasMany {
        return $this->hasMany(Ingredient::class);
    }
}
