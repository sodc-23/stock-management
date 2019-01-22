<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class notifications extends Model
{
	public $table = 'notifications';

    public function profile(){
    	return $this->belongsTo('App\profile','username','username');
    }

}
