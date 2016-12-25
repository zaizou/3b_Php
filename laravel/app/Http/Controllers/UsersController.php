<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;



use Input;
use DB;
use App\User;
use App\Fonctionnalites;



class UsersController extends Controller {


public function __construct()
	{
		$this->middleware('auth');
	}


public function gestionUsersShow(){
		$users=User::all();	
		return view('gestion_utilisateurs')->with('listUtilisateurs',$users);
	}

	public function createUser(){
		try{
			$exception =DB::transaction(function() {

		$user=new User;
		$user->username=Input::get('id_utilisateur');
		if (User::where('username', '=', $user->username)->exists()) 
 		  return '102';
		$user->password=Input::get('passwd');
		$repass=Input::get('reppassw');
		if($user->password != $repass)
			return '603';
		$user->nom=Input::get('nom');
		$user->prenom=Input::get('prenom');
		$user->email=Input::get('mail');
		$user->tel=Input::get('tel');
		$user->actif=Input::get('actif');
		$user->address=Input::get('addresse');
		if(! $user->save())
			return '104';
		$fcns=Input::get('fonctionnalites');
		if(sizeof($fcns)>0)
			foreach($fcns as $fcn)
				$user->fonctionnalite()->attach(($fcn));
			});
				return is_null($exception) ? '100' : '101';
		}
		catch(Exception $e){
			return '101';

		}
		
	}



	public function updateUser(){
		try{
			$exception =DB::transaction(function() {

		$user=User::where('username','=',Input::get('id_utilisateur'))->first();
		if(!$user)
			return '101';
		
		$user->password=Input::get('passwd');
		$repass=Input::get('reppassw');
		if($user->password != $repass || strlen ($user->password)<4)
			return '603';
		$user->password=bcrypt(Input::get('passwd'));
		$user->nom=Input::get('nom');
		$user->prenom=Input::get('prenom');
		$user->email=Input::get('mail');
		$user->tel=Input::get('tel');
		$user->actif=Input::get('actif');
		$user->address=Input::get('addresse');
		$user->fonctionnalite()->detach();
		$fcns=Input::get('fonctionnalites');
		if(sizeof($fcns)>0)
			foreach($fcns as $fcn)
				$user->fonctionnalite()->attach(($fcn));

		if(! $user->save())
			return '104';

			});
				return is_null($exception) ? '100' : '101';
		}
		catch(Exception $e){
			return '101';

		}
	}


	public function deleteUser(){
		if(User::where('username','=',Input::get('id_utilisateur'))->delete() )
			return '100';
		return '101';
	}


		public function getUser(){
		$un=Input::get('id_utilisateur');
		$user=User::where('username','=',$un)->first();
		$col=$user->fonctionnalite()->get();

		if($user)
			return  view('gestion_utilisateurs_pages.utilisateur_detaill')->with('utilisateur',$user)->with('fca',$col);
		/*else 
			return view('404');*/


	}

	public function getFonctionnalitesList(){
			$listFcn=Fonctionnalites::all();
			return $listFcn;
	}

}
