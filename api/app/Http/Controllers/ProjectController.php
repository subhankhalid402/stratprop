<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskTemplate;
use App\Models\Update;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function myProjects()
    {
        return Project::where('customer', Auth::user()->userid)->orderBy('id', 'desc')->get();
    }

    public function myProject(Request $request)
    {
        $projectid = $request->projectid ? $request->projectid : Project::firstWhere('customer', Auth::user()->userid);

        return Project::with('tasks')->firstWhere('projectid', $projectid);
    }

    public function addProject(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'date' => 'required',
            'address' => 'required',
            'description' => 'required',
            'image' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
                'message' => $validator->errors()->first()
            ]);
        }

        $Project = Project::create([
            'projectid' => substr(sha1(strtotime("now")), 0, 7),
            'image' => File::uploadFile('attachment', 'images/messages'),
            'address' => $request->address,
            'customer' => Auth::user()->userid,
            'title' => $request->title,
            'date' => $request->date,
            'description' => $request->description,
            'insertby' => Auth::user()->userid,
        ]);

        $TaskTemplates = TaskTemplate::orderBy('taskno')->get();

        $taskno = 1;

        foreach ($TaskTemplates as $TaskTemplate)
        {
            Task::create([
                'taskno' => $taskno,
                'name' => $TaskTemplate->name,
                'description' => $TaskTemplate->description,
                'project' => $Project->projectid,
            ]);

            $taskno++;
        }

        Update::create([
            'user' => Auth::user()->userid,
            'type' => 'Project',
            'content' => "New Project <a href='my-project.php?projectid=".$Project->projectid."'>".$Project->title."</a> Added"
        ]);

        return response()->json([
            'code' => 200,
            'message' => 'Project Added Successfully'
        ]);
    }

    public function myPortfolios()
    {
        return Project::where('customer', Auth::user()->userid)->where('type', 'portfolio')->orderBy('portfolio_created')->get();
    }
}
