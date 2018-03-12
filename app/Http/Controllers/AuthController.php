<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Patient;
use App\Staff;

use Illuminate\Support\Facades\App;
use Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function register(Request $request) {

        //Validating the request
        $validator = Validator::make($request-> all(), [
            'email' => 'required|email|unique:users|max:50',
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

        // Add user & patient
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

    public function login(Request $request){

        $credentials = $request-> only('email', 'password');

        //Validating the request
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()], 400);
        }

        try {
            // Attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'generic' => 'There is no user with these credentials.'
                    ]
                ],400);
            }
        } catch (JWTException $e) {
            // Something went wrong whilst attempting to encode the token
            return response()->json([
                'success' => false,
                'error' => [
                    'generic' => 'Something went wrong, please try again.'
                ]
            ],500);
        }

        // Save token
        $user = User::find(Auth::user()->id);
        $user->remember_token = $token;
        $user->save();

        // TODO: use eloquent to find user type
        return response()->json([
            'success' => true,
            'token' => $token,
            'user_type' => (Staff::where('user_id', '=', $user->id)->first() !== null ? 'staff' : 'patient')
        ], 200);
    }
}
