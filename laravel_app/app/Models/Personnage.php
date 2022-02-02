<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Personnage
 *
 * @property int $id
 * @property string $Nom
 * @property string $Race
 * @property string|null $Spécial
 * @property string|null $Passif
 * @property string|null $Malus
 * @property int $active
 * @property int $position
 *
 * @package App\Models
 */
class Personnage extends Model
{
	protected $table = 'personnages';
	public $timestamps = false;

	protected $casts = [
		'active' => 'int',
		'position' => 'int'
	];

	protected $fillable = [
		'Nom',
		'Race',
		'Spécial',
		'Passif',
		'Malus',
		'active',
		'position'
	];
}
