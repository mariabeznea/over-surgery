<?php

namespace App\Http\Controllers;

use App\Prescription;
use Validator;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($patient_id)
    {
        return Prescription::ofPatient($patient_id)
            ->join('medicines', 'prescriptions.medicine_id', '=', 'medicines.id')
            ->join('prescription_status', 'prescriptions.prescription_status_id', '=', 'prescription_status.id')
            ->select('prescriptions.*', 'medicines.title', 'prescription_status.name')
            ->orderBy('medicines.title', 'asc')
            ->orderBy('expiration_date', 'desc')
            ->get();
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
            'renewable' => 'boolean',
            'expiration_date' =>'nullable|date',
            'dose' => 'integer',
            'staff_id' => 'nullable|string',
            'patient_id' => 'required|string',
            'medicine_id' => 'required|integer',
            'prescription_status_id' => 'integer',
            'previous_prescription_id' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->messages()], 400);
        }

        $prescription = Prescription::create([
            'renewable' => $request->input('renewable'),
            'expiration_date' => $request->input('expiration_date'),
            'dose' => $request->input('dose'),
            'staff_id' =>$request->input('staff_id'),
            'patient_id' =>$request->input('patient_id'),
            'medicine_id' =>$request->input('medicine_id'),
            'prescription_status_id' =>$request->input('prescription_status_id'),
            'previous_prescription_id' =>$request->input('previous_prescription_id'),

        ]);
        return $prescription;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function show(Prescription $prescription)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function edit(Prescription $prescription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Prescription $prescription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Prescription  $prescription
     * @return \Illuminate\Http\Response
     */
    public function destroy(Prescription $prescription)
    {
        //
    }
}
