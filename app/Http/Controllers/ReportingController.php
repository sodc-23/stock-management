<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;

//reporting model
use App\request_item;
use App\profile;
use App\inventory;
use App\messages;
use App\notifications;
use App\roles_id;

//use facade redis
use Illuminate\Support\Facades\Redis;

class ReportingController extends HomeController
{
    public function index(){
    	$current_page = "Reporting";
    	//get the current user info
    	$current_user_info = $this->current_user_info();
    	//retrieved the request table records
    	$pending_items = request_item::where('status','PENDING')->orderBy('created_at','asc')->orderBy('updated_at','asc')->get();
        $history_items = request_item::where('status','APPROVE')->orderBy('created_at','asc')->orderBy('updated_at','asc')->take(200)->get();

    	foreach($pending_items as $i):
    		$i->name = $i->profile->fullname;
            $i->item_name = $i->inventory->item_name;
    	endforeach;

        foreach($history_items as $i):
            $i->name = $i->profile->fullname;
            $i->item_name = $i->inventory->item_name;
        endforeach;
        //get the unread messages
        $messages = messages::where('status','unread')->where('to_who',$this->current_user_info()->username)->orderBy('created_at','asc')->get();
        foreach($messages as $i):
            $i->name = profile::find($i->username)->fullname;
        endforeach;

        //get the history messages
        $history_messages = messages::where('status','read')->where('to_who',$this->current_user_info()->username)->orderBy('created_at','asc')->orderBy('updated_at','asc')->take(200)->get();
        foreach($history_messages as $i):
            $i->name = profile::find($i->username)->fullname;
        endforeach;
        //get the notifications
        $notifications = $this->notifications;

    	return view('layouts.pages.reporting',compact('current_page','current_user_info','pending_items','history_items','messages','history_messages','notifications'));
    }
    public function reload_inventory_request(Request $request){

        //retrieved the request table records
        $pending_items = request_item::where('status','PENDING')->orderBy('created_at','asc')->orderBy('updated_at','asc')->get();
        $history_items = request_item::where('status','APPROVE')->orderBy('created_at','asc')->orderBy('updated_at','asc')->take(200)->get();

        foreach($pending_items as $i):
            $i->name = profile::find($i->username)->fullname;
            $i->item_name = $i->inventory->item_name;
        endforeach;

        foreach($history_items as $i):
            $i->name = profile::find($i->username)->fullname;
            $i->item_name = $i->inventory->item_name;
        endforeach;


        return response()->json([ 'success' => true, 'pending_items' => $pending_items, 'history_items' => $history_items ]);
    }
    public function get_reporting_request_graph(Request $request){
        //in stock items
        $i = inventory::where('item_quantity','!=',0)->whereRaw('year(`created_at`) = ?', array(date('Y')))->get();
        $j = inventory::where('item_quantity',0)->whereRaw('year(`created_at`) = ?', array(date('Y')))->get();
        $k = request_item::whereRaw('year(`created_at`) = ?', array(date('Y')))->get();
        $l = inventory::whereRaw('year(`created_at`) = ?', array(date('Y')))->get();

        return response()->json([ 'success' => true, 'in_stock_array' => $i, 'out_of_stock_array' => $j, 'requested_items_array' => $k, 'all_items' => $l ]);
    }
    public function get_reporting_inventory_data_filter(Request $request){
        $date_from= date_create($request->from);
        $from = date_format($date_from,"Y-m-d H:i:s");
        //to
        $date_to= date_create($request->to);
        $to = date_format($date_to,"Y-m-d H:i:s");

        //retrieved the request table records
        $pending_items = request_item::whereBetween('created_at', [$from, $to])->where('status','PENDING')->orderBy('created_at','asc')->orderBy('updated_at','asc')->get();
        $history_items = request_item::whereBetween('created_at', [$from, $to])->where('status','APPROVE')->orderBy('created_at','asc')->orderBy('updated_at','asc')->get();

        foreach($pending_items as $i):
            $i->name = profile::find($i->username)->fullname;
            $i->item_name = $i->inventory->item_name;
        endforeach;

        foreach($history_items as $i):
            $i->name = profile::find($i->username)->fullname;
            $i->item_name = $i->inventory->item_name;
        endforeach;

        return response()->json([ 'success' => true, 'pending_items' => $pending_items, 'history_items' => $history_items ]);
    }

