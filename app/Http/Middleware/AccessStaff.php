<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use App\Patient;
use App\Staff;


class AccessStaff
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
        $request_id = $request->staff;

        // Check if user token exists
        $user = User::where('remember_token', $request->header('x-access-token'))->first();
        if (!$user) {
            return response()->json(['success' => false], 401);
        }

        if ($request->isMethod('get')) {
            return $next($request);
        }

        if ($request->isMethod('put')) {
            // Check if staff, and let it continue if yes
            $staff = Staff::where('user_id', '=', $user->id)
                ->where(function ($query) {
                    $query->where('staff_type_id', '=', '3');
                })
                ->first();
            if ($staff && $staff->id == $request_id) {
                return $next($request);
            }
        }

        return response()->json(['success' => false], 401);
    }
}
