<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $table = 'product_categories';
    protected $fillable = [
        'restaurant_id',
        'name',
    ];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }

    public function products() {
        return $this->hasMany(Product::class);
    }
}
