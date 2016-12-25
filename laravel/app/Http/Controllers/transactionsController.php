<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Transaction;
use App\Transfert;
use Input;
use DB;
use App\User;
use App\Magasin;
use Carbon\Carbon;

class transactionsController extends Controller {

	public function __construct()
	{
		$this->middleware('auth');
	}




	public function getDashboard(){
		$mags=Magasin::all();
		$magasins=array();
		$output = new \Symfony\Component\Console\Output\ConsoleOutput(2);


		$annnesT = DB::table('transactions')->select('annee')->distinct()->get();
		$annnesTF = DB::table('transferts')->select('annee')->distinct()->get();
			if(count($annnesT) > count($annnesTF) )
				$annnes = $annnesT;
			else
				$annnes = $annnesTF;
		

		foreach($mags as $key=>$magasin){
			$magasins[$key]=array();
			$magasins[$key]['compta']=array();
			$magasins[$key]['depense']=array();
			$magasins[$key]['transfert']=array();
			$magasins[$key]['id']=array();
			$magasins[$key]['nom']=array();
			$magasins[$key]['id'][0]=$magasin->id;
			$magasins[$key]['nom'][0]=$magasin->nomMagazin;
			
			foreach($annnes as $cle=>$val){
				$magasins[$key]['compta'][$val->annee]=array();
				$magasins[$key]['depense'][$val->annee]=array();
				$magasins[$key]['transfert'][$val->annee]=array();
				for($i=1;$i<=12;$i++){
					$recettes=DB::table('transactions')->where('magasin_id','=',$magasin->id)
														->where('annee','=',$val->annee)
														->where('mois','=',$i)
														->select(array('montant','depense'))->get();

					$magasins[$key]['compta'][$val->annee][$i]=0;
					$magasins[$key]['depense'][$val->annee][$i]=0;
					foreach($recettes as $crec=>$valrec){
						$magasins[$key]['compta'][$val->annee][$i]+=$valrec->montant;
						$magasins[$key]['depense'][$val->annee][$i]+=$valrec->depense;
					}

					$recettes=DB::table('transferts')->where('magasin_id','=',$magasin->id)
														->where('annee','=',$val->annee)
														->where('mois','=',$i)
														->select('montant_transf')->get();

					$magasins[$key]['transfert'][$val->annee][$i]=0;
					foreach($recettes as $crec=>$valrec)
						$magasins[$key]['transfert'][$val->annee][$i]+=$valrec->montant_transf;

				}
			}
		}


		return view('dashboard')->with('magasins',$magasins);
	}

	


	public function getTransactionsExtract(){
		 $user=Auth::user();
		 return view('transactions_extract')->with('user',$user)->with('user',$user)
															 	->with('id_mag',$user->magasins()->first()->id)
																->with('nomMagazin',$user->magasins()->first()->nomMagazin);
		
	}

	public function getTransactionsJournalExtract(){
			$user=Auth::user();
			return view('transactions.compta_journa_extract')->with('user',$user)
															 ->with('id_mag',$user->magasins()->first()->id)
															 ->with('nomMagazin',$user->magasins()->first()->nomMagazin);
			
	}



	

	public function getTransfertsExtract(){
			$user=Auth::user();
			return view('transactions.transferts_journa_extract')->with('user',$user)
															 	 ->with('id_mag',$user->magasins()->first()->id)
																 ->with('nomMagazin',$user->magasins()->first()->nomMagazin);
	}


	public function addTransactions(){
		try {
		$exception =DB::transaction(function() {
			$transactions=Input::all();
		$index=0;
		$output = new \Symfony\Component\Console\Output\ConsoleOutput(2);


		
		foreach($transactions as $tr){

							$tran=new Transaction;
							$str=$tr['dateCompta'];
							$output->writeln($tr['montantCompta'] );
							if($tr['montantCompta'] == -1)
								break;
							$dat=Carbon::createFromFormat('d/m/Y',$str);
							$tran->date_trans=$dat;
							$tran->jour_trans=$tr['jourCompta'];
							$tran->jour=$dat->day;
							$tran->mois=$dat->month;
							$tran->annee=$dat->year;
							$tran->montant=$tr['montantCompta'];
							$tran->depense=$tr['depense'];
							$tran->observation=$tr['observationCompta'];
							$mag=Magasin::find($tr['idCompta']);
							$mag->transactions()->save($tran);
							$index++;
						
					}

		});
			return is_null($exception) ? '100' : '101';
		}
		catch(Exception $e){
			return '101';
		}



	}

	public function addVersements(){
			try {
		$exception =DB::transaction(function() {
			$transactions=Input::all();
		$index=0;
		$output = new \Symfony\Component\Console\Output\ConsoleOutput(2);
		foreach($transactions as $tr){
							$tran=new Transfert;
							$str=$tr['dateTransfert'];
							$output->writeln($tr['montantTransfert'] );
							if($tr['montantTransfert'] == -1)
								break;
							$dat=Carbon::createFromFormat('d/m/Y',$str);
							$tran->date_transf=$dat;
							$tran->jour_transf=$tr['jourTransfert'];
							$tran->jour=$dat->day;
							$tran->mois=$dat->month;
							$tran->annee=$dat->year;
							$tran->montant_transf=$tr['montantTransfert'];
							$tran->transferant=$tr['transferant'];
							$tran->observationTransfert=$tr['observationTransfert'];
							$mag=Magasin::find($tr['idTransfert']);
							$mag->transferts()->save($tran);
							$index++;
					}

		});
			return is_null($exception) ? '100' : '101';
		}
		catch(Exception $e){
			return '101';
		}


	}

}
