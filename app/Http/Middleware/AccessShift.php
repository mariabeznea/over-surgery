<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class AccessShift
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

        if ($request->isMethod('get')) {
            return $next($request);
        }

        return response()->json(['success' => false], 401);
    }
}
