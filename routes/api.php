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


// Authentication Routes...
//Route::post('login', 'AuthController@login');
//Route::post('recover', 'AuthController@recover');

//Route::get('logout', 'AuthController@logout');

//Registration Routes...
//Route::resource('/register', 'AuthController');
Route::post('/register', 'AuthController@register');


Route::resource('/patient', 'PatientController');