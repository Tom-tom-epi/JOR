import React from 'react';
// import '../scripts/script';
import { GiCharacter } from 'react-icons/gi';
import { FaDice } from 'react-icons/fa';
import { BiExit } from 'react-icons/bi';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }
  
    render() {
      return (
        <div className='navbar'>
            <button className="button_dices"><FaDice /></button>
            <button className="button_form_character btn_middle"><GiCharacter /> +</button>
            <button className="button_card_characters"><GiCharacter /><GiCharacter /></button>
            <button className="button_disconect"><BiExit /></button>
        </div>
      );
    }
  }

export default Navbar;