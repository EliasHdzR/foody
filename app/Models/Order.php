<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    protected $fillable = [
        'number',
        'status',
        'subtotal',
        'discount',
        'total_price',
        'customer_id',
        'driver_id',
        'restaurant_id',
        'shipping_cost',
        'taxes'
    ];

    public function customer(): BelongsTo {
        return $this->belongsTo(Customer::class);
    }

    public function driver(): BelongsTo {
        return $this->belongsTo(Driver::class);
    }

    public function restaurant(): BelongsTo {
        return $this->belongsTo(Restaurant::class);
    }

    public function products(): BelongsToMany {
        return $this->belongsToMany(Product::class, 'order_details')
                    ->withPivot('quantity', 'sale_price')
                    ->as('sold')
                    ->withTimestamps();
    }
}
