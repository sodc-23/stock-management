<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class permission extends Model
{
    protected $table = "permissions";
    protected $primaryKey = "perm_id";
    public $incrementing = false;

    public function roles_id(){
    	return $this->belongsTo('App\permissions_id','perm_id');
    }
}
