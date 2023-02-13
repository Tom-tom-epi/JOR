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
        $message = [];
        if(isset($userExist[0]->password)) {
            if (password_verify($password, $userExist[0]->password)) {
                $message['message'] = 'Le mot de passe est valide !';
                // return $message;
            } else {
                $message['message'] = 'error';
                return $message;
            }
        }else {
            $message['message'] = 'error';
            return $message;
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

    public function deleteParty($id_party, $id_admin) {

        // Check the id_admin with the id_party before the delete for security

        if(isset($id_admin)) {
            $checkAdmin = DB::table('parties')
                            ->where('id_admin', $id_admin)
                            ->get('id');

            if(isset($checkAdmin[0])) {
                if($checkAdmin[0]->id == $id_party) {
                    $getIdPlayerForDelete = DB::table('personnages')
                            ->where("id_party", $id_party)
                            ->get('id');
                }
            }else {
                $result = "error";
                return $result;
            }

        }

        if(isset($id_party) && isset($getIdPlayerForDelete)) {
            $delChar = DB::table('personnages')
                        ->where("id_party", $id_party)
                        ->delete();
            $delObject = DB::table('inventaire')
                        ->where("id_party", $id_party)
                        ->delete();

            foreach ($getIdPlayerForDelete as $key => $id_player) {
                $delSpells = DB::table('spells')
                ->where("id_player", $id_player->id)
                ->delete();

                $delStats = DB::table('stats')
                ->where("id_player", $id_player->id)
                ->delete();

                $delCaract = DB::table('caracteristiques')
                ->where("id_player", $id_player->id)
                ->delete();
            }

            $party = DB::table('parties')
            ->where("id", $id_party)
            ->delete();

        }else {
            $result = "Params error";
            return $result;
        }

        return json_encode($id_admin);
    }
}
