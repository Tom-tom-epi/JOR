import React from 'react';
// import '../scripts/script';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }
  
    render() {
      return (
        <div className='navbar'>
            <button className="button_dices">Dices</button>
            <button className="button_form_character btn_middle">Create character</button>
            <button className="button_card_characters">Characters</button>
            <button className="button_disconect">Disconect</button>
        </div>
      );
    }
  }

export default Navbar;