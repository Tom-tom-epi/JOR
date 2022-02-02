<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/test', function () {
    return json_encode("test");
});
Route::get('/users', [UserController::class, 'getUser']);

Route::get('/user/addToGroup/{id}/{active}', [UserController::class, 'addToGroup']);

Route::get('/users/active', [UserController::class, 'getActiveUsers']);

Route::get('/character_create/{name}/{special}/{race}', [UserController::class, 'createCharacter']);

Route::get('/user/getSpells/{id}', [UserController::class, 'getSpells']);

Route::get('/user/getInventory/{id}', [UserController::class, 'getInventory']);

Route::get('/user/item_create/{item_name}/{item_effect}/{type_object}/{id_player}/{nbr}', [UserController::class, 'createItem']);

Route::get('/user/spell_create/{spell_name}/{spell_effect}/{ecole}/{id_player}', [UserController::class, 'createSpell']);

Route::get('/user/update_stats/{health}/{maxHealth}/{mana}/{maxMana}/{id_player}', [UserController::class, 'updateStats']);

Route::get('/user/update_caract/{physic}/{mental}/{social}/{id_player}', [UserController::class, 'updateCaract']);

Route::get('/users/updatePosition/{listPosition}', [UserController::class, 'updatePosition']);
