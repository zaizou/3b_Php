<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Transfert extends Model {

	//
		public function magasin()
  {
    return $this->belongsTo('App\User','magasin_id','magasin_id');
  }

}
