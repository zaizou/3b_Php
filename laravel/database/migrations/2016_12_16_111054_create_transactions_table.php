<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transactions', function(Blueprint $table)
		{
			$table->increments('id');
			$table->date('date_trans');
			
			$table->string('jour_trans');
			$table->integer('jour');
			$table->integer('mois');
			$table->integer('annee');
				$table->double('montant');
			$table->double('depense');
			$table->string('observation')->nullable();

			$table->integer('magasin_id')->unsigned();
			$table->foreign('magasin_id')->references('id')->on('magasins')->onDelete('cascade');

			$table->unique(array('date_trans', 'magasin_id'));
			
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
		Schema::drop('transactions');
	}

}
