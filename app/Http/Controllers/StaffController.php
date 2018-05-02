<?php

namespace App\Http\Controllers;

use App\Patient;
use App\Appointment;
use App\Shift;
use App\Staff;
use Carbon\Carbon;
use Validator;
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

    /**
     * Show the form for creating the statistics.
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
                          $query->whereDate('date', '>=', Carbon::now()->format('Y-m-d'));
                      });
            })
            ->count();

        $totalPatients = Patient::all()->count();

        $totalStaffOnDuty = Shift::latest()
            ->with(['staff' => function ($query) {
               $query ->where('staff.staff_type_id', '=', 1)
                      ->orWhere('staff.staff_type_id', '=', 2);
            }])
            ->whereBetween('date', [Carbon::now()->startOfWeek(),Carbon::now()->endOfWeek()])

            ->count();

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
    public function update(Request $request, $id)
    {
        //Validating the request
        $validator = Validator::make($request-> all(), [
            'address' => 'string',
            'phone_number' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->messages()], 400);
        }

        $staff = Staff::find($id);
            $staff->address = $request->input('address');
            $staff->phone_number = $request->input('phone_number');
            $staff-> save();
            return $staff;
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
