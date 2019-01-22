<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class request_item extends Model
{
    protected $table = "request_items";

    public function profile(){
    	return $this->belongsTo('App\profile','username');
    }
    public function inventory(){
        return $this->belongsTo('App\inventory','item_id');
    }
    public function getCreatedAtAttribute($timestamp) {
	    return Carbon::parse($timestamp)->format('M d, Y');
	}
}
