<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class inventory_images extends Model
{
    protected $table = "inventory_images";

    public function inventory(){
    	return $this->belongsTo('App\inventory','item_id');
    }
}