    public function get_reporting_graph_data_filter(Request $request){
        $date_from= date_create($request->from);
        $from = date_format($date_from,"Y-m-d H:i:s");
        //to
        $date_to= date_create($request->to);
        $to = date_format($date_to,"Y-m-d H:i:s");

        //in stock items
        $i = inventory::where('item_quantity','!=',0)->whereBetween('created_at', [$from, $to])->get();
        $j = inventory::where('item_quantity',0)->whereBetween('created_at', [$from, $to])->get();
        $k = request_item::whereBetween('created_at', [$from, $to])->get();
        $l = inventory::whereBetween('created_at', [$from, $to])->get();

        return response()->json([ 'success' => true, 'in_stock_array' => $i, 'out_of_stock_array' => $j, 'requested_items_array' => $k, 'all_items' => $l ]);
    }
    //delete request item/items
    public function request_delete(Request $request){
        $ids = explode(',',$request->ids);
        foreach($ids as $id){
            request_item::find($id)->delete();
        }

        return response()->json([ 'success' => true, 'ids' => $ids ]);
        
    }
    //approve request item/items
    public function request_approve(Request $request){
        $ids = explode(',',$request->ids);
        foreach($ids as $id){
            $item = request_item::find($id);
            $item->status = 'APPROVE';
            $item->update();

             //send notification
            $data = [
                'event' => 'notification',
                'contents' => '<b>'.$this->current_user_info()->fullname.'</b> has approved your item request for your item named '.$item->inventory->item_name.'.',
                'to' => $item->username,
                'sender' => $this->current_user_info()->username

            ];


            //save to notifications
            $n = new notifications();
            $n->username = $this->current_user_info()->username;
            $n->to_who = $data['to'];
            $n->contents = $data['contents'];
            $n->save();
            
            Redis::publish('notifications',json_encode($data));
        }



        return response()->json([ 'success' => true, 'ids' => $ids ]);
        
    }
    //reject request item/items
    public function request_reject(Request $request){
        $ids = explode(',',$request->ids);
        foreach($ids as $id){
            //replicate the update to the inventory
            $i = inventory::where('item_id',request_item::find($id)->item_id)->first();
            $i->item_quantity = $i->item_quantity + request_item::find($id)->item_quantity;
            $i->update();

            $item = request_item::find($id);

            //send notification
            $data = [
                'event' => 'notification',
                'contents' => '<b>'.$this->current_user_info()->fullname.'</b> has rejected your item request for your item named '.$item->inventory->item_name.'.',
                'to' => $item->username,
                'sender' => $this->current_user_info()->username

            ];

            //save to notifications
            $n = new notifications();
            $n->username = $this->current_user_info()->username;
            $n->to_who = $data['to'];
            $n->contents = $data['contents'];
            $n->save();
            
            Redis::publish('notifications',json_encode($data));

            //delete the item
            $item->delete();
        }

        return response()->json([ 'success' => true, 'ids' => $ids ]);
        
    }
    //MESSAGES --------------------------------------------------------------
    //reload message
     public function reload_messages(Request $request){

        //get the unread messages
        $messages = messages::where('status','unread')->where('to_who',$this->current_user_info()->username)->orderBy('created_at','asc')->get();
        foreach($messages as $i):
            $i->name = profile::find($i->username)->fullname;
        endforeach;

        //get the history messages
        $history_messages = messages::where('status','read')->where('to_who',$this->current_user_info()->username)->orderBy('created_at','asc')->orderBy('updated_at','asc')->take(200)->get();
        foreach($history_messages as $i):
            $i->name = profile::find($i->username)->fullname;
        endforeach;


        return response()->json([ 'success' => true, 'messages' => $messages, 'history_messages' => $history_messages]);
    }
    public function read_message(Request $request){

        $m = messages::find($request->id);
        $m->status = 'read';
        $m->update();

        return response()->json([ 'success' => true, 'id' => $request->id ]);
    }
    //send message
    public function send_message(Request $request){

        $r = roles_id::where('role_id',1)->orWhere('role_id',2)->get();
        foreach($r as $rr):
        $m = new messages();
        $m->username = $this->current_user_info()->username;
        $m->to_who = $rr->username;
        $m->messages = $request->message;
        $m->status = 'unread';
        $m->save();
        endforeach;

       //send notification
        $data = [
            'event' => 'notification',
            'contents' => '<b>'.$this->current_user_info()->fullname.'</b> has sent you a message.',
            'to' => '1',
            'type' => 'message',
            'sender' => $this->current_user_info()->username
        ];
        
        Redis::publish('notifications',json_encode($data));

        return response()->json([ 'success' => true ]);
    }
    //delete message(s)
    public function delete_message(Request $request){
        $ids = explode(',',$request->ids);
        foreach($ids as $id){
            messages::find($id)->delete();
        }

        return response()->json([ 'success' => true, 'ids' => $ids ]);
        
    }

}
