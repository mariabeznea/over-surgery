<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Patient;

use Validator;

class AuthController extends Controller
{

    public function register(Request $request) {

        $validator = Validator::make($request-> all(), [
            'email' => 'required|unique:users|max:255',
            'password' => 'required|string|min:6',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'date_of_birth' => 'required|date',
        ]);

        if ($validator->fails()) {
           return response()->json(['success'=> false, 'error'=> $validator->messages()], 400);
        }

        $user = User::create([
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            //'remember_token' => bcrypt($request->input('remember_token')),
        ]);

        Patient::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'address' => $request->input('address'),
            'phone_number' =>$request->input('phone_number'),
            'date_of_birth' =>$request->input('date_of_birth'),
            'user_id' => $user->id,
        ]);

        return response()->json([
            'status' => 'success',
            'message'=> 'User created successfully.'
        ], 200);
    }
}
