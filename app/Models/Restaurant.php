<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restaurant extends Model
{
    protected $fillable = [
        'name',
        'image_url',
        'phone_number',
        'address',
        'neighborhood',
        'city',
        'state',
        'postal_code',
    ];

    protected $guarded = [
        'id',
        'user_id',
        'category_id',
        'created_at',
        'updated_at',
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
}
