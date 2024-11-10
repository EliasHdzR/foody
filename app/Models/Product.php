<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'code',
        'name',
        'image_url',
        'description',
        'price',
        'availability'
    ];

    public function restaurant(): BelongsTo {
        return $this->belongsTo(Restaurant::class);
    }

    public function orders(): BelongsToMany {
        return $this->belongsToMany(Order::class, 'order_details')
                    ->withPivot('quantity', 'sale_price')
                    ->as('soldIn')
                    ->withTimestamps();
    }

    public function ingredients(): BelongsToMany {
        return $this->belongsToMany(Ingredient::class, 'products_ingredients')
                    ->withPivot('quantity')
                    ->as('madeWith')
                    ->withTimestamps();
    }

    public function reviews(): HasMany {
        return $this->hasMany(Review::class);
    }
}
