<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Wilaya extends Model {

	//


	public function magasin(){
		return $this->hasMany('App\Magasin');
	}

	public function getIntitule(){
		return $this->intitule_wilaya;
	}

}
