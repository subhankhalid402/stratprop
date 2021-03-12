<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectPdf extends Model
{
    use HasFactory;
    protected $table = 'projectpdfs';
    public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['url'];

    public function getInsertonAttribute($value)
    {
        return Carbon::parse($value)->format('F j, Y, g:i a');
    }

    public function getUrlAttribute()
    {
        return 'https://portfolio.stratprop.com.au/' . $this->file;
    }
}
