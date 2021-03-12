<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class File extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $guarded = [];

    protected $appends = ['url'];

    public function getUrlAttribute()
    {
        return 'https://portfolio.stratprop.com.au/' . $this->file;
    }

    public function getInsertonAttribute($value)
    {
        return Carbon::parse($value)->format('F j, Y, g:i a');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project', 'projectid');
    }

    public function task()
    {
        return $this->belongsTo(Task::class, 'task', 'id');
    }

    public static function uploadFile($file, $path)
    {
        $file_tmp_name = $_FILES[$file]['tmp_name'];
        $file_name = $_FILES[$file]['name'];
        $file_text = pathinfo($file_name, PATHINFO_EXTENSION);
        $file_path = $path . '/' . sha1($file_name . strtotime("now")) . '.' . $file_text;
             move_uploaded_file($file_tmp_name, public_path() . '/../../' . $file_path);
        try {
        } catch (\Exception $exception) {

        }
        return  $file_path;
    }

    protected static function booted()
    {
        static::creating(function ($File) {
            $File->insertby = Auth::user()->userid;
            $File->inserton = Carbon::now();
        });
    }
}
