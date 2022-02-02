<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Inventaire
 * 
 * @property int $id
 * @property int $id_player
 * @property string $itemName
 * @property string $itemEffect
 * @property string|null $type_object
 * @property int $nbr
 *
 * @package App\Models
 */
class Inventaire extends Model
{
	protected $table = 'inventaire';
	public $timestamps = false;

	protected $casts = [
		'id_player' => 'int',
		'nbr' => 'int'
	];

	protected $fillable = [
		'id_player',
		'itemName',
		'itemEffect',
		'type_object',
		'nbr'
	];
}
