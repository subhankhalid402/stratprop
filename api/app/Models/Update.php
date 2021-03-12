<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Update extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $guarded = [];

    public function getInsertonAttribute($value)
    {
        return Carbon::parse($value)->format('F j, Y, g:i a');
    }

    protected static function booted()
    {
        static::creating(function ($Update) {
            $Update->insertby = Auth::user()->userid;
            $Update->inserton = Carbon::now();
        });
    }
}
