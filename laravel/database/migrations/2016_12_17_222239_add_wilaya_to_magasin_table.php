<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddWilayaToMagasinTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('magasins', function(Blueprint $table)
		{
			$table->integer('wilaya_id')->unsigned();
			$table->foreign('wilaya_id')->references('id')->on('wilayas');

		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('magasins', function(Blueprint $table)
		{
			//
		});
	}

}
