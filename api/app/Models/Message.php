<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $guarded = [];

    public function sender()
    {
        return $this->belongsTo(User::class, 'user', 'userid');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'convid', 'userid');
    }

    public function replyto_user()
    {
        return $this->belongsTo(User::class, 'replyto', 'userid');
    }

    public function user_obj()
    {
        return $this->belongsTo(User::class, 'user', 'userid');
    }
}
