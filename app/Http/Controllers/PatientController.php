<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Prescription;
use App\Test_result;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Patient;

class PatientController extends Controller
{
    public function index(){
        $patients = Patient:: all();
        return $patients;
    }

//    public function show($id){
//        $patient = Patient::find($id);
//        return $patient;
//    }

    public function store(Request $request){
        $patient = Patient::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'address' => $request->input('address'),
            'phone_number' =>$request->input('phone_number'),
            'date_of_birth' =>$request->input('date_of_birth'),
            'user_id' =>$request->input('user_id'),
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

    public function show($id) {

        $totalAppointments = Appointment::ofPatient($id)
            ->whereYear('date', '=', Carbon::now()->format('Y'))
            ->where(function ($query) {
                $query->whereMonth('date', '=', Carbon::now()->format('m'))
                    ->where(function ($query) {
                        $query->whereDate('date', '>=', Carbon::now()->format('yyyy-mm-dd'));
                    });
            })
           ->count();

        $totalTests = Test_result::ofPatient($id)
            ->count();
       $totalPrescriptions = Prescription::ofPatient($id)
            ->join('prescription_status', 'prescriptions.prescription_status_id', '=', 'prescription_status.id')
            ->where('prescription_status.id', '=', 2)
            ->count();

       //return array($totalAppointments, $totalTests, $totalPrescriptions);
        return response()->json([
            'appointments' => $totalAppointments,
            'test_results' => $totalTests,
            'pending_prescriptions' => $totalPrescriptions
        ]);
//        $patient = Patient::find($id);
//        return $patient::withCount('appointments')->get();
//        => function ($query){
////            $query->whereDate('date', '>=', Carbon::now()->format('yyyy-mm-dd')
//               $query->whereMonth('date', '=', Carbon::now()->format('m'));
//        }])->get();

    }
}
