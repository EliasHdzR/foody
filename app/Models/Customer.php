<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $fillable = [
        'user_id',
        'address',
        'house_number',
        'suburb',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function reviews(): HasMany {
        return $this->hasMany(Review::class);
    }

    public function reports(): HasMany {
        return $this->hasMany(Report::class);
    }

    public function orders(): HasMany {
        return $this->hasMany(Order::class);
    }
}
