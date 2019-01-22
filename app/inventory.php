<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class inventory extends Model
{
    protected $table = "inventory";
    protected $primaryKey = "item_id";
    public $incrementing = false;

    public function profile(){
    	return $this->belongsTo('App\profile','username');
    }
    public function inventory_images(){
    	return $this->hasMany('App\inventory_images','item_id');
    }
    public function request_item(){
        return $this->hasMany('App\request_item','item_id');
    }
    public function getCreatedAtAttribute($timestamp) {
	    return Carbon::parse($timestamp)->format('M d, Y');
	}
	public function getUpdatedAtAttribute($timestamp) {
	    return Carbon::parse($timestamp)->format('M d, Y');
	}
}
