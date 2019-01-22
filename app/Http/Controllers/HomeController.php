<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

//model
use App\profile;
use App\messages;
use App\notifications;


class HomeController extends Controller
{
    /**
     * Create a new controller instance. 
     *
     * @return void
     */

    public $notifications;

    public function __construct()
    {
        $this->middleware('auth');
        // $role = $this->current_user_info()->roles_id->role->role_name;
        // $username = $this->current_user_info()->username;

        // $this->notifications = notifications::where(function($query) use($role, $username) {
        //     $query->where('to', 'like', "%{$role}%")
        //           ->orWhere('to', 'like', "%{$username}%");
        // })->get();

        if(Auth::check()):
            $this->notifications = notifications::where('username','!=',$this->current_user_info()->username)->where(function($query){
                $query->where('to_who',$this->current_user_info()->username)
                      ->orWhere('to_who',$this->current_user_info()->roles_id->role->role_name);
            })->get();

        endif;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    function current_user_info(){
        // return profile::where('username',Auth::user()->username)->with(array('roles_id.role' => function($query){
        //     $query->addSelect(array('role_name'));
        // }))->first();
        return profile::where('username',Auth::user()->username)->with('account')->with('roles_id.role')->with('permissions_id.permission')->first();
    }
    public function index()
    {
        $current_page = "home";
        $current_user_info = $this->current_user_info();

        //get the unread messages
        $messages = messages::where('status','unread')->where('to_who',$this->current_user_info()->username)->orderBy('created_at','asc')->get();

        //get the notifications
        $notifications = $this->notifications;

        return view('layouts.pages.home',compact('current_page','current_user_info','messages','notifications'));
    }
}
