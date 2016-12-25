<?php namespace App\Http\Controllers;

use Input;
use Request;
use DB;
use App\User;
use App\Magasin;
use Carbon\Carbon;
use App\Wilaya;
use App\Fonctionnalites;
use App\Transaction;
use App\Transfert;
use Illuminate\Support\Facades\Auth;



class WelcomeController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Welcome Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders the "marketing page" for the application and
	| is configured to only allow guests. Like most of the other sample
	| controllers, you are free to 		ify or remove it as you desire.
			|
			*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 *//*
	public function __construct()
	{
		$this->middleware('guest');
	}
	*/

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('home/home');
	}

	public function getShop(){
		return view('shop');
	}






	

	


	









}

