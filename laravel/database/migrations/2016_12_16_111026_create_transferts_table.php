<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransfertsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transferts', function(Blueprint $table)
		{
			$table->increments('id');
			$table->date('date_transf');
			$table->string('jour_transf');
			$table->integer('jour');
				$table->integer('mois');
			$table->integer('annee');
			$table->double('montant_transf');
			$table->string('transferant')->nullable();
			$table->string('observationTransfert')->nullable();
			$table->integer('magasin_id')->unsigned();
			$table->foreign('magasin_id')->references('id')->on('magasins')->onDelete('cascade');

			$table->unique(array('date_transf', 'magasin_id'));
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
		Schema::drop('transferts');
	}

}
