<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class permissions_id extends Model
{
    protected $table = "permissions_id";
    protected $primaryKey = "perm_id";

    public function permission(){
    	return $this->hasOne('App\permission','perm_id');
    }
    public function profile(){
    	return $this->belongsTo('App\profile','username','username');
    }
}
