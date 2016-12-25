<?php namespace App\Http\Controllers;

use Input;
use Request;
use DB;
use App\User;
use App\Fonctionnalites;
use App\Transaction;
use App\Magasin;
use Carbon\Carbon;




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
	 */
	public function __construct()
	{
		$this->middleware('guest');
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('home/home');
	}

		public function gestionUsersShow(){
		$users=User::all();	
		return view('gestion_utilisateurs')->with('listUtilisateurs',$users);
	}

	public function getDashboard(){
		return view('dashboard');
	}

	public function getMagasins(){
		return view('gestion_magasins');
	}

	public function getTransactionsExtract(){
		return view('transactions_extract');
	}

	public function getTransactionsJournalExtract(){
			return view('transactions.compta_journa_extract');
					}



	public function getFonctionnalitesList(){
			$listFcn=Fonctionnalites::all();
			return $listFcn;
	}

	public function getTransfertsExtract(){
			return view('transactions.transferts_journa_extract');
	}

	public function createUser(){
		$user=new User;
		$user->username=Input::get('id_utilisateur');
		$testUser=User::where('username', '=', $user->username)->first();
		 if($testUser != null )
			return '602';
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

		$saved=false;
		if($user->save())
			$saved=true;
		else return '500';

		$fcns=Input::get('fonctionnalites');
		foreach($fcns as $fcn)
			$user->fonctionnalite()->attach(($fcn));
			
		return '100';

		
	}



	public function doSendTransactionInTransactionMode(){

			
			//return $transactions[0];

				try {
				$exception = DB::transaction(function() {
					// Run queries here
				$transactions=Input::all();
				
				//return Input::all();
				//Log::info($_POST['data']);
				return $transactions[0];
				foreach($transactions as $tr){
						//$tr=json_decode($tr->toSting());
						//return $tr;
						$tran=new Transaction;
						$tran->date_trans=Carbon::createFromFormat('d-m-Y', $tr['dateCompta'])->toDateString();
						$tran->jour_trans=$tr->jourCompta;
						$tran->jour=Carbon::createFromFormat('d-m-Y', $tr['dateCompta'])->day;
						$tran->mois=Carbon::createFromFormat('d-m-Y', $tr['dateCompta'])->month;
						$tran->annee=Carbon::createFromFormat('d-m-Y', $tr['dateCompta'])->year;
						$tran->montant=$tr['montantCompta'];
						$tran->depense=$tr['depense'];
						$tran->observation=$tr['observationCompta'];
						Magasin::where('magasin_id','=','1')->first()->attach($tran);
						

					}

				});

				//return is_null($exception) ? '101' : '100';

				} catch(Exception $e) {
					return '100';
			}

			
	}

	public function addTransactions(){
		//$mg->transactions()->save($tr)
		//$vf=Carbon\Carbon::createFromFormat('Y-m-d', '1975-05-21')->toDateString();
		$transactions=Input::all();
		

		foreach($transactions as $tr){
						//$tr=json_decode($tr);
						//return $tr;
						return $tr['dateCompta'];
						$tran->date_trans=Carbon::createFromFormat('d/m/Y', $tr['dateCompta'])->toDateString();
						$tran->jour_trans=$tr->jourCompta;
						$tran->jour=Carbon::createFromFormat('d/m/Y', $tr['dateCompta'])->day;
						$tran->mois=Carbon::createFromFormat('d/m/Y', $tr['dateCompta'])->month;
						$tran->annee=Carbon::createFromFormat('d/m/Y', $tr['dateCompta'])->year;
						$tran->montant=$tr['montantCompta'];
						$tran->depense=$tr['depense'];
						$tran->observation=$tr['observationCompta'];
						Magasin::where('magasin_id','=','1')->first()->attach($tran);
						

					}

		return '100';



	}

	public function addVersements(){
		//$mg->transactions()->save($tr)
		//$vf=Carbon\Carbon::createFromFormat('Y-m-d', '1975-05-21')->toDateString();
	}










}
