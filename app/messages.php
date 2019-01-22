<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class messages extends Model
{
    protected $table = "messages";

    public function profile(){
    	return $this->belongsTo('App\profile','username');
    }

}
