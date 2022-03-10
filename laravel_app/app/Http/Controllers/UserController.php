<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use storage\framework\sessions;

class UserController extends Controller
{



    public function registerUser($username, $email, $password) {
        $options = [
            'cost' => 11
        ];
        $password_hashed = password_hash($password, PASSWORD_BCRYPT, $options);
        $userExist = DB::table('users')
        ->where('email', $email)
        ->get();

        if(!isset($userExist[0]->id)) {
            $insertUser = DB::table('users')
            ->insertGetId(['username' => $username, 'email' => $email, 'password' => $password_hashed]);
            $user = DB::table('users')
            ->where('email', $email)
            ->get();
        }else {
            $user = "User Allready exist";
            return $user;
        }

        return json_decode($user);
    }
    public function loginUser($email, $password, Request $request) {
        $userExist = DB::table('users')
                    ->where('email', $email)
                    ->get();
        if(isset($userExist[0]->password)) {
            if (password_verify($password, $userExist[0]->password)) {
                $message = 'Le mot de passe est valide !';
            } else {
                $message = 'Le mot de passe est invalide.';
            }
        }else {
            $message = 'User unknow';
        }

        return $userExist[0];

    }

    public function getParties($id_user) {
        $parties = DB::table('parties')
        ->where('id_admin', $id_user)
        ->get();
        return json_encode($parties);
    }

    public function createParty($name, $id_user, $email) {
        $party = DB::table('parties')
            ->insertGetId(['id_admin' => $id_user, 'name' => $name, 'nbr_player' => 0]);
        return json_encode($party);
    }

    public function deleteParty($id_party) {
        $party = DB::table('parties')
            ->where("id", $id_party)
            ->delete();
        return json_encode($party);
    }
}
