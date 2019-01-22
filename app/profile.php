<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class profile extends Model
{
    protected $table = "profiles";
    protected $primaryKey = "username";
    public $incrementing = false;

    public function account(){
    	return $this->hasOne('App\User','username');
    }
    public function roles_id(){
    	return $this->hasOne('App\roles_id','username','username');
    }

    public function permissions_id(){
        return $this->hasMany('App\permissions_id','username','username');
    }

    public function inventory(){
    	return $this->hasMany('App\inventory','username');
    }

    public function request_item(){
        return $this->hasMany('App\request_item','username');
    }

    public function messages(){
        return $this->hasMany('App\messages','username');
    }

    public function notifications(){
        return $this->hasMany('App\notifications','username');
    }

}
