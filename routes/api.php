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
Route::post('auth/login', 'AuthController@login');
Route::post('auth/recover', 'AuthController@recover');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.request');
Route::post('password/reset', 'Auth\ResetPasswordController@postReset')->name('password.reset');

//Registration Routes...
Route::post('auth/register', 'AuthController@register');

// Patient routes
Route::resource('/patient', 'PatientController')->middleware('AccessPatient');

// Staff routes
Route::resource('/staff', 'StaffController')->middleware('AccessStaff');

// Shift routes
Route::group(['middleware' => 'AccessShift'], function(){
    Route::get('/shift/date/{date}', 'ShiftController@showByDate');
    Route::get('/shift/date/{date}/staff/{staff}', 'ShiftController@showByDateStaff');
});

// Appointment routes
Route::get('/patient/{id}/appointment','AppointmentController@showByPatient')->middleware('AccessPatient');
Route::get('/appointment/date/{date}/staff/{staff}', 'AppointmentController@showByDateStaff')->middleware('AccessToken');
Route::resource('/appointment', 'AppointmentController')->middleware('AccessAppointment');

//Prescription routes
Route::get('/patient/{id}/prescription','PrescriptionController@index')->middleware('AccessPatient');
Route::resource('/prescription', 'PrescriptionController')->middleware('AccessPrescription');


//Test results routes
Route::get('/patient/{id}/test_results','Test_resultController@index')->middleware('AccessPatient');

//Chat messages routes
Route::get('/patient/{id}/chat_messages', 'Chat_messageController@index')->middleware('AccessPatient');
Route::resource('/chat_messages', 'Chat_messageController')->middleware('AccessChat_messages');




