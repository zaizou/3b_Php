<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFonctionnalitesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('fonctionnalites', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('intitule')->unique();
			$table->timestamps();
		});


		Schema::create('fonctionnalites_user', function(Blueprint $table)
		{
			$table->integer('id_fonct')->unsigned();
			$table->foreign('id_fonct')->references('id')->on('fonctionnalites')->onDelete('cascade');

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
		Schema::drop('fonctionnalites');
	}

}
