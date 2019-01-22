<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class roles_id extends Model
{
    protected $table = "roles_id";
    protected $primaryKey = "role_id";
    public $incrementing = false;

    public function role(){
    	return $this->hasOne('App\role','role_id');
    }
    public function profile(){
    	return $this->belongsTo('App\profile','username','username');
    }
}
