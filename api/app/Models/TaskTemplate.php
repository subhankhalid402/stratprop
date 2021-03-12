<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskTemplate extends Model
{
    use HasFactory;

    protected $table = 'tasktemplate';
    public $timestamps = false;
    protected $guarded = [];
}
