<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model {

	//
	public function magasin()
  {
    return $this->belongsTo('App\User','magasin_id','magasin_id');
  }

}
