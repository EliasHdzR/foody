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
        'availability',
        'restaurant_id'
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
}```php
/**
 * The attributes that are mass assignable.
 *
 * @var array
 */
protected $fillable = [
    'code',
    'name',
    'image_url',
    'description',
    'price',
    'availability',
    'restaurant_id'
];

/**
 * Get the restaurant that the product belongs to.
 *
 * @return BelongsTo
 */
public function restaurant(): BelongsTo
{
    return $this->belongsTo(Restaurant::class);
}

/**
 * Get the orders that the product is associated with.
 *
 * @return BelongsToMany
 */
public function orders(): BelongsToMany
{
    return $this->belongsToMany(Order::class, 'order_details')
                ->withPivot('quantity', 'sale_price')
                ->as('soldIn')
                ->withTimestamps();
}

/**
 * Get the ingredients that the product is made with.
 *
 * @return BelongsToMany
 */
public function ingredients(): BelongsToMany
{
    return $this->belongsToMany(Ingredient::class, 'products_ingredients')
                ->withPivot('quantity')
                ->as('madeWith')
                ->withTimestamps();
}

/**
 * Get the reviews that the product has.
 *
 * @return HasMany
 */
public function reviews(): HasMany
{
    return $this->hasMany(Review::class);
}
```