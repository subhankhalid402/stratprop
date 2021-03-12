<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function update(Request $request)
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

    public function allCustomers()
    {
        return User::where('role', 'User')
            ->where('status', '!=', 'Email')
            ->where('userid', '!=', Auth::user()->userid)
            ->orderBy('firstname')
            ->get();
    }

    public function customerList()
    {
        return User::where('role', 'User')->get();
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 500,
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
                'code' => 500,
                'message' => 'Current Password is wrong'
            ]);
        }
    }
}
