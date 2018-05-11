<?php

namespace App\Http\Controllers;

use App\Test_result;
use Illuminate\Http\Request;

class Test_resultController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($patient_id)
    {
        return Test_result::ofPatient($patient_id)->orderBy('date', 'desc')->get();

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Test_result  $test_result
     * @return \Illuminate\Http\Response
     */
    public function show(Test_result $test_result)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Test_result  $test_result
     * @return \Illuminate\Http\Response
     */
    public function edit(Test_result $test_result)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Test_result  $test_result
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Test_result $test_result)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Test_result  $test_result
     * @return \Illuminate\Http\Response
     */
    public function destroy(Test_result $test_result)
    {
        //
    }
}
