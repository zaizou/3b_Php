<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');
Route::get('shop', 'WelcomeController@getShop');



Route::get('management_gestion_dashboard', 'transactionsController@getDashboard');


/*Gestion des Transactions*/
Route::get('comptabilite_extraction', 'transactionsController@getTransactionsExtract');
Route::get('management_recettes_depenses_journalieres_extraction', 'transactionsController@getTransactionsJournalExtract');
Route::get('management_transferts_journaliers_extraction_show', 'transactionsController@getTransfertsExtract');
Route::post('compta_journaliere_extraction', 'transactionsController@addTransactions');
Route::post('comptabilite_extraction_transferts_send', 'transactionsController@addVersements');

/*Gestion des Utilisateurs*/
Route::get('management_gestion_utilisateurs_utilisateurs', 'UsersController@gestionUsersShow');
Route::get('gestion_utilisateurs_fonctionnalites_list', 'UsersController@getFonctionnalitesList');
Route::post('gestion_utilisateurs_utilisateur_create', 'UsersController@createUser');
Route::get('gestion_utilisateurs_get_utilisateur', 'UsersController@getUser');
Route::post('gestion_utilisateurs_utilisateur_edit', 'UsersController@updateUser');
Route::post('gestion_utilisateurs_utilisateur_remove', 'UsersController@deleteUser');

/*Gestion des Magasins*/
Route::get('management_gestion_magasins_magasins', 'MagasinsController@getMagasins');
Route::get('gestion_utilisateurs_utilisateurs_libres_list', 'MagasinsController@getUsers');
Route::get('wilayas_list', 'MagasinsController@getWilayas');
Route::post('gestion_magasin_magasin_create', 'MagasinsController@createMagasin');
Route::get('gestion_magasins_get_magasin', 'MagasinsController@getMagasin');
Route::post('gestion_magasin_magasin_edit', 'MagasinsController@updateMagasin');
Route::post('gestion_magasin_magasin_create_remove', 'MagasinsController@deleteMagasin');
Route::post('uploadfile', 'MagasinsController@addImage');
Route::post('remove_image', 'MagasinsController@removeImage');

Route::post('logint', 'myController@AuthenticateUser');
Route::get('logout', 'myController@logoutUser');







/*
|--------------------------------------------------------------------------
| Max Upload File Size filter
|--------------------------------------------------------------------------
|
| Check if a user uploaded a file larger than the max size limit.
| This filter is used when we also use a CSRF filter and don't want
| to get a TokenMismatchException due to $_POST and $_GET being cleared.
|
*/
Route::filter('maxUploadFileSize', function()
{
    // Check if upload has exceeded max size limit
    if (! (Request::isMethod('POST') or Request::isMethod('PUT'))) { return; }
    // Get the max upload size (in Mb, so convert it to bytes)
    $maxUploadSize = 1024 * 1024 * ini_get('post_max_size');
    $contentSize = 0;
    if (isset($_SERVER['HTTP_CONTENT_LENGTH']))
    {
        $contentSize = $_SERVER['HTTP_CONTENT_LENGTH'];
    } 
    elseif (isset($_SERVER['CONTENT_LENGTH']))
    {
        $contentSize = $_SERVER['CONTENT_LENGTH'];
    }
    // If content exceeds max size, throw an exception
    if ($contentSize > $maxUploadSize)
    {
        throw new GSVnet\Core\Exceptions\MaxUploadSizeException;
    }
});








Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
