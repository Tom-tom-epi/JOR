// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/App.css';
import './assets/cards.css';
import './assets/description.css';
import './assets/dices.css';
import './assets/forms.css';
import './assets/navbar.css';
import './assets/group.css';



// import './scripts/script';

import SelectParty from "./components/selectParty";
import Homepage from "./components/HomePage";
import Dices from "./components/Dices";
import Navbar from "./components/navbar";
import FormCharacter from './components/FormCharacter';
import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getLogged = this.getLogged.bind(this);
    this.selectParty = this.selectParty.bind(this);
    this.state = {
      id_party: 0,
      logged: false,
      id_user: 0,
      username: "",
      email: ""
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.id_party !== prevState.id_party) {
      this.getScripts();
    }
  }
  getLogged = (username, email, id) => {
    this.setState({ 
      logged: !this.state.logged,
      id_user: id,
      username: username,
      email: email
     });
  }

  selectParty = (id) => {
    this.setState({
      id_party: id
     });
  }

  getScripts = () => {

$(function(){ 
  var button_form_character = document.getElementsByClassName('button_form_character');
  var button_dices = document.getElementsByClassName('button_dices');
  var dices = document.getElementsByClassName('dices');
  var form_character = document.getElementsByClassName('form_character');
  var button_card_characters = document.getElementsByClassName('button_card_characters');
  var cardCharacters = document.getElementsByClassName('cardCharacters');
  var forms = document.getElementsByClassName('form');
  var btn_disconect = document.getElementsByClassName('button_disconect');
  var popup_disconect = document.getElementsByClassName('popup_disconect');
  var yes_disconect = document.getElementsByClassName('yes_disco');
  var no_disconect = document.getElementsByClassName('no_disco');

  $(btn_disconect).on('click', function() {
    if($(popup_disconect).hasClass('displayed')){
      $(popup_disconect).removeClass('displayed');
    }else {
      $(popup_disconect).addClass('displayed');
    }
  })

  $(yes_disconect).on('click', function() {
    window.location.replace("https://ce-soir-c-est-jor.com/");
  })

  $(no_disconect).on('click', function() {
    $(popup_disconect).removeClass('displayed');
  })

  $(button_dices).on('click', function() {
      if($(dices).hasClass("displayed")) {
          $(dices).removeClass("displayed"); 
      }else {
          $(dices).addClass("displayed"); 
      }
  })

  $(".content_center").on("click", function() {
      $(".displayed").removeClass("displayed");
  })


  $(button_form_character).on('click', function() {
      if($(form_character).hasClass("displayed")) {
          $(form_character).removeClass("displayed"); 
      }else {
          $(forms).removeClass("displayed");
          $(form_character).addClass("displayed"); 
      }
  })

  $(button_card_characters).on('click', function() {
      if($(cardCharacters).hasClass("displayed")) {
          $(cardCharacters).removeClass("displayed"); 
      }else {
          $(cardCharacters).addClass("displayed"); 
      }
  })
});
  }

  render() {
    
    return (

      <div className="global_app">
          {this.state.logged && this.state.id_party ? 
            <div className="App">
              <Navbar/>
              <FormCharacter id_party={this.state.id_party} id_admin={this.state.id_user}/>
              <Dices/>
              <div className="content_center"></div>
              <div className="popup_disconect">
                <span className='text_disco'>Do you want to disconect ?</span>
                <div className="content_btn_disco">
                  <button className="no_disco">No</button>
                  <button className="yes_disco">Yes, i'm sure</button>
                </div>
              </div>
            </div>

            : this.state.logged ?

            <SelectParty selectParty={this.selectParty} id_user={this.state.id_user}/>

            :

            <Homepage 
            logged={this.state.logged}
            getLogged={this.getLogged}
            />
          }

      </div>
    );
  }
  
}

export default App;
