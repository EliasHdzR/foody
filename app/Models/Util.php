<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Util extends Model
{
    public static function formatDate($value){
        return Carbon::parse($value)->format('d-m-Y H:i:s');
    }
}
