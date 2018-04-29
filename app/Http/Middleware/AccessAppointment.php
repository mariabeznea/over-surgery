<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use App\Patient;
use App\Staff;
use App\Appointment;

class AccessAppointment
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $request_id = $request->appointment;

        // Check if user token exists
        $user = User::where('remember_token', $request->header('x-access-token'))->first();
        if (!$user) {
            return response()->json(['success' => false], 401);
        }

        if ($request->isMethod('get')) {
            return $next($request);
        }

        if ($request->isMethod('put') || $request->isMethod('delete') || $request->isMethod('post')) {
            // Check if staff, and let it continue if yes
            $staff = Staff::where('user_id', '=', $user->id)
                ->where(function ($query) {
                    $query->where('staff_type_id', '=', '3');
                })
                ->first();
            if ($staff) {
                return $next($request);
            }

            // If patient, check if has access to the appointment
            $patient = Patient::where('user_id', '=', $user->id)->first();
            if ($request->isMethod('post')) {
                $request_id = $request->input('patient_id');

                if ($request_id == $patient->id) {
                    return $next($request);
                }
            } else {
                $appointment = Appointment::where('id', '=', $request_id)->first();

                if ($patient->id == $appointment->patient_id) {
                    return $next($request);
                }
            }
        }

        return response()->json(['success' => false], 401);
    }
}
