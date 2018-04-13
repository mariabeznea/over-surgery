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
use Illuminate\Support\Facades\Password;

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

        // TODO: only registering patients, needs code for staff
        $patient = Patient::create([
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
        $user = $this->saveToken(Auth::user()->id, $token->token);

        // TODO: user can also be a staff but is not coded yet
        // TODO: code is only prepared to send patients back, will need for staff too
        return response()->json([
            'success' => true,
            'token' => $token->token,
            'user_type' => 'patient',
            'user' => $user,
            'patient' => $patient
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
        $user = $this->saveToken(Auth::user()->id, $token->token);

        $patient = Patient::where('user_id', '=', $user->id)->first();
        $staff = Staff::where('user_id', '=', $user->id)
                        ->where(function ($query) {
                            $query->where('staff_type_id', '=', '3');
                        })
                        ->first();

        return response()->json([
            'success' => true,
            'token' => $token->token,
            'user_type' => (Staff::where('user_id', '=', Auth::user()->id)->first() !== null ? 'staff' : 'patient'),
            'user' => $user,
            'patient' => $patient,
            'staff' => $staff
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
        return $user;
    }

    public function user(Request $request)
    {
        $user = User::find(Auth::user()->id);
        return response([
            'status' => 'success',
            'data' => $user
        ]);
    }

//    public function logout(Request $request) {
//        $this->validate($request, ['token' => 'required']);
//
//        try {
//            JWTAuth::invalidate($request->input('token'));
//            return response()->json(['success' => true, 'message'=> "You have successfully logged out."]);
//        } catch (JWTException $e) {
//            // something went wrong whilst attempting to encode the token
//            return response()->json(['success' => false, 'error' => 'Failed to logout, please try again.'], 500);
//        }
//    }

    public function recover(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $error_message = "Your email address was not found.";
            return response()->json(['success' => false, 'error' => ['email' => $error_message]], 401);
        }
        try {
            Password::sendResetLink($request->only('email'), function (Message $message) {
                $message->subject('Your Password Reset Link');
            });
        } catch (\Exception $e) {
            //Return with error
            $error_message = $e->getMessage();
            return response()->json(['success' => false, 'error' => $error_message], 401);
        }
        return response()->json([
            'success' => true, 'data' => ['message' => 'A reset email has been sent! Please check your email.']
        ]);
    }
}