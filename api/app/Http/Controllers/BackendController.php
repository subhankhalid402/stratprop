<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Models\File;
use App\Models\Message;
use App\Models\Project;
use App\Models\ProjectEquity;
use App\Models\Roadmap;
use App\Models\Task;
use App\Models\TaskTemplate;
use App\Models\TaskUpdate;
use App\Models\Update;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BackendController extends Controller
{
    public function allUsers()
    {
        return [
            'code' => 200,
            'data' => User::where('role', 'User')->get()
        ];
    }

    public function singleUser($id)
    {
        $User = User::with(['user_projects', 'portfolios'])->firstWhere('id', $id);
        $User->all_files = File::whereHas('project', function ($q) use ($User) {
            $q->where('customer', $User->userid);
        })
            ->orWhere('insertby', $User->userid)->orderBy('id')->with(['project', 'task'])->get();

        return [
            'code' => 200,
            'data' => $User
        ];
    }

    public function allStaffs()
    {
        $output = [
            'code' => 200,
            'data' => User::where('role', 'Staff')->get()
        ];
        return response()->json($output);
    }

    public function storeStaff(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            $output = [
                'code' => 404,
                'message' => $validator->errors()->first()
            ];
            return response()->json($output);
        }

        $agent = new User;
        $agent->firstname = $request->firstname;
        $agent->lastname = $request->lastname;
        $agent->username = $request->username;
        $agent->email = $request->email;
        $agent->phone = $request->phone;
        $agent->password = $request->password;
        $agent->status = $request->status;
        $agent->role = 'Staff';
        $agent->image = 'user_avatar.png';

        $agent->role = 'agent';
        if ($agent->save()) {
            $output = [
                'code' => 200,
                'message' => 'Staff Added Successfully'
            ];
            return response()->json($output);
        }
    }

    public function showStaff($id)
    {
        $output = [
            'code' => 200,
            'data' => User::find($id)
        ];
        return response()->json($output);
    }

    public function updateStaff(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username,' . $request->id,
        ]);

        if ($validator->fails()) {
            $output = [
                'code' => 404,
                'message' => $validator->errors()->first()
            ];
            return response()->json($output);
        }

        $agent = User::find($request->id);
        $agent->firstname = $request->firstname;
        $agent->lastname = $request->lastname;
        $agent->username = $request->username;
        $agent->email = $request->email;
        $agent->phone = $request->phone;

        if (empty($request->password))
            unset($request->password);

        $agent->status = $request->status;
        if ($agent->save()) {
            $output = [
                'code' => 200,
                'message' => 'Staff Updated Successfully'
            ];
            return response()->json($output);
        }
    }

    public function deleteStaff(Request $request)
    {
        User::find($request->id)->delete();

        $output = [
            'code' => 200,
            'message' => 'Staff Deleted Successfully',
            'data' => User::where('role', 'agent')->get()
        ];
        return response()->json($output);
    }


    /*
     * Task Template
     * */

    public function allTaskTemplates()
    {
        $output = [
            'code' => 200,
            'data' => TaskTemplate::orderBy('taskno')->get()
        ];
        return response()->json($output);
    }

    public function storeTaskTemplate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'taskno' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $output = [
                'code' => 404,
                'message' => $validator->errors()->first()
            ];
            return response()->json($output);
        }

        $task_template = new TaskTemplate;
        $task_template->name = $request->name;
        $task_template->taskno = $request->taskno;
        $task_template->description = $request->description;
        $task_template->insertby = Auth::user()->userid;
        $task_template->inserton = Carbon::now();
        if ($task_template->save()) {
            $this->reArrangeTaskTemplateOrder();
            $output = [
                'code' => 200,
                'message' => 'Task Template Added Successfully'
            ];
            return response()->json($output);
        }
    }

    public function showTaskTemplate($id)
    {
        $output = [
            'code' => 200,
            'data' => TaskTemplate::find($id)
        ];
        return response()->json($output);
    }

    public function updateTaskTemplate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'taskno' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $output = [
                'code' => 404,
                'message' => $validator->errors()->first()
            ];
            return response()->json($output);
        }

        $task_template = TaskTemplate::find($request->id);
        $task_template->name = $request->name;
        $task_template->taskno = $request->taskno;
        $task_template->description = $request->description;
        if ($task_template->save()) {

            $this->reArrangeTaskTemplateOrder();
            $output = [
                'code' => 200,
                'message' => 'Task Template Updated Successfully'
            ];
            return response()->json($output);
        }
    }

    public function deleteTaskTemplate(Request $request)
    {
        TaskTemplate::find($request->id)->delete();

        $output = [
            'code' => 200,
            'message' => 'Task Template Deleted Successfully',
            'data' => TaskTemplate::all()
        ];
        return response()->json($output);
    }

    /*
     * Project
     * */

    public function allProjects()
    {
        $output = [
            'code' => 200,
            'data' => Project::where('type', 'project')->get()
        ];
        return response()->json($output);
    }

    public function allPortfolios()
    {
        $output = [
            'code' => 200,
            'data' => Project::where('type', 'portfolio')->orderBy('portfolio_created')->get()
        ];
        return response()->json($output);
    }

    public function storeProject(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'date' => 'required'
        ]);

        if ($validator->fails()) {
            $output = [
                'code' => 404,
                'message' => $validator->errors()->first()
            ];
            return response()->json($output);
        }

        $Project = new Project;
        $Project->title = $request->title;
        $Project->description = $request->description;
        $Project->address = $request->address;
        $Project->date = $request->date;
        $Project->status = $request->status;
        $Project->insertby = Auth::user()->userid;
        $Project->inserton = Carbon::now();
        $Project->projectid = substr(sha1(strtotime("now")), 0, 7);
        $Project->customer = $request->customer;
        $Project->status = 'Active';

        if (!empty($_FILES['image']['name']))
            $Project->image = File::uploadFile('image', 'images/messages');

        $TaskTemplates = TaskTemplate::orderBy('taskno')->get();

        $taskno = 1;

        foreach ($TaskTemplates as $TaskTemplate) {
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
            'content' => "New Project <a href='my-project.php?projectid=" . $Project->projectid . "'>" . $Project->title . "</a> Added"
        ]);


        if ($Project->save()) {
            $output = [
                'code' => 200,
                'message' => 'Project Added Successfully'
            ];
            return response()->json($output);
        }
    }

    public function showProject($id)
    {
        $project = Project::with(['tasks', 'equitynotes', 'pdfs', 'equities'])->where('id', $id)->first();
        $project->last_equity = $project->equities->last();

        $output = [
            'code' => 200,
            'data' => $project
        ];
        return response()->json($output);
    }

    public function updateProject(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
        ]);

        if ($validator->fails()) {
            $output = [
                'code' => 404,
                'message' => $validator->errors()->first()
            ];
            return response()->json($output);
        }

        $project = Project::find($request->id);
        $project->title = $request->title;
        $project->description = $request->description;
        $project->address = $request->address;
        $project->date = $request->date;

        if ($request->customer)
            $project->customer = $request->customer;


        /*if (!empty($request->image))
            $project->image = ImageHelper::saveBase64($request->image, 'images/projects');*/

        if ($project->save()) {
            $output = [
                'code' => 200,
                'message' => 'Project Updated Successfully'
            ];
            return response()->json($output);
        }
    }

    public function moveToPortfolio(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'type' => 'required',
        ]);

        if ($validator->fails()) {
            $output = [
                'code' => 404,
                'message' => $validator->errors()->first()
            ];
            return response()->json($output);
        }

        $project = Project::find($request->id);
        $project->type = $request->type;
        $project->portfolio_created = Carbon::now();

        if ($project->save()) {
            $output = [
                'code' => 200,
                'message' => 'Project moved to portfolio Successfully'
            ];
            return response()->json($output);
        }
    }

    public function setProjectTarget(Request $request)
    {
        $project = Project::find($request->id);
        $project->equity_target = $request->equity_target;
        $project->cashflow_target = $request->cashflow_target;

        if ($project->save()) {
            $output = [
                'code' => 200,
                'message' => 'Portfolio Targets Set Successfully'
            ];
            return response()->json($output);
        }
    }

    public function deleteProject(Request $request)
    {
        Project::find($request->id)->delete();

        $output = [
            'code' => 200,
            'message' => 'Project Deleted Successfully',
            'data' => Project::all()
        ];
        return response()->json($output);
    }


    public function storeFile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 404,
                'message' => $validator->errors()->first()
            ]);
        }

        $file = File::uploadFile('file', 'images/files');
        if (!$file) {
            return response()->json([
                'code' => 400,
                'message' => 'Bad Request'
            ]);
        }

        $Task = Task::find($request->task_id);

        $File = File::create([
            'name' => $request->name,
            'task' => $request->task_id ? $request->task_id : NULL,
            'project' => $Task ? $Task->project : NULL,
            'file' => $file,
            'insertby' => Auth::user()->userid
        ]);

        if ($Task) {
            $Project = Project::firstWhere('projectid', $File->project);

            Update::create([
                'user' => $Project->customer,
                'type' => 'File',
                'content' => "A New File has been added to the " . $Task->name . " Task in the Project <a href='my-project.php?projectid=" . $Task->project . "'>" . $Project->title . "</a>."
            ]);
        } else {
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

    public function storeTaskUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'taskupdate' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 404,
                'message' => $validator->errors()->first()
            ]);
        }

        $Task = Task::find($request->task_id);

        $file = !empty($_FILES['file']['name']) ? File::uploadFile('file', 'images/taskupdates') : '';

        $TaskUpdate = TaskUpdate::create([
            'taskupdate' => $request->taskupdate,
            'link_text' => $request->link_text,
            'link_url' => $request->link_url,
            'video_url' => $request->video_url,
            'video_embed_code' => $request->video_embed_code,
            'image' => $file,
            'task' => $request->task_id ? $request->task_id : NULL,
            'project' => $Task ? $Task->project : NULL,
            'insertby' => Auth::user()->userid,
            'inserton' => Carbon::now()
        ]);

        if ($Task) {
            $Project = Project::firstWhere('projectid', $TaskUpdate->project);

            Update::create([
                'user' => $Project->customer,
                'type' => 'TaskUpdate',
                'content' => "A New Update has been added to the " . $Task->name . " Task in the Project <a href='my-project.php?projectid=" . $Project->projectid . "'>" . $Project->title . "</a>."
            ]);
        } else {
            Update::create([
                'user' => Auth::user()->userid,
                'type' => 'File',
                'content' => "A New Task Update has been added"
            ]);
        }

        return response()->json([
            'code' => 200,
            'message' => 'Task Update Successfully'
        ]);
    }

    /*
     * Task
     * */

    public function allTasks()
    {
        $output = [
            'code' => 200,
            'data' => Task::orderBy('taskno')->get()
        ];
        return response()->json($output);
    }

    public function storeTask(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required',
            'name' => 'required|string',
            'taskno' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $output = [
                'code' => 404,
                'message' => $validator->errors()->first()
            ];
            return response()->json($output);
        }

        $Project = Project::find($request->project_id);

        $Task = new Task;
        $Task->project = $Project->projectid;
        $Task->name = $request->name;
        $Task->taskno = $request->taskno;
        $Task->description = $request->description;
        $Task->inserton = Carbon::now();
        if ($Task->save()) {
            $this->reArrangeTaskOrder($Task->project);
            $output = [
                'code' => 200,
                'message' => 'Task Added Successfully'
            ];
            return response()->json($output);
        }
    }

    public function showTask($id)
    {
        $output = [
            'code' => 200,
            'data' => Task::find($id)
        ];
        return response()->json($output);
    }

    public function updateTask(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'status' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $output = [
                'code' => 404,
                'message' => $validator->errors()->first()
            ];
            return response()->json($output);
        }

        $Task = Task::find($request->id);
        $Task->name = $request->name;
        $Task->status = $request->status / 20;
        $Task->description = $request->description;
        if ($Task->save()) {

            //$this->reArrangeTaskOrder($Task->project);
            $output = [
                'code' => 200,
                'message' => 'Task Updated Successfully'
            ];
            return response()->json($output);
        }
    }

    public function deleteTask(Request $request)
    {
        Task::find($request->id)->delete();

        $output = [
            'code' => 200,
            'message' => 'Task Deleted Successfully',
            'data' => Task::all()
        ];
        return response()->json($output);
    }

    /*
     * ProjectEquity
     * */

    public function allEquities()
    {
        $output = [
            'code' => 200,
            'data' => ProjectEquity::orderBy('inserton', 'desc')->get()
        ];
        return response()->json($output);
    }

    public function storeEquity(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required',
            'date' => 'required|string',
            'amount' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $output = [
                'code' => 404,
                'message' => $validator->errors()->first()
            ];
            return response()->json($output);
        }

        $Project = Project::find($request->project_id);

        $ProjectEquity = new ProjectEquity;
        $ProjectEquity->project = $Project->projectid;
        $ProjectEquity->date = $request->date;
        $ProjectEquity->amount = $request->amount;
        $ProjectEquity->inserton = Carbon::now();
        $ProjectEquity->insertby = Auth::user()->userid;
        if ($ProjectEquity->save()) {
            $output = [
                'code' => 200,
                'message' => 'ProjectEquity Added Successfully'
            ];
            return response()->json($output);
        }
    }

    public function showEquity($id)
    {
        $output = [
            'code' => 200,
            'data' => ProjectEquity::find($id)
        ];
        return response()->json($output);
    }

    public function updateEquity(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|string',
            'amount' => 'required|integer'
        ]);

        if ($validator->fails()) {
            $output = [
                'code' => 404,
                'message' => $validator->errors()->first()
            ];
            return response()->json($output);
        }

        $ProjectEquity = ProjectEquity::find($request->id);
        $ProjectEquity->date = $request->date;
        $ProjectEquity->amount = $request->amount;

        if ($ProjectEquity->save()) {

            //$this->reArrangeProjectEquityOrder($ProjectEquity->project);
            $output = [
                'code' => 200,
                'message' => 'ProjectEquity Updated Successfully'
            ];
            return response()->json($output);
        }
    }

    public function deleteEquity(Request $request)
    {
        ProjectEquity::find($request->id)->delete();

        $output = [
            'code' => 200,
            'message' => 'ProjectEquity Deleted Successfully',
            'data' => ProjectEquity::all()
        ];
        return response()->json($output);
    }

    /*
     * Messages
     * */
    public function allMessages($userid)
    {
        Message::where('convid', $userid)->where('user', '<>', $userid)->update(['red' => 1]);

        $Messages = Message::where('convid', $userid)->with(['sender', 'receiver', 'user_obj'])->get();

        $output = [
            'code' => 200,
            'data' => $Messages
        ];

        return response()->json($output);
    }

    public function unreadMessageCount($userid)
    {
        $MessageCount = Message::where(['convid' => $userid, 'red' => 0])->count();

        $output = [
            'code' => 200,
            'data' => $MessageCount
        ];

        return response()->json($output);
    }

    public function sendMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'convid' => 'required',
            'message' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 404,
                'message' => $validator->errors()->first()
            ]);
        }

        if (!empty($_FILES['attachment']['name'])) {
            $attachment = File::uploadFile('attachment', 'images/messages');
        } else {
            $attachment = '';
        }

        $Message = Message::create([
            'convid' => $request->convid,
            'message' => $request->message,
            'user' => Auth::user()->userid,
            'replyto' => Auth::user()->role == 'User' ? '' : $request->convid
        ]);

        //$this->sendMail($Message, $attachment);

        return response()->json([
            'code' => 200,
            'message' => 'Message Sent Successfully'
        ]);
    }

    /*
     * User
     * */
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 404,
                'message' => $validator->errors()->first()
            ]);

        }
        if ($request->current_password == Auth::user()->getAuthPassword()) {
            User::where('id', Auth::user()->id)->update(['password' => $request->new_password]);

            return response()->json([
                'code' => 200,
                'message' => 'Password Changed Successfully'
            ]);
        } else {
            return response()->json([
                'code' => 404,
                'message' => 'Current Password is wrong'
            ]);
        }
    }

    public function updateUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
                'message' => $validator->errors()->first()
            ]);
        }

        $id = $request->id ? $request->id : $request->user()->id;

        $data = $request->all();

        if (!empty($_FILES['image']['name'])) {
            $image = File::uploadFile('image', 'images/profiles');
            unset($data['image']);

            $data['image'] = $image;
        }

        User::where('id', $id)->update($data);

        return response()->json([
            'code' => 200,
            'message' => 'User Updated Successfully'
        ]);
    }

    public function updateUserStatus(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
                'message' => $validator->errors()->first()
            ]);
        }

        User::where('id', $request->id)->update([
            'status' => $request->status
        ]);

        return response()->json([
            'code' => 200,
            'message' => 'User Status Updated    Successfully'
        ]);
    }

    public function sendUserInvitation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
                'message' => $validator->errors()->first()
            ]);
        }

        $User = User::find($request->id);

        //$this->sendInvitationEmail($User);

        return response()->json([
            'code' => 200,
            'message' => 'Invitation Sent Successfully'
        ]);
    }

    /*
     * User Roadmaps
     * */

    public function allRoadmaps($id = '')
    {
        $Roadmaps = Roadmap::orderBy('created_at', 'desc');

        if ($id) {
            $Roadmaps->where('user_id', $id);
        }

        $output = [
            'code' => 200,
            'data' => $Roadmaps->get()
        ];
        return response()->json($output);
    }

    public function storeRoadmap(Request $request)
    {
        $Roadmap = new Roadmap;
        $Roadmap->first_property = $request->first_property;
        $Roadmap->target_yield = $request->target_yield;
        $Roadmap->deposit = $request->deposit;
        $Roadmap->taget_growth = $request->taget_growth;
        $Roadmap->buy_range = $request->buy_range;
        $Roadmap->recycle_rate = $request->recycle_rate;

        if ($Roadmap->save()) {
            $output = [
                'code' => 200,
                'message' => 'Roadmap Added Successfully'
            ];
            return response()->json($output);
        }
    }

    public function showRoadmap($id)
    {
        $output = [
            'code' => 200,
            'data' => Roadmap::find($id)
        ];
        return response()->json($output);
    }

    public function updateRoadmap(Request $request)
    {
        $Roadmap = Roadmap::find($request->id);
        $Roadmap->first_property = $request->first_property;
        $Roadmap->target_yield = $request->target_yield;
        $Roadmap->deposit = $request->deposit;
        $Roadmap->taget_growth = $request->taget_growth;
        $Roadmap->buy_range = $request->buy_range;
        $Roadmap->recycle_rate = $request->recycle_rate;

        $Roadmap->status = $request->status;
        if ($Roadmap->save()) {
            $output = [
                'code' => 200,
                'message' => 'Roadmap Updated Successfully'
            ];
            return response()->json($output);
        }
    }

    public function deleteRoadmap(Request $request)
    {
        Roadmap::find($request->id)->delete();

        $output = [
            'code' => 200,
            'message' => 'Roadmap Deleted Successfully'
        ];
        return response()->json($output);
    }

    /*
     * Private Functions
     * */

    private function reArrangeTaskTemplateOrder()
    {
        $TaskTemplates = TaskTemplate::orderBy('taskno')->orderBy('id', 'desc')->get();

        $count = 1;
        foreach ($TaskTemplates as $TaskTemplate) {
            $TaskTemplate->taskno = $count++;
            $TaskTemplate->save();
        }
    }

    private function reArrangeTaskOrder($project_id)
    {
        $Tasks = Task::where('project', $project_id)->orderBy('taskno')->orderBy('id', 'desc')->get();

        $count = 1;
        foreach ($Tasks as $Task) {
            $Task->taskno = $count++;
            $Task->save();
        }
    }

    private function sendInvitationEmail($User)
    {
        $User->email = 'subhan.khalid402@gmail.com';

        $site_url = 'https://portfolio.stratprop.com.au/';
        $sitemail = 'portfolio@stratprop.com.au';
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: StratProp <$sitemail>\nX-Mailer: PHP/";
        $bccmail = 'Strat.prop.ba@gmail.com';
        $headers .= "Bcc: $bccmail\r\n";
        $message = '<br><img src="https://portfolio.stratprop.com.au/images/Strat%20Prop.png" height="50" width="200">
        <br><br>Hey There, <br> <br>You are one step away from getting verified. Please click the button to complete your account registration.
        <br>
        <br>
               <a style="padding:10px;border-radius:5px;background:#2D2AFD; color:white; text-decoration:none;" href="'. $site_url .'verify?e=' . $User->email . '&t=' . $User->token . '">Verify Your Account</a>
        <br>
        <br><br>Or you can copy the link below and paste it in the browser<br><br>
        <a href="' . $site_url . 'verify?e=' . $User->email . '&t=' . $User->token . '"> ' . $site_url . 'verify?e=' . $User->email . '&t=' . $User->token . '</a>';

        if (mail($User->email, "Complete Account Registration", $message, $headers)) {
            echo 'invite sent';
        };
    }
}
