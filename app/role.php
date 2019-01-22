<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class role extends Model
{
    protected $table = "roles";
    protected $primaryKey = "role_id";

    public function roles_id(){
    	return $this->belongsTo('App\roles_id','role_id');
    }
}
