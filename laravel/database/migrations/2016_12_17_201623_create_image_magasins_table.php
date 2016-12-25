<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImageMagasinsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('image_magasins', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('path');
			$table->string('originalFilename')->nullable();
			$table->string('nomMagasin');
			$table->bigInteger('filesize')->nullable();
			$table->string('dossierStock');

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
		Schema::drop('image_magasins');
	}

}
