<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
                'message' => $validator->errors()->first()
            ]);
        }

        $User = User::firstWhere(['username' => $request->username, 'password' => $request->password]);

        if (!$User) {
            return response()->json([
                'code' => 500,
                'message' => 'No Account Found!, Please check your input'
            ]);
        }

        if ($User->status == 'Inactive') {
            return response()->json([
                'code' => 500,
                'message' => 'Account Suspended or Deleted, Please contact admin. Thank You!'
            ]);
        } elseif ($User->status == 'Review') {
            return response()->json([
                'code' => 500,
                'message' => 'You will be able to login once admin verifies your account. Thank You!'
            ]);
        } elseif ($User->status == 'Email') {
            return response()->json([
                'code' => 500,
                'message' => 'Email not Verified, Please check your email for verification mail. Thank You!'
            ]);
        }

        $token = $User->createToken('APP')->plainTextToken;

        if (!empty($request->client) && $request->client == 'admin') {

            return response()->json([
                'code' => 200,
                'message' => 'Logged in',
                'token' => ['token' => $token]
            ])->header('Cache-Control', 'private')->header('Authorization', $token);

        } else {
            return response()->json([
                'code' => 200,
                'token' => $token
            ]);

        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
                'message' => $validator->errors()->first()
            ]);
        }

        if (!empty($_FILES['image']['name'])) {
            $image = File::uploadFile('image', 'images/profiles');
        } else {
            $image = '';
        }

        /*$User = User::create([
            'userid' => substr(sha1(strtotime("now")), 0, 7),
            'username' => $request->username,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => $request->password,
            'inserton' => Carbon::now(),
            'insertby' => '',
            'image' => $image,
            'token' => sha1($request->email . $request->firstname . strtotime("now"))
        ]);*/

        $User = User::where('email', $request->email)->first();
        if(!$User)
        {
            return response()->json([
                'code' => 500,
                'message' => 'Email not found'
            ]);
        }

        if($User->status != 'Email')
        {
            return response()->json([
                'code' => 500,
                'message' => 'Email Already Registered'
            ]);
        }

        User::where('id', $User->id)->update([
            'username' => $request->username,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => $request->password,
            'phone' => $request->phone,
        ]);

        return response()->json([
            'code' => 200,
            'message' => 'User Registered Successfully'
        ]);
    }
}
