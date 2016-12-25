<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Input;
use Request;
use DB;

use Illuminate\Support\Facades\Auth;

class myController extends Controller {

	public function AuthenticateUser(Request $request){

		$username=Input::get('username');
		$password=Input::get('password');
  		if (Auth::attempt(['username' => $username, 'password' => $password])) {
            // Authentication passed...
            return redirect()->intended('/');
        }
/*
		$res=User::where('username','=',Input::get('username'))->where('password','=',Input::get('password'))->first()  ;
		if($res)
			return redirect()->intended($this->redirectPath());
		else*/
			return redirect()->intended('/logint');
	}

	public function redirectPath()
	{
		if (property_exists($this, 'redirectPath'))
		{
			return $this->redirectPath;
		}

		return property_exists($this, 'redirectTo') ? $this->redirectTo : '/';
	}

	public function logoutUser(){
		Auth::logout();	
		return redirect()->intended('/');
	}

	



}
