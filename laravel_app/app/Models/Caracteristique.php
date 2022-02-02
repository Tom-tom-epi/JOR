<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Caracteristique
 * 
 * @property int $id
 * @property int $id_player
 * @property int $Physique
 * @property int $Mental
 * @property int $Social
 *
 * @package App\Models
 */
class Caracteristique extends Model
{
	protected $table = 'caracteristiques';
	public $timestamps = false;

	protected $casts = [
		'id_player' => 'int',
		'Physique' => 'int',
		'Mental' => 'int',
		'Social' => 'int'
	];

	protected $fillable = [
		'id_player',
		'Physique',
		'Mental',
		'Social'
	];
}
