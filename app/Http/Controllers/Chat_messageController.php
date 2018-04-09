<?php

namespace App\Http\Controllers;

use App\Chat_message;
use Validator;
use Illuminate\Http\Request;

class Chat_messageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($patient_id)
    {
        return Chat_message::ofPatient($patient_id)
                 ->join('patients', 'chat_messages.patient_id', '=', 'patients.id')
                 ->leftJoin('staff', 'chat_messages.staff_id', '=', 'staff.id')
                 ->select('chat_messages.*',
                'patients.first_name as patient_firstName', 'patients.last_name as patient_lastName',
                'staff.first_name as staff_firstName', 'staff.last_name as staff_lastName')
                ->orderBy('created_at', 'asc')
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
            'owner' => 'required|string',
            'message' => 'required|string',
            'patient_id' => 'required|string',
            'staff_id' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->messages()], 400);
        }

        $chat_message = Chat_message::create([
            'owner' => $request->input('owner'),
            'message' => $request->input('message'),
            'patient_id' => $request->input('patient_id'),
            'staff_id' => $request->input('staff_id'),
        ]);
        return $chat_message;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Chat_message  $chat
     * @return \Illuminate\Http\Response
     */
    public function show(Chat_message $chat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Chat_message  $chat
     * @return \Illuminate\Http\Response
     */
    public function edit(Chat_message $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Chat_message  $chat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chat_message $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Chat_message  $chat
     * @return \Illuminate\Http\Response
     */
    public function destroy(Chat_message $chat)
    {
        //
    }
}
