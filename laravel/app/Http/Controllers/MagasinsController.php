<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Http\Response;



use Input;
use DB;
use App\User;
use App\Magasin;
use App\Wilaya;
use App\ImageMagasin;

class MagasinsController extends Controller {


	public function __construct()
	{
		$this->middleware('auth');
	}



	public function getMagasins(){
		$mags=Magasin::all();
		return view('gestion_magasins')->with('listMagasins',$mags);
	}
	

	public function createMagasin(){
		$magasin=new Magasin;
		$magasin->nomMagazin=Input::get('nom');
		$magasin->adresseMagasin=Input::get('addresse');
		$magasin->latitude=Input::get('latitude');
		$magasin->longitude=Input::get('longitude');
		$magasin->type=Input::get('type_magasin');
		$magasin->ordre=Input::get('ordre_magasin');
		$magasin->telephone=Input::get('telphone');
		$magasin->email=Input::get('email');
		$magasin->placeId=Input::get('placeid');
		$magasin->videoId=Input::get('videoId');
		$magasin->nomDossierStockage=Input::get('dossierStockage');

		$res=Input::get('responsable');
		$responsable=User::find($res); 
		if(!$responsable)
			return $responsable;// '1011';
		if( ! $responsable->magasins()->get()->isEmpty()  )
			return '1013';

		$mat=Input::get('wilaya');
		$wil=Wilaya::where('matricule_wilaya','=',$mat)->first();
		if(!$wil)
			return '1012';

		$magasin->wilaya()->associate($wil);
	
			$magasin->save();
			$magasin->users()->sync([$responsable->id]);
			return '100';
	}


	public function updateMagasin(){

		try{
		$exception =DB::transaction(function() {

		$magasin=Magasin::find(Input::get('idMagasin'));
		$magasin->nomMagazin=Input::get('nomMagasin');
		$magasin->adresseMagasin=Input::get('adresseMag');
		$magasin->latitude=Input::get('latitudeMag');
		$magasin->longitude=Input::get('longitudeMag');
		$magasin->type=Input::get('type_magasin');
		if(Input::get('ordre_magasin'))
			$magasin->ordre=Input::get('ordre_magasin');
		$magasin->telephone=Input::get('tel');
		$magasin->email=Input::get('email');
		$magasin->placeId=Input::get('placId');
		$magasin->videoId=Input::get('vidId');
		if(Input::get('dossierStockage'))
			$magasin->nomDossierStockage=Input::get('dossierStockage');

		$res=Input::get('responsable');
		$responsable=User::find($res); 
		if(!$responsable)
			return '1011';// '1011';


		$mat=Input::get('wilayaMagasin');
		$wil=Wilaya::where('matricule_wilaya','=',$mat)->first();
		if(!$wil)
			return '1012';

			//$magasin->wilaya()->detach();
			$magasin->users()->detach();
			$magasin->wilaya()->associate($wil);
			$magasin->users()->sync([$responsable->id]);
			$magasin->save();
			//return '100';

			});
			return is_null($exception) ? '100' : '101';
		}
		catch(Exception $e){
			return '101';

		}
		
	}


	public function deleteMagasin(){
		if( Magasin::where('nomMagazin','=',Input::get('nom_magasin'))->delete() ){
			ImageMagasin::where('nomMagasin','=',Input::get('nom_magasin'))->delete();
			return '100';
		}
		else return '101';
	}


	public function getMagasin(){
		$mag=Magasin::where('nomMagazin','=',Input::get('id_magasin'))->first();
		$img=ImageMagasin::where('nomMagasin','=',Input::get('id_magasin'))->get();
		if($mag)
			return view('gestion_magasins_pages.magasin_detail')->with('magasin',$mag)->with('images',$img);
		else return '101';

	}


	public function cleanI($string) {
   $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

   return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}

	public function addImage(){
		$img=new ImageMagasin;

		$img->nomMagasin=Input::get('name');
		$img->dossierStock=Input::get('dossier');
		$file = Input::file('file');

		

		$filename = str_random(12) .'.png';
		//$img->path="uploads/". Input::get('name') . "/" . $filename;
		$img->originalFilename=$file->getClientOriginalName();
		
		
		$destinationPath ='uploads\/'. Input::get('dossier');
		$img->path=$destinationPath .'\/'.$filename;
		// If the uploads fail due to file system, you can try doing public_path().'/uploads' 
		//$extension =$file->getClientOriginalExtension(); 
		$upload_success = Input::file('file')->move($destinationPath, $filename);

		if( $upload_success ) {
			$img->save();

		return '100';//Response::json('success', 200);
		} else {
		return '101';//Response::json('error', 400);
		}


	}

	public function removeImage(){
		if(ImageMagasin::find(Input::get('id_image'))->delete())
			return '100';
		else return '101';
		
	}


	public function getWilayas(){
		return Wilaya::all();
	}

		public function getUsers(){
		$use=User::all();//  ->where()  withPivot('type');
		$users=$use->toArray();
		return $users;	
	}



}
