<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Project extends Model
{
    use HasFactory;

    protected $appends = ['is_completed', 'completion_rate', 'total_equity'];
    public $timestamps = false;
    protected $guarded = [];


    public function getImageAttribute($value)
    {
        return 'https://portfolio.stratprop.com.au/' . $value;
    }

    public function getIsCompletedAttribute()
    {
        $Task = Task::select(DB::raw("COUNT(id) AS total, SUM(status) AS status"))->firstWhere('project', $this->projectid);
        return ($Task && ($Task->total * 5 != $Task->status)) ? false : true;
    }

    public function getTotalEquityAttribute()
    {
        return $this->equities()->sum('amount');
    }

    public function getCompletionRateAttribute()
    {
        $Task = Task::select(DB::raw("COUNT(id) AS total, SUM(status) AS status"))->firstWhere('project', $this->projectid);

        return $Task && $Task->total ? $Task->status / ($Task->total * 5) * 100 : 0;
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'project', 'projectid')
            ->with(['assigned_user', 'files', 'updates'])
            ->orderBy('taskno');
    }

    public function equitynotes()
    {
        return $this->hasMany(EquityNote::class, 'project', 'projectid')->orderBy('inserton', 'desc')->with('insertby_user');
    }

    public function pdfs()
    {
        return $this->hasMany(ProjectPdf::class, 'project', 'projectid')->orderBy('inserton', 'desc');
    }

    public function equities()
    {
        return $this->hasMany(ProjectEquity::class, 'project', 'projectid')->orderBy('inserton', 'desc')->with('insertby_user');
    }

    protected static function booted()
    {
        static::creating(function ($Project) {
            $Project->insertby = Auth::user()->userid;
            $Project->inserton = Carbon::now();
        });
    }
}
