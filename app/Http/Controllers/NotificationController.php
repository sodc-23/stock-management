<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;

use App\notifications;
// use \ZMQContext;
// use \ZMQ;

//use facade redis
use Illuminate\Support\Facades\Redis;

class NotificationController extends HomeController
{

	public function test($notification){

		$data = [
			'event' => 'notification',
			'contents' => $notification

		];

		Redis::publish('notifications',json_encode($data));

		return 'done';
		
	}

	public function notify(){
		//remove the notifications which has a type of 'all'
		$n = notifications::where('to_who',$this->current_user_info()->username)->get();
		if(count($n)!==0):
			foreach($n as $r):
				$r->delete();
			endforeach;
		endif;

		return response()->json([ 'success' => true ]);
	}
}


