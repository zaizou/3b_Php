<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Magasin extends Model {

	 public function users()
  {
    return $this->belongsToMany('App\User','magasin_user','magasin_id','user_id');
  }

  public function what_ordre(){
      return ($this->ordre==0)? 'Haut' : 'Bas' ;
  }


	public function transactions()
  {
    return $this->hasMany('App\Transaction');
  }

	public function transferts()
  {
    return $this->hasMany('App\Transfert');
  }

  public function wilaya()
  {
    return $this->belongsTo('App\Wilaya');
  }

  public function imagesMagasin(){
		return $this->hasMany('App\ImageMagasin');
	}





}
