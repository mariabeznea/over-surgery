<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use App\Patient;
use App\Prescription;

class AccessPrescription
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
        $request_id = $request->input('patient_id');

        // Check if user token exists
        $user = User::where('remember_token', $request->header('x-access-token'))->first();
        if (!$user) {
            return response()->json(['success' => false], 401);
        }

        if ($request->isMethod('post')) {
            // Check if the patient has access to the prescription
            $patient = Patient::where('user_id', '=', $user->id)->first();

            if ($patient->id == $request_id) {
                return $next($request);
            }
        }

        return response()->json(['success' => false], 401);
    }
}
