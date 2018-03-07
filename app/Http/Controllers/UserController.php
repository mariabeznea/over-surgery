<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    //
    public function store(Request $request){
        $user = User:: create([
            'email' => $request->input('email'),
            'password' => $request->input('password'),

        ]);
        return $user;
    }
}
