<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Ingredient extends Model
{
    protected $fillable = [
        'name',
        'stock',
    ];

    public function products(): BelongsToMany {
        return $this->belongsToMany(Product::class, 'products_ingredients')
                    ->withPivot('quantity')
                    ->as('makes')
                    ->withTimestamps();
    }
}
