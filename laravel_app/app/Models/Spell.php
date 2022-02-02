<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Spell
 * 
 * @property int $id
 * @property int $id_player
 * @property string $école
 * @property string $spellName
 * @property string $spellEffect
 * @property int $cost
 *
 * @package App\Models
 */
class Spell extends Model
{
	protected $table = 'spells';
	public $timestamps = false;

	protected $casts = [
		'id_player' => 'int',
		'cost' => 'int'
	];

	protected $fillable = [
		'id_player',
		'école',
		'spellName',
		'spellEffect',
		'cost'
	];
}
