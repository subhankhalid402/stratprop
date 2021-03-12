<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectCashflow extends Model
{
    use HasFactory;

    protected $table = 'projectcashflow';
    public $timestamps = false;
    protected $guarded = [];
}
