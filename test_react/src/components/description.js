import React from 'react';
import axios from 'axios';
import FormItem from './itemForm';
import FormBaseItem from './itemBaseForm';
import FormSpell from './spellForm';
import FormStats from './statsForm';
import FormCaract from './caractForm';
import $ from 'jquery';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.handlerStats = this.handlerStats.bind(this);
    this.state = {
      spells: [],
      items: [],
      currentUser: [],
      update: false,
      displayInventory: true,
      displaySpells: false,
      passif: "",
      malus: "",
      listBaseItems: []
    };
    // console.log(this.props.id_party);
  }

// Get the change from statsForm, then update and call the parent GroupActif.
  handlerStats() {
    this.props.handlerGroup();
    $(".form").removeClass("displayed");
  }

  handler() {
    this.setState({
      update: !this.state.update
    })
  }
  
  fetchData() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.get(`https://ce-soir-c-est-jor.com/api/:8000/api/user/getSpells/`+ this.props.id_desc + "/" + this.props.id_party)
    .then(res => {
      //   Update self
      //   And update the group (child component)
      this.setState({ spells: res.data });  
      // console.log(this.state.spells);      
    })
    axios.get(`https://ce-soir-c-est-jor.com/api/:8000/api/user/getInventory/`+ this.props.id_desc + "/" + this.props.id_party)
      .then(res => {
        //   Update self
        //   And update the group (child component)
        this.setState({ items: res.data });
        // console.log(this.state.items);         
    })

    axios.get(`https://ce-soir-c-est-jor.com/api/:8000/api/users/getListItems/0/` + this.props.id_party)
      .then(res => {
        //   Update self
        //   And update the group (child component)
        this.setState({ listBaseItems: res.data });
        // console.log(this.state.listBaseItems);         
    })
  }

  getCurrentUser() {
    this.props.users.forEach(element => {
        if(element['id_player'] == this.props.id_desc) {
          let currentUser = Object.entries(element);
          // console.log(currentUser);
          let array = [];
          for(let i = 0; i < currentUser.length; i++) {
            if(currentUser[i][0] == "health" || currentUser[i][0] == "mana"
            || currentUser[i][0] == "maxHealth" || currentUser[i][0] == "maxMana"
            || currentUser[i][0] == "Physique" || currentUser[i][0] == "Mental"
            || currentUser[i][0] == "Social") {
              array[currentUser[i][0]] = currentUser[i][1];
            }else if (currentUser[i][0] == "Passif") {
              this.setState({ passif: currentUser[i][1] });
            }else if (currentUser[i][0] == "Malus") {
              this.setState({ malus: currentUser[i][1] });
            }
          }
          this.setState({ currentUser: array }, function() {
            // console.log(this.state.currentUser['Mental']);
          });
        }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Update the component if parent state is updated
    if(this.props.id_desc !== prevProps.id_desc || this.state.update !== prevState.update) {
      this.fetchData();
      this.getCurrentUser();
    }
}

  componentDidMount() {
    this.fetchData();
    this.getScripts();
    this.getCurrentUser();
  }

  getScripts() {
    var button_form_item = document.getElementsByClassName('btn_form_item');
    var button_form_spell = document.getElementsByClassName('btn_form_spell');
    var form_item = document.getElementsByClassName('form_item');
    var form_spell = document.getElementsByClassName('form_spell');
    var form_stats = document.getElementsByClassName('form_stats');
    var form_caract = document.getElementsByClassName('form_caract');
    var card_group = document.getElementsByClassName('char_card');
    var forms = document.getElementsByClassName('form');
    var button_form_stats = document.getElementsByClassName('btn_form_stats');
    var button_form_caract = document.getElementsByClassName('btn_form_caract');
    var button_show_item = document.getElementsByClassName('btn_show_item');
    var list_items = document.getElementsByClassName('list_items');
    var btn_form_base_item = document.getElementsByClassName('btn_form_base_item');
    var form_base_item = document.getElementsByClassName('form_base_item');

    $(btn_form_base_item).on('click', function() {
      if($(form_base_item).hasClass("displayed")) {
          $(form_base_item).removeClass("displayed");
      }else {
          $(forms).removeClass("displayed");
          $(form_base_item).addClass("displayed");
      }
    })

    $(button_show_item).on('click', function() {
      if($(list_items).hasClass("displayed")) {
          $(list_items).removeClass("displayed");
      }else {
          $(list_items).addClass("displayed");
      }
    })


    $(button_form_item).on('click', function() {
        if($(form_item).hasClass("displayed")) {
            $(form_item).removeClass("displayed");
        }else {
            $(forms).removeClass("displayed");
            $(form_item).addClass("displayed");
        }
    })

    $(button_form_caract).on('click', function() {
      if($(form_caract).hasClass("displayed")) {
          $(form_caract).removeClass("displayed");
      }else {
          $(forms).removeClass("displayed");
          $(form_caract).addClass("displayed");
      }
    })

    $(button_form_stats).on('click', function() {
      if($(form_stats).hasClass("displayed")) {
          $(form_stats).removeClass("displayed");
      }else {
          $(forms).removeClass("displayed");
          $(form_stats).addClass("displayed");
      }
    })

  $(card_group).on('click', function() {
    $(forms).removeClass("displayed");
  })

  $(button_form_spell).on('click', function() {
    if($(form_spell).hasClass("displayed")) {
        $(form_spell).removeClass("displayed");
    }else {
      $(forms).removeClass("displayed");
        $(form_spell).addClass("displayed");
    }
  })
}
  
   

  getItems = () => {
    var listItems = [];
    for(let i = 0; i < this.state.items.length; i++) {
     listItems.push(this.state.items[i]);
    }
    return (
      listItems
    )
  };
  getSpells = () => {
    var listSpells = [];
    for(let i = 0; i < this.state.spells.length; i++) {
     listSpells.push(this.state.spells[i]);
    }
    return (
      listSpells
    )
  };
  
  getBaseItems = () => {
    var listBaseItems = [];
    for(let i = 0; i < this.state.listBaseItems.length; i++) {
     listBaseItems.push(this.state.listBaseItems[i]);
    }
    return (
      listBaseItems
    )
  };

  displayInventory = () => {
    if(this.state.displayInventory) {
      return false;
    }else {
      $(".btn_inventory_spell").removeClass('used');
      $(".btn_box_inventory").addClass('used');
      this.setState({
        displayInventory: !this.state.displayInventory,
        displaySpells: !this.state.displaySpells
      })
    }
    
  }
  
  displaySpells = () => {
    if(this.state.displaySpells) {
      return false;
    }else {
      // console.log(this.state.currentUser);
      $(".btn_inventory_spell").removeClass('used');
      $(".btn_box_spells").addClass('used');
      this.setState({
        displayInventory: !this.state.displayInventory,
        displaySpells: !this.state.displaySpells
      })
    }
  }
  
  deleteItem = (id, nbr, id_player) => {
    // console.log(id_player);
    if(nbr == 1) {
      // alert(nbr);
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';

      axios.post(`https://ce-soir-c-est-jor.com/api/:8000/api/user/deleteItem/`
      + id_player + "/" 
      + id
      + "/" + this.props.id_party)
      .then(res => {
        this.setState({ update: !this.state.update });
      })
    }else {
      // alert(nbr);
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';

      axios.post(`https://ce-soir-c-est-jor.com/api/:8000/api/user/subItem/`
      + id_player + "/" 
      + id + "/"
      + nbr
      + "/" + this.props.id_party)
      .then(res => {
        this.setState({ update: !this.state.update });
        // console.log(res);
      })
    }
  }

  addBaseItem = (id) => {
    
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';

      axios.post(`https://ce-soir-c-est-jor.com/api/:8000/api/user/addItemFromList/`
      + this.props.id_desc + "/" 
      + id
      + "/" + this.props.id_party)
      .then(res => {
        this.setState({ update: !this.state.update });
      })
    
  }
    




    render() {
      var items = this.getItems();
      var spells = this.getSpells();
      var baseItems = this.getBaseItems();
      return (
        <div className='description'>
          <div className="box_btn">
            <button className="btn_form_desc btn_form_stats">Change stats</button>
            <button className="btn_form_desc btn_form_caract">Change caract</button>
            <button className="btn_form_desc btn_form_item">Add item</button>
            <button className="btn_form_desc btn_form_spell">Add spell</button>
            <button className="btn_form_desc btn_show_item">Show Items</button>
          </div>
          <div className="box_btn_inventory_spells">
            <button className="btn_inventory_spell btn_box_inventory used" onClick={this.displayInventory.bind(this.displayInventory)}>Inventory</button>
            <button className="btn_inventory_spell btn_box_spells" onClick={this.displaySpells.bind(this.displaySpells)}>Spells</button>
          </div>
          {this.state.displayInventory ? 
            <div className="item_content">
              <div className="box_item_content">
                {items.map((item, i) => {
                        return (
                            <div className="item_box" key={i}>
                                <div className="btn_close" onClick={this.deleteItem.bind(this.deleteItem, item.id, item.nbr, item.id_player)}><span className="content_btn_close">x</span></div>
                                <div className="item_name">{item.itemName}</div>
                                <div className="item_effect">{item.itemEffect}</div>
                                <div className="item_nbr">( {item.nbr} )</div>
                            </div>
                  )})}
              </div>
            </div>
            : null
          }
          {this.state.displaySpells ? 
            <div className="spell_content">
              <div className="box_spell_content">
                {spells.map((spell, i) => {
                        return (
                            <div className="spell_box" key={i}>
                                <div className="spell_name">{spell.spellName}</div>
                                <div className="spell_effect">{spell.spellEffect}</div>
                            </div>
                  )})}
              </div>
            </div>
            : null
          }
            <div className="content_passif_malus">
              <div className="box_passif">{this.state.passif}</div>
              <div className="box_malus">{this.state.malus}</div>
            </div>
            <div className="list_items">
              <button className="btn_form_base_item">Add Item</button>
                  <div className="content_list_items">
                    {baseItems.map((item, i) => {
                            return (
                                <div className="item_box" key={i}>
                                    <div className="btn_add_item_from_list" onClick={this.addBaseItem.bind(this.addBaseItem, item.id)}>+</div>
                                    <div className="btn_close" onClick={this.deleteItem.bind(this.deleteItem, item.id, item.nbr, item.id_player)}><span className="content_btn_close">x</span></div>
                                    <div className="item_name">{item.itemName}</div>
                                    <div className="item_effect">{item.itemEffect}</div>
                                    <div className="item_nbr">( {item.nbr} )</div>
                                </div>
                    )})}
                  </div>
            </div>
              <FormBaseItem 
              id_desc={0} 
              handler={this.handler}
              id_party={this.props.id_party}/>
              <FormItem 
              id_desc={this.props.id_desc} 
              handler={this.handler}
              id_party={this.props.id_party}/>
              <FormSpell 
              id_desc={this.props.id_desc} 
              handler={this.handler}
              id_party={this.props.id_party}/>
              <FormStats 
              id_desc={this.props.id_desc} 
              handlerStats={this.handlerStats}
              health={this.state.currentUser['health']}
              maxHealth={this.state.currentUser['maxHealth']}
              mana={this.state.currentUser['mana']}
              maxMana={this.state.currentUser['maxMana']}
              id_party={this.props.id_party}
              />
              <FormCaract
              id_desc={this.props.id_desc} 
              handlerStats={this.handlerStats}
              physic={this.state.currentUser['Physique']}
              mental={this.state.currentUser['Mental']}
              social={this.state.currentUser['Social']}
              id_party={this.props.id_party}
              />
        </div>
      );
    }
  }

export default Description;