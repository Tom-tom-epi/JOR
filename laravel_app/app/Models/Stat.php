<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Stat
 * 
 * @property int $id_stat
 * @property int $id_player
 * @property int $health
 * @property int $maxHealth
 * @property int $mana
 * @property int $maxMana
 *
 * @package App\Models
 */
class Stat extends Model
{
	protected $table = 'stats';
	protected $primaryKey = 'id_stat';
	public $timestamps = false;

	protected $casts = [
		'id_player' => 'int',
		'health' => 'int',
		'maxHealth' => 'int',
		'mana' => 'int',
		'maxMana' => 'int'
	];

	protected $fillable = [
		'id_player',
		'health',
		'maxHealth',
		'mana',
		'maxMana'
	];
}
