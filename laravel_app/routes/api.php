<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PersonnageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user_register/{username}/{email}/{password}', [UserController::class, 'registerUser']);

Route::get('/users/{id_party}', [PersonnageController::class, 'getUser']);

Route::post('/user/addToGroup/{id}/{active}/{id_party}', [PersonnageController::class, 'addToGroup']);

Route::get('/users/active/{id_party}', [PersonnageController::class, 'getActiveUsers']);

Route::post('/character_create/{name}/{special}/{race}/{role}/{id_admin}/{id_party}', [PersonnageController::class, 'createCharacter']);

Route::get('/user/getSpells/{id}/{id_party}', [PersonnageController::class, 'getSpells']);

Route::get('/user/getInventory/{id}/{id_party}', [PersonnageController::class, 'getInventory']);

Route::post('/user/item_create/{item_name}/{item_effect}/{type_object}/{id_player}/{nbr}/{id_party}', [PersonnageController::class, 'createItem']);

Route::post('/user/spell_create/{spell_name}/{spell_effect}/{ecole}/{id_player}/{id_party}', [PersonnageController::class, 'createSpell']);

Route::post('/user/update_stats/{health}/{maxHealth}/{mana}/{maxMana}/{id_player}/{id_party}', [PersonnageController::class, 'updateStats']);

Route::post('/user/update_caract/{physic}/{mental}/{social}/{id_player}', [PersonnageController::class, 'updateCaract']);

Route::post('/users/updatePosition/{listPosition}/{id_party}', [PersonnageController::class, 'updatePosition']);

Route::post('/user/deleteItem/{id_player}/{id_item}/{id_party}', [PersonnageController::class, 'deleteItem']);

Route::post('/user/subItem/{id_player}/{id_item}/{nbr}/{id_party}', [PersonnageController::class, 'subItem']);

Route::get('/users/getListItems/{id}/{id_party}', [PersonnageController::class, 'getListItems']);

Route::post('/user/addItemFromList/{id_player}/{id_item}/{id_party}', [PersonnageController::class, 'addItemFromList']);

Route::get('/user/getParties/{id_user}', [UserController::class, 'getParties']);

// Route::post('/user_login/{email}/{password}/{id_party}', [UserController::class, 'loginUser']);


Route::post('/user/create_party/{name}/{id_user}/{email}', [UserController::class, 'createParty']);

Route::post('/user/delete_party/{id_party}/{id_admin}', [UserController::class, 'deleteParty']);
