<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    protected $fillable = [
        'number',
        'message',
        'status',
    ];

    public function customer(): BelongsTo {
        return $this->belongsTo(Customer::class);
    }
}
