<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use App\Models\Task;
use App\Models\Update;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    public function allFiles()
    {
        return File::whereHas('project', function ($q) {
            $q->where('customer', Auth::user()->userid);
        })
            ->orWhere('insertby', Auth::user()->userid)->orderBy('id')->with(['project', 'task'])->get();
    }

    public function addFile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
                'message' => $validator->errors()->first()
            ]);
        }

        $file = File::uploadFile('file', 'images/files');
        if(!$file)
        {
            return response()->json([
                'code' => 400,
                'message' => 'Bad Request'
            ]);
        }

        $Task = Task::find($request->taskid);

        $File = File::create([
            'name' => $request->name,
            'task' => $request->taskid ? $request->taskid : NULL,
            'project' => $Task ? $Task->project: NULL,
            'file' => $file,
            'insertby' => Auth::user()->userid
        ]);

        if($Task)
        {
        $Project = Project::firstWhere('projectid', $File->project);

            Update::create([
                'user' => $Project->customer,
                'type' => 'File',
                'content' => "A New File has been added to the " . $Task->name . " Task in the Project <a href='my-project.php?projectid=" . $Task->project . "'>" . $Project->title . "</a>."
            ]);
        }
        else
        {
            Update::create([
                'user' => Auth::user()->userid,
                'type' => 'File',
                'content' => "A New File has been added"
            ]);
        }

        return response()->json([
            'code' => 200,
            'message' => 'File Uploaded Successfully'
        ]);
    }
}
