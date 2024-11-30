<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Driver extends Model
{
    protected $fillable = [
        'user_id',
        'shift_start',
        'shift_end',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function orders(): HasMany {
        return $this->hasMany(Order::class);
    }

    public function reviews(): HasMany {
        return $this->hasMany(Review::class);
    }

    public static function getAvailableDriver(){
        $drivers = Driver::all();
        foreach ($drivers as $driver) {
            $order = Order::where('driver_id', $driver->id)
                ->orderBy('updated_at', 'desc')
                ->first();

            if($order == null){
                return $driver;
            }

            if($order->status == 'delivered' || $order->status == 'canceled_restaurant' || $order->status == 'canceled_driver' ||
                $order->status == 'canceled_customer'){
                return $driver;
            }
        }

        return null;
    }
}
