<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Butin
 * 
 * @property string $name
 *
 * @package App\Models
 */
class Butin extends Model
{
	protected $table = 'butin';
	public $incrementing = false;
	public $timestamps = false;

	protected $fillable = [
		'name'
	];
}
