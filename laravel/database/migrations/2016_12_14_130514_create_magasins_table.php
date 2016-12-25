<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMagasinsTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('magasins', function(Blueprint $table)
		{
			$table->increments('id');


			$table->string('nomMagazin')->unique();
			$table->string('adresseMagasin')->nullable();
			$table->double('latitude', 15, 12)->nullable();
			$table->double('longitude', 15, 12)->nullable();
			$table->string('type');
			$table->integer('ordre');
			$table->string('telephone')->nullable();
			$table->string('email')->nullable();
			$table->string('placeId')->nullable();
			$table->string('videoId')->nullable();
			$table->string('nomDossierStockage');


			
			

			
    
		
			$table->timestamps();
		});

			Schema::create('magasin_user', function(Blueprint $table)
		{
			$table->integer('magasin_id')->unsigned();
			$table->foreign('magasin_id')->references('id')->on('magasins')->onDelete('cascade');

			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');


			$table->timestamps();
		});




	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('magasins');
	}

}
