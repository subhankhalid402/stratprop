<?php

namespace App\Http\Controllers;

use App\Models\Update;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpdateController extends Controller
{
    public function allUpdates()
    {
        return Update::where('user', Auth::user()->userid)->orderBy('id')->get();
    }
}
