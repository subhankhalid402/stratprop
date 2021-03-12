<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskUpdate extends Model
{
    use HasFactory;

    protected $table = 'taskupdates';
    protected $guarded = [];
    public $timestamps = false;

    public function getInsertonAttribute($value)
    {
        return Carbon::parse($value)->format('F j, Y, g:i a');
    }
}
