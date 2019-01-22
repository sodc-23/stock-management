<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;

//storage and file facades
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;	
//validation facades
use Illuminate\Support\Facades\Validator;
//models
use App\inventory;
use App\inventory_images;
use App\request_item;
use App\messages;
use App\notifications;
//use facades redis
use Illuminate\Support\Facades\Redis;

use App\permissions_id;

class InventoryController extends HomeController
{
     public function index(){

    	$current_page = "inventory";
    	//get inventory
    	$inv = inventory::orderBy('created_at','asc')->orderBy('updated_at','asc')->take(200)->get();
    	//get the current user info
    	$current_user_info = $this->current_user_info();
        //get the unread messages
        $messages = messages::where('status','unread')->where('to_who',$this->current_user_info()->username)->orderBy('created_at','asc')->get();
        //get the notifications
        $notifications = $this->notifications;

    	return view('layouts.pages.inventory',compact('current_page','inv','current_user_info','messages','notifications'));
    }
    public function get_images(Request $request){
    	$images = inventory_images::where('item_id',$request->id)->get();

    	return response()->json([ 'success' => true, 'images' => $images, 'id' => $request->id ]);
    }//end index
    //upload image
    public function upload_image(Request $request){
    	$error = array();
        $file = $request->file('image');
    	//check if there's a file image
    	if($file){ //if there's an image then
                $validator = Validator::make($request->all(),[
                    'image.*' => 'image|image_size:115-1000,115-10000'
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
                }//end if validation fails
                foreach($request->file('image') as $i){
                    if(Storage::exists($request->id.'[x]'.$i->getClientOriginalName())){
                        $error[] = $i->getClientOriginalName()." already exists.";
                    }
                }
            if(count($error)===0){
                unset($error);
                foreach($request->file('image') as $i){
                    if($request->item_edit):
                        Storage::delete($request->item_edit);
                    endif;
                    $extension = $i->getClientOriginalExtension();
                    $file_name = $request->id.'[x]'.$i->getClientOriginalName();

                    Storage::put($file_name, File::get($i));
                    if($request->item_edit):
                        $img = inventory_images::where('image_name',$request->item_edit)->first();
                    else:
                        $img = new inventory_images();
                    endif;
                    $img->image_name = $file_name;
                    $img->image_type = $extension;
                    if(!$request->item_edit):
                        $img->item_id = $request->id;
                        $img->save();
                    else:
                        $img->update();
                    endif;
                }
                return response()->json([ 'success' => true,  'images' => inventory_images::where('item_id',$request->id)->get() ]);
            }else{
                $str = '<ul class="c_red padding_zero margin_zero menu">';
                foreach($error as $e ){
                    $str.= '<li>'.$e.'</li>';
                }
                $str.='</ul>';

                return response()->json([ 'success' => false,  'message' => $str ]);
            }
        }else{ //else if there's no image file
            return response()->json([ 'success' => false,  'message' => "Image is required" ]);
        }//end checking if file exist
        

    }//end upload image
    //delete image
    public function delete_image(Request $request){
        $ids = explode(',',$request->ids);
        foreach($ids as $id){
            inventory_images::where('image_name',$id)->delete();
            Storage::delete($id);
        }
        return response()->json([ 'success' => true, 'ids' => $request->ids ]);
    }
    //data filter (filter records in inventory)
    public function data_filter(Request $request){
        $date_from= date_create($request->from);
        $from = date_format($date_from,"Y-m-d H:i:s");
        //to
        $date_to= date_create($request->to);
        $to = date_format($date_to,"Y-m-d H:i:s");

        $inv = inventory::whereBetween('created_at', [$from, $to])->orderBy('created_at','asc')->orderBy('updated_at','asc')->get();

        return response()->json([ 'success' => true, 'items' => $inv ]);
    }
    //reload inventory
    public function reload_inventory(){
        return response()->json([ 'success' => true, 'items' => inventory::orderBy('created_at','asc')->orderBy('updated_at','asc')->take(200)->get() ]);
    }
    //item engine (add, edit, delete item)
    public function item_engine(Request $request){
        switch($request->type){
            case "add":
                $m = $this->add_item($request);
            break;
            case "edit":
                $m = $this->edit_item($request);
            break;
            case "delete":
                $m = $this->delete_item($request);
            break;
            case "request_item":
                $m = $this->request_item($request);
            break;
            default:
                dd(var_dump("Micheal Jackson is dead!"));
        }

        return response()->json($m);
    } //end iten engine
    //add item
    protected function add_item($request){
        $error = array();
        $validator = Validator::make($request->all(),[
            'item_name' => 'required|unique:inventory',
            'item_quantity' => 'required|int'
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

        if(count($error)===0){
            unset($error);
            //check and count inventory records
            $inventory = inventory::all();
            if(count($inventory)){
                $item_id = 'inv_'.$this->randomString().'_'.(count($inventory)+1);
            }else{
                $item_id = 'inv_'.$this->randomString().'_'.'1';
            }
            //create inventory item
            $inv = new inventory();
            $inv->item_id = $item_id;
            $inv->username = $this->current_user_info()->username;
            $inv->item_name = $request->item_name;
            $inv->item_description = $request->item_description;
            $inv->item_quantity = $request->item_quantity;
            $inv->save();


            //send notification
            $data = [
                'event' => 'notification',
                'contents' => '<b>'.$this->current_user_info()->fullname.'</b> has added new item named '.$inv->item_name.'.',
                'to' => '5',
                'type' => 'inventory',
                'sender' => $this->current_user_info()->username
            ];


            //get the admin and inventory users
            $r = permissions_id::where('perm_id',5)->get();

            foreach($r as $rr):
                //save to notifications
                $n = new notifications();
                $n->username = $this->current_user_info()->username;
                $n->to_who = $rr->username;
                $n->contents = $data['contents'];
                $n->save();
            endforeach;
            
            Redis::publish('notifications',json_encode($data));

            //retrieved all inventory items
            $inv_items = inventory::orderBy('created_at','asc')->orderBy('updated_at','asc')->take(200)->get();
            
            return array( 'success' => true, 'items' => $inv_items );
        }else{
            $str = '<ul class="c_red padding_zero margin_zero menu">';
            foreach($error as $e ){
                $str.= '<li>'.$e.'</li>';
            }
            $str.='</ul>';

            return array('success' => false,  'message' => $str );
        }
    }//end add item
    //random string function
    function randomString($length = 6) {
        $str = "";
        $characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
        $max = count($characters) - 1;
        for ($i = 0; $i < $length; $i++) {
            $rand = mt_rand(0, $max);
            $str .= $characters[$rand];
        }
        return $str;
    }//end random string function
    //delete item
    protected function delete_item($request){
        $ids = explode(',',$request->ids);
        foreach($ids as $id){
            $inv = inventory::where('item_id',$id)->first();
            foreach(inventory_images::where('item_id',$inv->item_id)->get() as $i):
                Storage::delete($i->image_name);
            endforeach;
            //delete all the images associated with the ids
            $inv->delete();
        }

        return array( 'success' => true, 'ids' => $ids );
    }//end function delete item

    //edit item
    protected function edit_item($request){
        $error = array();
        $ri = inventory::where('item_id',$request->id)->first();
        if($ri->item_name !== $request->item_name){
            $validator = Validator::make($request->all(),[
                'item_name' => 'required|unique:inventory',
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

        }

        $validator = Validator::make($request->all(),[
            'item_quantity' => 'required|int'
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
        

        if(count($error)===0){
            unset($error);
            //update inventory item
            if($ri->item_name !== $request->item_name){
                $ri->item_name = $request->item_name;
            }
            $ri->item_description = $request->item_description;
            $ri->item_quantity = $request->item_quantity;
            $ri->update();

            //retrieved all inventory items
            $inv_items = inventory::orderBy('created_at','asc')->orderBy('updated_at','asc')->take(200)->get();
            
            return array( 'success' => true, 'items' => $inv_items );
        }else{
            $str = '<ul class="c_red padding_zero margin_zero menu">';
            foreach($error as $e ){
                $str.= '<li>'.$e.'</li>';
            }
            $str.='</ul>';

            return array('success' => false,  'message' => $str );
        }
    } //end function edit item
    //request item
    protected function request_item($request){
        $error = array();
        $validator = Validator::make($request->all(),[
            'item_id' => 'required',
            'item_quantity' => 'required|int|min:0',
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
        else:
            if((int)$request->item_quantity === 0){
                $error[] = 'Item quantity must not be equal to zero';
            }else{
                 $iq = inventory::where('item_id',$request->item_id)->first();
                //check if the requested item quantity is not 0
                if((int)$iq->item_quantity === 0){
                    $error[] = 'Item is not available for request, quantity is 0';
                }
                //check the quantity
                //check if the requested item quantity is not 0
                if($request->item_quantity > $iq->item_quantity){
                    $error[] = 'Item quantity must not be greater from the current stock quantity, you input '.$request->item_quantity.' while the current stock quantity is '.$iq->item_quantity;
                }
            }
           
        endif;

        if(count($error)===0){
            unset($error);
            //update inventory item
            $ri = new request_item();
            $ri->item_id = $request->item_id;
            $ri->item_quantity = $request->item_quantity;
            $ri->username = $request->id;
            $ri->status = 'PENDING';
            $ri->save();

            //replicate the update to the inventory
            $i = inventory::where('item_id',$request->item_id)->first();
            $i->item_quantity = $i->item_quantity - $request->item_quantity;
            $i->update();
            //retrieved all inventory items
            $inv_items = inventory::orderBy('created_at','asc')->orderBy('updated_at','asc')->take(200)->get();

            //send notification
            $data = [
                'event' => 'notification',
                'contents' => '<b>'.$this->current_user_info()->fullname.'</b> has request an item named <b>'.$i->item_name.'</b>. You may approve or disapprove the request from the request table in the reporting page.',
                'to' => '1',
                'type' => 'item request',
                'sender' => $this->current_user_info()->username

            ];


            //get the admin and inventory users
            $r = permissions_id::where('perm_id',0)->orWhere('perm_id',1)->get();

            foreach($r as $rr):
                //save to notifications
                $n = new notifications();
                $n->username = $this->current_user_info()->username;
                $n->to_who = $rr->username;
                $n->contents = $data['contents'];
                $n->save();
            endforeach;
            
            Redis::publish('notifications',json_encode($data));


            return array( 'success' => true, 'items' => $inv_items );
        }else{
            $str = '<ul class="c_red padding_zero margin_zero menu">';
            foreach($error as $e){
                $str.= '<li>'.$e.'</li>';
            }
            $str.='</ul>';

            return array('success' => false,  'message' => $str );
        }
    }//end function request item
    //get items
    public function get_items(){
        return response()->json([ 'success' => true, 'items' => inventory::where('item_quantity','!=',0)->select('item_id','item_name','item_quantity')->get() ]);
    }
}
