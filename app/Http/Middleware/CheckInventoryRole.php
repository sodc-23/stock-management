<?php

namespace App\Http\Middleware;

use Closure;

//use the Auth Facades
use Illuminate\Support\Facades\Auth;

//use profile controller
use App\roles_id;

class CheckInventoryRole
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

        if(Auth::user()):

            //check what role the current user have
            $p = roles_id::where('username',Auth::user()->username)->with('role')->first();

            //role must be equals to either admin or inventory
            if(strtolower($p->role->role_name)==="admin"||strtolower($p->role->role_name)==="inventory"):
                //proceed to reporting
                return $next($request);

            else :
                //redirect to error 404 page
                return view('errors.404');

            endif;

        else:
            //redirect to login
            return redirect('login');

        endif;

        
    }
}
