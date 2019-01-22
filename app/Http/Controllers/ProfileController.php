<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

//models
use App\profile;
use App\role;
use App\User;
use App\roles_id;
use App\messages;
use App\permissions_id;
use App\notifications;
//use facades redis
use Illuminate\Support\Facades\Redis;

class ProfileController extends HomeController
{
    public function index(){
    	$current_page = "profile";
        //get the roles list
        $roles = role::select('role_id','role_name','role_description')->get();
    	if(strtolower($this->current_user_info()->roles_id->role->role_name) === 'admin'){
    		$users = $this->get_profiles();
    	}else{
    		$users = false;
    	}
    	// $users = profile::with('account')->with('roles_id.role')->get();
    	// foreach($users as $user):
    	// 	$user->username = $user->account->username ? $user->account->username : '';
    	// 	$user->password = $user->account->real_password ? $user->account->real_password : '';
    	// 	$user->role = $user->roles_id->role->role_name;
    	// endforeach;
    	//get the current user info
    	$current_user_info = $this->current_user_info();
        //get the unread messages
        $messages = messages::where('status','unread')->where('to_who',$this->current_user_info()->username)->orderBy('created_at','asc')->get();
        //get the notifications
        $notifications = $this->notifications;

    	return view('layouts.pages.profile',compact('current_page','users','current_user_info','roles','messages','notifications'));
    }
    //get user
    public function get_user(Request $request){
    	$user = profile::where('username',$request->users)->with('account')->with('roles_id.role')->first();
    	$user->img = $user->img ? base64_encode($user->img) : false;
    	$user->password = $user->account->real_password ? $user->account->real_password : '';
    	$user->role = $user->roles_id->role->role_name;

    	return response()->json([ 'success' => true, 'user' => $user ]);
    }
    //profile engine, create, edit, delete
    public function profile_engine(Request $request){
    	switch($request->type){
    		case "add":
    			$m = $this->create_profile($request);
    		break;
    		case "edit":
    			$m = $this->edit_profile($request);
    		break;
    		case "delete":
    			$m = $this->delete_profile($request);
    		break;
    	}

    	return response()->json($m);
    }
    //create profile
    protected function create_profile($request){
    	// dd(var_dump(file_get_contents($request->file('image'))));
    	$error = array();
        $validator = Validator::make($request->all(),[
            'username' => 'required|unique:users',
            'password' => 'required',
            'c_password' => 'required',
            'role' => 'required',
            'fullname' => 'required|unique:profiles',
            'age' => 'required|int',
            'email' => 'required|email|unique:profiles'
        ]);
        if($validator->fails()) :
		    foreach($validator->errors()->getMessages() as $validationErrors):
		        if (is_array($validationErrors)) {
		            foreach($validationErrors as $validationError):
		                $error[] = $validationError;
		            endforeach;
		        } else {
		            $error[] = $validationErrors;
		        }
		    endforeach;
		endif;

    	//validate the password
    	if($request->password !== $request->c_password):
    		 $error[] = 'Password and confirm password must match.';
    	endif;

    	//image
    	if($request->file('image')){
             //save the image
            $validator = Validator::make($request->all(),[
                'image' => 'image|image_size:115-300,115-300'
                // dimensions:min_width=100,min_height=200
            ]);
            if($validator->fails()){
                foreach($validator->errors()->getMessages() as $validationErrors):
			        if (is_array($validationErrors)) {
			            foreach($validationErrors as $validationError):
			                $error[] = $validationError;
			            endforeach;
			        } else {
			            $error[] = $validationErrors;
			        }
			    endforeach;
            }
        }
    	if(count($error)===0){
    		unset($error);
    		//create profile
    		$p = new profile();
    		$p->username = $request->username;
    		if($request->file('image')) :
            	$p->img = file_get_contents($request->file('image'));
            endif;
    		$p->fullname = $request->fullname;
    		$p->age = $request->age;
    		$p->address = $request->address;
    		$p->marital_status = $request->marital_status;
    		$p->email = $request->email;
    		$p->save();

    		//create account
    		$u = new User();
    		$u->username = $p->username;
    		$u->password = Hash::make($request->c_password);
    		$u->real_password = $request->c_password;
    		$u->save();

    		//add role
    		$r = new roles_id();
    		$r->role_id = $request->role;
    		$r->username = $p->username;
    		$r->save();

            //create permission
            switch($r->role_id):
                case 1:
                    $q = new permissions_id();
                    $q->perm_id = 0;
                    $q->username = $p->username;
                    $q->save();
                case 2:
                    $q = new permissions_id();
                    $q->perm_id = 1;
                    $q->username = $p->username;
                    $q->save();
                case 3:
                    $q = new permissions_id();
                    $q->perm_id = 5;
                    $q->username = $p->username;
                    $q->save();
            endswitch;

    		$users = $this->get_profiles();

    		return array( 'success' => true, 'users' => $users );
    	}else{
    		$str = '<ul class="c_red padding_zero margin_zero menu">';
    		foreach($error as $e ){
    			$str.= '<li>'.$e.'</li>';
    		}
    		$str.='</ul>';

    		return array('success' => false,  'message' => $str );
    	}
    }
    protected function edit_profile($request){
    	$error = array();
    	//get first the default values of the given profile
    	$rp = profile::where('username',$request->id)->with('account')->with('roles_id.role')->first();
    	//check if input username is same to the reference username
    	if($rp->username !== $request->username){
    		//validate username
    		$validator = Validator::make($request->all(),[
	            'username' => 'required|unique:users',
	        ]);
	        if($validator->fails()) :
			    foreach($validator->errors()->getMessages() as $validationErrors):
			        if (is_array($validationErrors)) {
			            foreach($validationErrors as $validationError):
			                $error[] = $validationError;
			            endforeach;
			        } else {
			            $error[] = $validationErrors;
			        }
			    endforeach;
			endif;
			$username = true;
    	}else{
    		$username = false;
    	}
    	//validate password, c_password, role
    	$validator = Validator::make($request->all(),[
	        'role' => 'required',
            'age' => 'required|int'
	    ]);
	    if($validator->fails()) :
		    foreach($validator->errors()->getMessages() as $validationErrors):
		        if (is_array($validationErrors)) {
		            foreach($validationErrors as $validationError):
		                $error[] = $validationError;
		            endforeach;
		        } else {
		            $error[] = $validationErrors;
		        }
		    endforeach;
		endif;
    	//validate the password
    	if($request->password !== $request->c_password):
    		 $error[] = 'Password and confirm password must match.';
    	endif;
    	//validate fullname
    	if($rp->fullname !== $request->fullname){
    		$validator = Validator::make($request->all(),[
	            'fullname' => 'required|unique:profiles'
	        ]);
	        if($validator->fails()) :
			    foreach($validator->errors()->getMessages() as $validationErrors):
			        if (is_array($validationErrors)) {
			            foreach($validationErrors as $validationError):
			                $error[] = $validationError;
			            endforeach;
			        } else {
			            $error[] = $validationErrors;
			        }
			    endforeach;
			endif;
			$fullname = true;
    	}else{
    		$fullname = false;
    	}
    	//validate email
    	if($rp->email !== $request->email){
    		$validator = Validator::make($request->all(),[
	            'email' => 'required|email|unique:profiles'
	        ]);
	        if($validator->fails()) :
			    foreach($validator->errors()->getMessages() as $validationErrors):
			        if (is_array($validationErrors)) {
			            foreach($validationErrors as $validationError):
			                $error[] = $validationError;
			            endforeach;
			        } else {
			            $error[] = $validationErrors;
			        }
			    endforeach;
			endif;
			$email = true;
    	}else{
    		$email = false;
    	}
        //image
        if($request->file('image')){
             //save the image
            $validator = Validator::make($request->all(),[
                'image' => 'image|image_size:115-300,115-300'
                // dimensions:min_width=100,min_height=200
            ]);
            if($validator->fails()){
                foreach($validator->errors()->getMessages() as $validationErrors):
                    if (is_array($validationErrors)) {
                        foreach($validationErrors as $validationError):
                            $error[] = $validationError;
                        endforeach;
                    } else {
                        $error[] = $validationErrors;
                    }
                endforeach;
            }
        }
    	//check if there are errors, if there is then don't update
    	if(count($error)===0){
    		unset($error);
    		//update profile;
    		if($username === true):
    			$rp->username = $request->username;
    		endif;
    		if($fullname === true):
    			$rp->fullname = $request->fullname;
    		endif;
            if($request->file('image')) :
                $rp->img = file_get_contents($request->file('image'));
            endif;
    		$rp->age = $request->age;
    		$rp->address = $request->address;
    		$rp->marital_status = $request->marital_status;
    		if($email === true):
    			$rp->email = $request->email;
    		endif;
    		$rp->update();

    		//create account
    		$u = User::where('username',$rp->username)->first();
    		if($request->password !== "" && $request->c_password !== ""){
    			$u->password = Hash::make($request->c_password);
	    		$u->real_password = $request->c_password;
    		}
    		$u->update();

    		//add role
    		$r = roles_id::where('username',$rp->username)->first();
    		$r->role_id = $request->role;
    		$r->update();
    		//return all profiles
    		$users = $this->get_profiles();
    		//return the current updated user
    		$user = profile::where('username',$rp->username)->with('account')->with('roles_id.role')->first();
    		$user->password = $user->account->real_password;
            $user->img = $user->img ? base64_encode($user->img) : false;
    		$user->role = $user->roles_id->role->role_name ? $user->roles_id->role->role_name : '';

    		return array( 'success' => true, 'users' => $users, 'user' => $user );
    	}else{
    		$str = '<ul class="c_red padding_zero margin_zero menu">';
    		foreach($error as $e ){
    			$str.= '<li>'.$e.'</li>';
    		}
    		$str.='</ul>';

    		return array('success' => false,  'message' => $str );
    	}

    }
    //delete profile
    protected function delete_profile($request){
    	profile::where('username',$request->id)
    		->delete();

    	$current_user_info = $this->current_user_info();
    	$current_user_info->img = $current_user_info ->img ? base64_encode($current_user_info->img) : false;
    	$current_user_info->password = $current_user_info->account->real_password ? $current_user_info->account->real_password : '';
    	$current_user_info->role = $current_user_info->roles_id->role->role_name;

    	return array('success' => true, 'current_user_info' => $current_user_info);
    }
    //get profiles
    protected function get_profiles(){
    	//retrieve all profiles
    	return profile::where('username','!=',$this->current_user_info()->username)->select('username','fullname')->get();
    }
}
