<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Patient;

class PatientController extends Controller
{
    //
    public function index(){
        $patients = Patient:: all();
        return $patients;
    }

    public function show($id){
        $patient = Patient::find($id);
        return $patient;
    }

    public function store(Request $request){
        $patient = Patient:: create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'address' => $request->input('address'),
            'phone_number' =>$request->input('phone_number')
        ]);
        return $patient;
    }

    public function update($id){
        $patient = Patient::find($id);
        $patient->last_name= Request::input('last_name');
        $patient->address= Request::input('address');
        $patient->phone_number= Request::input('phone_number');
        $patient-> save();
        return $patient;
    }

}
