<?php

namespace App\Http\Controllers;

use App\Models\UserRoadmap;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class RoadmapController extends Controller
{
    use SoftDeletes;

    public function myRoadmaps()
    {
        return UserRoadmap::where('user_id', Auth::user()->id)->latest()->get();
    }
}
