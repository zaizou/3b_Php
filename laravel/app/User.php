<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'email', 'password'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['password', 'remember_token'];



 public function fonctionnalite()
  {
	return $this->belongsToMany('App\Fonctionnalites','fonctionnalites_user','user_id','id_fonct');
  }



 public function magasins()
  {
	return $this->belongsToMany('App\Magasin','magasin_user','user_id','magasin_id')->withTimestamps();
  }

  public function getUsername(){
	  return $this->username;
  }
  public function getId(){
	  return $this->id;
  }



/*
public function magasin(){	

	return $this->hasOne('App\Magasin');
}
*/





}
