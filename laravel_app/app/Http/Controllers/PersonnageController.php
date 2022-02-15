<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class PersonnageController extends Controller
{

    public function addItemFromList($id_player, $id_item, $id_party) {


            $item = DB::table('inventaire')
            ->where('id', $id_item)
            ->where('id_party', $id_party)
            ->update(['id_player' => $id_player]);


        return json_decode($item);
    }

    public function getListItems($id, $id_party) {
        $inventory = DB::table('inventaire')
        ->where( 'id_player', $id )
        ->where('id_party', $id_party)
        ->get();
        // var_dump($inventory);

        $inventoryArray = [];
        foreach($inventory as $item) {
            array_push($inventoryArray, (array)$item);
        }
        // array_push($inventoryArray, (array)Session::all());
        return json_encode($inventoryArray);
    }

    public function deleteItem($id_player, $id_item, $id_party) {
        $user = DB::table('inventaire')
            ->where('id', $id_item)
            ->where('id_party', $id_party)
            ->where('id_player', $id_player)
            ->delete();

        return json_decode($user);
    }

    public function subItem($id_player, $id_item, $nbr, $id_party) {
        $nbr = $nbr - 1;
        $user = DB::table('inventaire')
            ->where('id', $id_item)
            ->where('id_party', $id_party)
            ->where('id_player', $id_player)
            ->update(['nbr' => $nbr]);

        return json_decode($user);
    }

    public function getUser($id_party) {
        $users = DB::table('personnages')
        ->where('id_party', $id_party)
        ->orderBy( 'active', 'desc' )
        ->get();

        $usersArray = [];
        foreach($users as $user) {
            array_push($usersArray, (array)$user);
        }
        return json_encode($usersArray);
    }

    public function getSpells($id_player, $id_party) {
        $spells = DB::table('spells')
        ->where( 'id_player', $id_player)
        ->get();

        $spellsArray = [];
        foreach($spells as $spell) {
            array_push($spellsArray, (array)$spell);
        }
        return json_encode($spellsArray);
    }

    public function getInventory($id_player, $id_party) {
        $inventory = DB::table('inventaire')
        ->where( 'id_player', $id_player)
        ->where('id_party', $id_party)
        ->get();
        // var_dump($inventory);
        $username = Session::all();
        $inventoryArray = [];
        foreach($inventory as $item) {
            array_push($inventoryArray, (array)$item);
        }
        // array_push($inventoryArray, array($username));
        return json_encode($inventoryArray);
    }

    public function createItem($item_name, $item_effect, $type_object, $id_player, $nbr, $id_party) {

        $sqlPerso = DB::table('inventaire')->insertGetId(
            ['id_player' => $id_player, 'itemName' => $item_name, 'itemEffect' => $item_effect, 'type_object' => $type_object,
            'nbr' => $nbr, 'id_party' => $id_party]
        );

        return json_encode("Insert Done !");
    }

    public function createSpell($spell_name, $spell_effect, $ecole, $id_player) {
        if($ecole == "Pouvoir Racial") {
            $cost = 0;
        }else {
            $cost = 1;
        }

        $sqlPerso = DB::table('spells')->insertGetId(
            ['id_player' => $id_player, 'spellName' => $spell_name, 'spellEffect' => $spell_effect,
             'école' => $ecole, 'cost' => $cost]
        );

        return json_encode("Insert Done !");
    }

    public function updatePosition($listPosition, $id_party) {
        $listPosition = json_decode($listPosition);

        foreach($listPosition as $key => $value) {
            $user = DB::table('personnages')
            ->where('id', $value[0])
            ->where('id_party', $id_party)
            ->update(['position' => $value[1]]);
        }

        return json_decode($user);
    }


    public function updateStats($health, $maxHealth, $mana, $maxMana, $id, $id_party) {
        $user = DB::table('stats')
        ->where('id_player', $id)
        ->update(['health' => $health , 'maxHealth' => $maxHealth , 'mana' => $mana , 'maxMana' => $maxMana ]);

        // var_dump($id);
        return json_encode($user);
    }

    public function updateCaract($physic, $mental, $social, $id) {
        $user = DB::table('caracteristiques')
        ->where('id_player', $id)
        ->update(['Physique' => $physic , 'Mental' => $mental , 'Social' => $social ]);

        return json_encode($user);
    }


    public function addToGroup($id_player, $active, $id_party) {
        if($active == 1) {
            $active++;
        }else {
            $active--;
        }
        $user = DB::table('personnages')
                ->where('id', $id_player)
                ->where('id_party', $id_party)
                ->update(['active' => $active ]);

        return json_encode($user);
    }

    public function getActiveUsers($id_party) {

        $users = DB::table('personnages')
            ->join('stats', 'personnages.id', '=', 'stats.id_player')
            ->join('caracteristiques', 'personnages.id', '=', 'caracteristiques.id_player')
            ->select('personnages.*', 'stats.*', 'caracteristiques.*')
            // ->where(['personnages.active' => 2, 'personnages.id_party' => $id_party])
            ->where('personnages.active', 2)
            ->where('personnages.id_party', $id_party)
            ->orderBy('personnages.position', 'asc')
            ->get();

        $usersArray = [];
        foreach($users as $user) {
            array_push($usersArray, (array)$user);
        }

        return json_encode($usersArray);
    }

    public function createCharacter($name, $special, $race, $role, $id_party) {
        $statsRace = $this->getRace($race);

        $existingUser = DB::table('personnages')
        ->where( 'Nom', $name )
        ->where('id_party', $id_party)
        ->get();

        if(!isset($existingUser[0]->id)) {
            $sqlPerso = DB::table('personnages')->insertGetId(
                ['Nom' => $name, 'Race' => $race, 'Spécial' => $special,
                 'Passif' => $statsRace['Passif'], 'Malus' => $statsRace['Malus'],
                 'active' => 1, 'position' => 10, 'role' => $role, 'id_party' => $id_party]
            );
            foreach($statsRace['spells'] as $key => $spell) {
                // var_dump($spell[$key]);
                $sqlSpells = DB::table('spells')->insertGetId(
                    ['id_player' => $sqlPerso, 'école' => $spell['école'], 'spellName' => $spell['Name'],
                     'spellEffect' => $spell['Effet'], 'cost' => $spell['Cout']]
                );
            }
            $sqlStat = DB::table('stats')->insertGetId(
                ['id_player' => $sqlPerso, 'health' => $statsRace['Stats']['Health'], 'maxHealth' => $statsRace['Stats']['Health'],
                 'mana' => $statsRace['Stats']['Mana'], 'maxMana' => $statsRace['Stats']['Mana']]
            );
            $sqlCaract = DB::table('caracteristiques')->insertGetId(
                ['id_player' => $sqlPerso, 'Physique' => 20, 'Mental' => 20,'Social' => 20]
            );

        }

        return json_encode("Insert Done !");
    }


    function getRace($race) {

        $imperial = array (
            "Passif" => "50% de chance de gagner 50% de septims en plus",
            "spells" => array(
                array(
                    "Name" => "Soin mineur",
                    "Effet" => "Redonne 2pv au lanceur ou à une cible au contact",
                    "Cout" => 2,
                    "école" => "guérison",
                ),
                array(
                    "Name" => "Voix de l\'empereur",
                    "Effet" => "Calme instantanément un humain hostile de bas niveau (10)",
                    "Cout" => 0,
                    "école" => "Pouvoir Racial",
                ),
            ),
            "Stats" => array(
                "Health" => 10,
                "Mana" => 2,
            ),
            "Malus" => "--"
        );
        $hautElfe = array (
            "Passif" => "+1pt mana max",
            "spells" => array(
                array(
                    "Name" => "Soin Mineur",
                    "Effet" => "Redonne 2pv au lanceur ou à une cible au contact",
                    "Cout" => 2,
                    "école" => "guérison",
                ),
                array(
                    "Name" => "Regain magique",
                    "Effet" => "-1 tour de charge requis pour les sorts (2tours)",
                    "Cout" => 0,
                    "école" => "Pouvoir Racial",
                ),
            ),
            "Stats" => array(
                "Health" => 10,
                "Mana" => 2,
            ),
            "Malus" => "Vulnérabilité au feu (+50% dèg)"
        );
        $elfeNoir = array (
            "Passif" => "inflige +1pts dèg sur attaque type feu",
            "spells" => array(
                array(
                    "Name" => "Soin Mineur",
                    "Effet" => "Redonne 2pv au lanceur ou à une cible au contact",
                    "Cout" => 2,
                    "école" => "guérison",
                ),
                array(
                    "Name" => "Cappe de flammes",
                    "Effet" => "Résistance au feu +1pts, inflige 2pts de dégats min/tour/enemis au contact (2tours)",
                    "Cout" => 0,
                    "école" => "Pouvoir Racial",
                ),
            ),
            "Stats" => array(
                "Health" => 10,
                "Mana" => 2,
            ),
            "Malus" => "Suspect potentiel (suspecté en premier si crime commis)"
        );
        $woodElfe = array (
            "Passif" => "perception améliorée +10%",
            "spells" => array(
                array(
                    "Name" => "Soin Mineur",
                    "Effet" => "Redonne 2pv au lanceur ou à une cible au contact",
                    "Cout" => 2,
                    "école" => "guérison",
                ),
                array(
                    "Name" => "Calme animal",
                    "Effet" => "Calme instantanément un animal hostile de bas niveau (10)",
                    "Cout" => 0,
                    "école" => "Pouvoir Racial",
                ),
            ),
            "Stats" => array(
                "Health" => 11,
                "Mana" => 2,
            ),
            "Malus" => "O"
        );
        $Argonien = array (
            "Passif" => "Insensible aux poisons, respiration aquatique",
            "spells" => array(
                array(
                    "Name" => "Soin Mineur",
                    "Effet" => "Redonne 2pv au lanceur ou à une cible au contact",
                    "Cout" => 2,
                    "école" => "guérison",
                ),
                array(
                    "Name" => "Bénédiction de l\'Hist",
                    "Effet" => "Soigne toutes les maladies et malédiction faibles des alliés proche & du lanceur",
                    "Cout" => 0,
                    "école" => "Pouvoir Racial",
                ),
            ),
            "Stats" => array(
                "Health" => 10,
                "Mana" => 2,
            ),
            "Malus" => "+1pts dèg électrique reçu"
        );
        $Khajiit = array (
            "Passif" => "Mains lestes +10% jets motricité fine",
            "spells" => array(
                array(
                    "Name" => "Soin Mineur",
                    "Effet" => "Redonne 2pv au lanceur ou à une cible au contact",
                    "Cout" => 2,
                    "école" => "guérison",
                ),
                array(
                    "Name" => "Vision nocturne",
                    "Effet" => "Nyctalopie (3 tours)",
                    "Cout" => 0,
                    "école" => "Pouvoir Racial",
                ),
            ),
            "Stats" => array(
                "Health" => 9,
                "Mana" => 2,
            ),
            "Malus" => "Peur des Morts-vivants (-10% jets contre)"
        );
        $Rougegarde = array (
            "Passif" => "50% de chance d\'annuler une attaque d\'oportunité",
            "spells" => array(
                array(
                    "Name" => "Soin Mineur",
                    "Effet" => "Redonne 2pv au lanceur ou à une cible au contact",
                    "Cout" => 2,
                    "école" => "guérison",
                ),
                array(
                    "Name" => "Second soufle",
                    "Effet" => "Enlève tout status négatif (sauf malédiction), vitesse améliorée pour une action directement ",
                    "Cout" => 0,
                    "école" => "Pouvoir Racial",
                ),
            ),
            "Stats" => array(
                "Health" => 10,
                "Mana" => 2,
            ),
            "Malus" => "Vulnérable à la magie, +1pts dèg reçu"
        );
        $Bréton = array (
            "Passif" => "-30% dèg magique subis",
            "spells" => array(
                array(
                    "Name" => "Soin Mineur",
                    "Effet" => "Redonne 2pv au lanceur ou à une cible au contact",
                    "Cout" => 2,
                    "école" => "guérison",
                ),
                array(
                    "Name" => "Asbsorbtion de magie",
                    "Effet" => "Absorbe 30% des dégats magiques pour les conertir en mana (3 sources de dégats Max)",
                    "Cout" => 0,
                    "école" => "Pouvoir Racial",
                ),
            ),
            "Stats" => array(
                "Health" => 11,
                "Mana" => 2,
            ),
            "Malus" => "-50% résistance au poisons & maladies"
        );
        $Orque = array (
            "Passif" => "+2pts dèg attaques lourdes",
            "spells" => array(
                array(
                    "Name" => "Soin Mineur",
                    "Effet" => "Redonne 2pv au lanceur ou à une cible au contact",
                    "Cout" => 2,
                    "école" => "guérison",
                ),
                array(
                    "Name" => "Puissance de Malacath",
                    "Effet" => "Les attaques chargées n\'ont plus besoin de l\'être (3 tours max)",
                    "Cout" => 0,
                    "école" => "Pouvoir Racial",
                ),
            ),
            "Stats" => array(
                "Health" => 11,
                "Mana" => 2,
            ),
            "Malus" => "Bruyant & Bourrin"
        );
        $Nordique = array (
            "Passif" => "Résistance totale à la glace",
            "spells" => array(
                array(
                    "Name" => "Soin Mineur",
                    "Effet" => "Redonne 2pv au lanceur ou à une cible au contact",
                    "Cout" => 2,
                    "école" => "guérison",
                ),
                array(
                    "Name" => "Cri de l\'ours",
                    "Effet" => "Térrorise une cible (1 tour) [l\'oblige à vous aider si faible]",
                    "Cout" => 0,
                    "école" => "Pouvoir Racial",
                ),
            ),
            "Stats" => array(
                "Health" => 11,
                "Mana" => 2,
            ),
            "Malus" => "+1pts dèg feu subis"
        );

        switch($race){
            case "Impérial":
                    return $imperial;
                break;
            case "Haut-Elfe":
                    return $hautElfe;
                break;
            case "Elfe des bois":
                    return $woodElfe;
                break;
            case "Elfe noir":
                    return $elfeNoir;
                break;
            case "Argonien":
                    return $Argonien;
                break;
            case "Khajiit":
                    return $Khajiit;
                break;
            case "Rougegarde":
                    return $Rougegarde;
                break;
            case "Bréton":
                    return $Bréton;
                break;
            case "Orque":
                    return $Orque;
                break;
            case "Nordique":
                    return $Nordique;
                break;
            case "Invocation":
                    return "IA";
                break;
            case "Ennemi":
                    return "IA";
                break;
            default:
                    return "IA";
                break;
        }
    }
}
