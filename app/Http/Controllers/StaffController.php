<?php

namespace App\Http\Controllers;

use App\Patient;
use App\Appointment;
use App\Shift;
use App\Staff;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Staff::all();
    }

    public function getStatistics () {
//        $totalAppointments = Appointment::ofPatient($id)
//            ->whereMonth('date', '=', Carbon::now()->format('m'))
//            ->where(function ($query) {
//                $query->whereDate('date', '>=', Carbon::now()->format('yyyy-mm-dd'));
//            })
//            ->count();
//
        $totalPatients = Patient::all()->count();
//        $totalPrescriptions = Prescription::ofPatient($id)
//            ->join('prescription_status', 'prescriptions.prescription_status_id', '=', 'prescription_status.id')
//            ->where('prescription_status.id', '=', 2)
//            ->count();

        //return array($totalAppointments, $totalTests, $totalPrescriptions);
        return response()->json([
//            'appointments' => $totalAppointments,
            'test_results' => $totalPatients,
//            'pending_prescriptions' => $totalPrescriptions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $totalAppointments = Appointment::latest()
            ->whereYear('date', '=', Carbon::now()->format('Y'))
            ->where(function ($query) {
                $query->whereMonth('date', '=', Carbon::now()->format('m'))
                      ->where(function ($query) {
                          $query->whereDate('date', '>=', Carbon::now()->format('yyyy-mm-dd'));
                      });
            })
            ->count();

        $totalPatients = Patient::all()->count();

        $totalStaffOnDuty = Shift::latest()
            ->with(['staff' => function ($query) {
               $query ->where('staff.staff_type_id', '=', 1)
                      ->orWhere('staff.staff_type_id', '=', 2);
//               FOR AVAILABILITY
//                     ->with(['appointments' => function ($query) {
//                       $query->whereBetween('date', [Carbon::now()->startOfWeek(),Carbon::now()->endOfWeek()]);
//                     }]);
            }])
            ->whereBetween('date', [Carbon::now()->startOfWeek(),Carbon::now()->endOfWeek()])

            ->count();
//FOR AVAILABILITY
//        foreach ($shifts as $shift) {
//            if($shift->staff->appointment->start_hours)
//        }

        //return array($totalAppointments, $totalTests, $totalPrescriptions);
        return response()->json([
            'appointments' => $totalAppointments,
            'patients' => $totalPatients,
            'staff_on_duty' => $totalStaffOnDuty
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Staff::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function edit(Staff $staff)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Staff $staff)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function destroy(Staff $staff)
    {
        //
    }
}
