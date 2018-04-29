<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use App\Patient;
use App\Staff;


class AccessChat_messages
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
        // Check if user token exists
        $user = User::where('remember_token', $request->header('x-access-token'))->first();
        if (!$user) {
            return response()->json(['success' => false], 401);
        }

        // Check if staff, and let it continue if yes
        $staff = Staff::where('user_id', '=', $user->id)
            ->where(function ($query) {
                $query->where('staff_type_id', '=', '3');
            })
            ->first();
        if ($staff) {
            return $next($request);
        }

        if ($request->isMethod('post')) {
            // Check if patient id equals requested id (patients can only access themselves)
            $patient = Patient::where('user_id', '=', $user->id)->first();
            $request_id = $request->input('patient_id');

            if ($patient->id == $request_id) {
                return $next($request);
            }
        }
        // Otherwise return unauthorized
        return response()->json(['success' => false], 401);
    }
}
