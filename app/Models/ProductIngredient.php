<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductIngredient extends Model
{
    protected $table = 'products_ingredients';
    protected $fillable = [
        'quantity'
    ];

    public function ingredient(): BelongsTo {
        return $this->belongsTo(Ingredient::class);
    }

    public function product(): BelongsTo {
        return $this->belongsTo(Product::class);
    }
}
