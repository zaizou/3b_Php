<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Fonctionnalites extends Model {

	//
	 public function users()
  {
    return $this->belongsToMany('App\User','fonctionnalites_user','id_user','id_fonct');
  }




}
