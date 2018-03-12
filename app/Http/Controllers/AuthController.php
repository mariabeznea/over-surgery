<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Patient;
use App\Staff;

use \stdClass;
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
           return response()->json(['success' => false, 'error' => $validator->messages()], 400);
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

        // Create token
        $token = $this->createToken($request-> only('email', 'password'));
        if ($token->success === false) {
            return response()->json([
                'success' => false,
                'error' => [
                    'generic' => $token->message
                ]
            ], 400);
        }

        // Save token
        $this->saveToken(Auth::user()->id, $token->token);

        // TODO: user can also be a staff but is not coded yet
        return response()->json([
            'success' => true,
            'token' => $token->token,
            'user_type' => 'patient'
        ], 200);
    }

    public function login(Request $request) {

        $credentials = $request-> only('email', 'password');

        //Validating the request
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()], 400);
        }

        // Create token
        $token = $this->createToken($credentials);
        if ($token->success === false) {
            return response()->json([
                'success' => false,
                'error' => [
                    'generic' => $token->message
                ]
            ], 400);
        }

        // Save token
        $this->saveToken(Auth::user()->id, $token->token);

        // TODO: use eloquent to find user type
        return response()->json([
            'success' => true,
            'token' => $token->token,
            'user_type' => (Staff::where('user_id', '=', Auth::user()->id)->first() !== null ? 'staff' : 'patient')
        ], 200);
    }

    private function createToken(array $credentials)
    {
        // Create anonymous object
        $result = new stdClass();

        try {
            // Attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                $result->success = false;
                $result->message = 'There is no user with these credentials.';
                return $result;
            }
        } catch (JWTException $e) {
            // Something went wrong whilst attempting to encode the token
            $result->success = false;
            $result->message = 'Something went wrong, please try again.';
            return $result;
        }

        // Return successful result
        $result->success = true;
        $result->token = $token;
        return $result;
    }

    private function saveToken(string $user_id, string $token) {
        $user = User::find($user_id);
        $user->remember_token = $token;
        $user->save();
    }
}