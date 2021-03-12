<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function unreadMessages()
    {
        return Message::where(['convid' => Auth::user()->userid, 'red' => 0])->count();
    }

    public function sendMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'convid' => 'required',
            'message' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
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
            'replyto' => ''
        ]);

        $this->sendMail($Message, $attachment);

        return response()->json([
            'code' => 200,
            'message' => 'Message Sent Successfully'
        ]);
    }

    public function myMessages1()
    {
        Message::where('convid', Auth::user()->userid)->where('user', '<>', Auth::user()->userid)->update(['red' => 1]);

        $Conversations = [];

        $Messages = Message::where('convid', Auth::user()->userid)->get();
        foreach ($Messages as $Message) {
            $Message->inserton = Carbon::parse($Message->inserton);

            $date = $Message->inserton->format('Y-m-d');
            if (empty($Conversations[$date])) {
                $Conversations[$date]['date'] = $Message->inserton->format('dS') . ' of ' . $Message->inserton->format('M Y');
                $Conversations[$date]['messages'] = [];
            }

            $Conversations[$date]['messages'][] = $Message;
        }

        return $Conversations;
    }

    public function myMessages(Request $request)
    {
        $offset = $request->start ? $request->start : 0;
        $user_id = Auth::user()->userid; //
        Message::where('convid', $user_id)->where('user', '<>', $user_id)->update(['red' => 1]);

        $Conversations = [];

        $Messages = Message::where('convid', $user_id)->offset($offset)->limit(50);
        $Messages = $Messages->with('sender')->with('receiver')->get();

        foreach ($Messages as $Message) {
            $Message->inserton = Carbon::parse($Message->inserton);

            $Conversation = [
                '_id' => $Message->id,
                'text' => $Message->message,
                'createdAt' => $Message->inserton
            ];

            if ($Message->sender)
                $Conversation['user'] = [
                    '_id' => $Message->sender->id,
                    'name' => $Message->sender->firstname . ' ' . $Message->sender->lastname,
                    'avatar' => $Message->sender->image
                ];

            $Conversations[] = $Conversation;
        }

        return $Conversations;
    }

    private function sendMail($Message, $attachment)
    {
        $siteurl = "https://portfolio.stratprop.com.au/";
        $sitemail = 'hello@stratprop.com.au';
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: StratProp <$sitemail>\nX-Mailer: PHP/";
        $bccmail = 'Strat.prop.ba@gmail.com';
        $headers .= "Bcc: $bccmail\r\n";

        $title = "You've received messages from " . $Message->sender->username;
        $body = '<br><img src="https://portfolio.stratprop.com.au/images/Strat%20Prop.png" height="50" width="200">
<br><br>
Hi Darren, <br><br> ' . $Message->sender->firstname . ' ' . $Message->sender->lastname . '  left you a message.
 <br><br>
 <hr>
 <em>' . $Message->message . '</em>';
        if ($attachment) {
            $body .= '<br><a href="https://portfolio.stratprop.com.au/' . $attachment . '">File Attached</a>';
        }
        echo $body .= '<br>
 <hr><br>
 <a href="https://portfolio.stratprop.com.au/projects?custid=' . $Message->sender->userid . '">Click here</a> to view and reply.';
        mail("darren@stratprop.com.au", "You've received messages from " . $Message->sender->username . " ", $body, $headers);
    }

}
