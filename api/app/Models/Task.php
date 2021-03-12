<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Task extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['all_files'];

    public function getAllFilesAttribute()
    {
        $FilesArr = [];
        $Files = $this->files();
        foreach ($Files as $File)
        {
            $FilesArr[$File->type][] = $File;
        }

        return $FilesArr;
    }

    public function assigned_user()
    {
        return $this->belongsTo(User::class, 'assigned', 'userid');
    }

    public function files()
    {
       return $this->hasMany(File::class, 'task', 'id');
    }

    public function updates()
    {
        return $this->hasMany(TaskUpdate::class, 'task', 'id');
    }

    protected static function booted()
    {
        static::creating(function ($Task) {
            $Task->inserton = Carbon::now();
        });
    }
}
