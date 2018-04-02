<?php

namespace App\Http\Controllers;

use App\Appointment;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\App;

class AppointmentController extends Controller
{
    // Allowing only authenticated users to access appointments
//    public function __construct()
//    {
//        $this->middleware('auth:api');
//    }
    /**
     * @return \Illuminate\Http\Response
     * Display all appointments for a patient
     **/

    public function index($patient_id)
    {
        return Appointment::ofPatient($patient_id)->orderBy('date', 'desc')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Validating the request
        $validator = Validator::make($request-> all(), [
            'date' => 'required|date',
            'start_hours' => ['required', 'date_format:H:i:s',
                Rule::unique('appointments')->where(function ($query) {
                    return $query->where('date', request()->get('date'))->where('staff_id', request()->get('staff_id'));
                })],
            'end_hours' => 'required|date_format:H:i:s',
            'location' => 'string',
            'notes' => 'nullable|string',
            'staff_id' => 'required|string',
            'patient_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->messages()], 400);
        }

        $appointment = Appointment::create([
            'date' => $request->input('date'),
            'start_hours' => $request->input('start_hours'),
            'end_hours' => $request->input('end_hours'),
            'location' =>$request->input('location'),
            'notes' =>$request->input('notes'),
            'staff_id' =>$request->input('staff_id'),
            'patient_id' =>$request->input('patient_id'),
        ]);
        return $appointment;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Appointment::find($id);
    }

    public function showByDateStaff($date, $staff_id)
    {
        return Appointment::where([['date', $date], ['staff_id', $staff_id]])->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function edit(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //Validating the request
        $validator = Validator::make($request-> all(), [
            'date' => 'required|date',
            'start_hours' => 'required|date_format:H:i:s',
            'end_hours' => 'required|date_format:H:i:s',
            'location' => 'required|string',
            'notes' => 'nullable|string',
            'staff_id' => 'required|string',
            'patient_id' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->messages()], 400);
        }

        // do a query where you join appointment with staff table and retrieve the staff-id by inputing the name??
        $appointment = Appointment::find($id);
        $appointment->date= $request->input('date');
        $appointment->start_hours= $request->input('start_hours');
        $appointment->end_hours= $request->input('end_hours');
        $appointment->location= $request->input('location');
        $appointment->notes= $request->input('notes');
        $appointment->staff_id= $request->input('staff_id');

        $appointment-> save();
        return $appointment;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Appointment::destroy($id);
    }
}
