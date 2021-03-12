<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'token',
    ];

    protected $guarded = [];

    public $timestamps = false;

    public function getImageAttribute($value)
    {
        return 'https://portfolio.stratprop.com.au/' . $value;
    }

    public function getVideoAttribute()
    {
        return 'https://www.loom.com/embed/01749945ecf843ad9a2bc66c9107574b';
    }

    public function user_projects()
    {
        return $this->hasMany(Project::class, 'customer', 'userid')->with('tasks');
    }

    public function portfolios()
    {
        return $this->hasMany(Project::class, 'customer', 'userid')->where('type', 'portfolio')->with('tasks');
    }

    protected static function booted()
    {
        static::creating(function ($User) {
            $User->token = strtotime('now')  . sha1($User->username);
            $User->userid = substr(sha1($User->username), 0, 7);
            $User->inserton = Carbon::now();
            $User->insertby = Auth::user()->userid;
        });
    }
}
