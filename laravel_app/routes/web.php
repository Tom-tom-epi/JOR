<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonnageController;
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


Route::group(['middleware' => ['web']], function () {
    // your routes here
    Route::get('/user_login/{email}/{password}', [UserController::class, 'loginUser']);
});

// Route::get('/users', [PersonnageController::class, 'getUser']);

// Route::get('/user/addToGroup/{id}/{active}', [PersonnageController::class, 'addToGroup']);

// Route::get('/users/active', [PersonnageController::class, 'getActiveUsers']);

// Route::get('/character_create/{name}/{special}/{race}', [PersonnageController::class, 'createCharacter']);

// Route::get('/user/getSpells/{id}', [PersonnageController::class, 'getSpells']);

// Route::get('/user/getInventory/{id}', [PersonnageController::class, 'getInventory']);

// Route::get('/user/item_create/{item_name}/{item_effect}/{type_object}/{id_player}/{nbr}', [PersonnageController::class, 'createItem']);

// Route::get('/user/spell_create/{spell_name}/{spell_effect}/{ecole}/{id_player}', [PersonnageController::class, 'createSpell']);

// Route::get('/user/update_stats/{health}/{maxHealth}/{mana}/{maxMana}/{id_player}', [PersonnageController::class, 'updateStats']);

// Route::get('/user/update_caract/{physic}/{mental}/{social}/{id_player}', [PersonnageController::class, 'updateCaract']);

// Route::get('/users/updatePosition/{listPosition}', [PersonnageController::class, 'updatePosition']);

// Route::get('/user/deleteItem/{id_player}/{id_item}', [PersonnageController::class, 'deleteItem']);

// Route::get('/user/subItem/{id_player}/{id_item}/{nbr}', [PersonnageController::class, 'subItem']);

// Route::get('/users/getListItems/{id}', [PersonnageController::class, 'getListItems']);

// Route::get('/user/addItemFromList/{id_player}/{id_item}', [PersonnageController::class, 'addItemFromList']);

// Route::post('/user_register/{username}/{email}/{password}', [UserController::class, 'registerUser']);

// Passer les routes en Post dans api.php ! C'est plus propre & sécure ?
