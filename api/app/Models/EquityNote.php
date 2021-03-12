<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquityNote extends Model
{
    use HasFactory;
    protected $table = 'equitynotes';
    public $timestamps = false;
    protected $guarded = [];

    public function getInsertonAttribute($value)
    {
        return Carbon::parse($value)->format('F j, Y, g:i a');
    }

    public function insertby_user()
    {
        return $this->belongsTo(User::class, 'insertby', 'userid');
    }

}
