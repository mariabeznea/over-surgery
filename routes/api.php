<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'jwt.auth'], function(){
    Route::get('auth/user', 'AuthController@user');
});

// Authentication Routes...
Route::post('auth/login', 'AuthController@login');
//Route::post('recover', 'AuthController@recover');

//Route::get('logout', 'AuthController@logout');

//Registration Routes...
Route::post('auth/register', 'AuthController@register');

Route::resource('/patient', 'PatientController');


//TODO: organize routes to show only the needed functions ex: ['only' => ['index', 'show']];
Route::resource('/availability', 'ShiftController');
