import React from 'react';
import axios from 'axios';
import Description from './description';
import $ from 'jquery';
// import '../scripts/script';
class GroupActif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        users: [],
        displayDesc: false,
        id_desc: 0, 
        updateGroup: true,
        updateGroupForStats: true,
        script: null
    };
    // console.log(this.props.id_party);
  }

  // Get the change from child description and statsForm, then update
  handlerGroup = () => {
    this.setState({ updateGroupForStats: !this.state.updateGroupForStats });
  }

  getUsers = () => {
    var listUsers = [];
    for(let i = 0; i < this.state.users.length; i++) {
     listUsers.push(this.state.users[i]);
    }
    // console.log(this.state.users);
    return (
      listUsers
    )
  };

  handleClick = (id) => {
    if($("#card_user_" + id).hasClass("no_clic")) {
      return false;
    }else {
      if(id !== this.state.id_desc && this.state.displayDesc === false) {
        $(".selected").removeClass("selected");
        $("#card_user_" + id).addClass("selected");
        this.setState({ id_desc: id });
        this.setState({ displayDesc: !this.state.displayDesc });
      }else if(id !== this.state.id_desc) {
        $(".selected").removeClass("selected");
        $("#card_user_" + id).addClass("selected");
        this.setState({ id_desc: id });
      }else {
        $(".selected").removeClass("selected");
        this.setState({ id_desc: 0 });
        this.setState({ displayDesc: !this.state.displayDesc });
      }
    }
  };

  upTurn = () => {
    //test
    // var btn_up_turn = document.getElementsByClassName("upTurn");
    var card_char = document.getElementsByClassName('char_card');
    var listPosition = [];
    var id_party = this.props.id_party;
    // console.log(card_char);
    // var count = 0;
    // $(btn_up_turn).on('click', function() {
      // console.log("clicked");
      // count++;
      // console.log(count);
      var nbrCard = card_char.length; 
      for(let i = 0; i < nbrCard; i++) {
        let order = $($(card_char)[i]).css("order");
        let id_player = $($(card_char)[i]).attr("data-id");
        // console.log(i);
        
        if(order == 0) {
          $($(card_char)[i]).css("order", nbrCard - 1);
          listPosition[i] = [id_player, nbrCard - 1];
        }else {
          console.log(order);
          $($(card_char)[i]).css("order", (parseInt(order) - 1));
          listPosition[i] = [id_player, (parseInt(order) - 1)];
        } 
      }

      let json = JSON.stringify(listPosition);
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        axios.post(`https://ce-soir-c-est-jor.com/api/:8000/api/users/updatePosition/` + json + "/" + id_party)
        .then(res => {
            // console.log(res);
            // throw new Error("Script disactivated");
            // return false;
        })
    // })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    // Update the component if parent state is updated
    if(this.props.updateGroup !== prevProps.updateGroup || 
      this.state.updateGroupForStats !== prevState.updateGroupForStats) {
      console.log("Updated !!");
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';

      axios.get(`https://ce-soir-c-est-jor.com/api/:8000/api/users/active` + "/" + this.props.id_party)
      .then(res => {
          let result = Object.values(res.data);
          this.setState({ users: result });
      })
    }
    console.log("updated");
    // this.getScripts();
  }

  clickArrowLeft = (id_player) => {
    // alert(this.props.id_party);
    var card_char = document.getElementsByClassName('char_card');
    var nbrCard = card_char.length; 
    var listPosition = [];
    var id_party = this.props.id_party;
    
      let position = $("#card_user_"+id_player).css('order');
      if(position == 0) {
        for(let i = 0; i < nbrCard; i++) {
          let order = $($(card_char)[i]).css("order");
          let id_player = $($(card_char)[i]).attr("data-id");
          
          if(order == 0) {
            $($(card_char)[i]).css("order", nbrCard - 1);
            listPosition[i] = [id_player, nbrCard - 1];
          }else {
            $($(card_char)[i]).css("order", (parseInt(order) - 1));
            listPosition[i] = [id_player, (parseInt(order) - 1)];
          }
        }
  
          let json = JSON.stringify(listPosition);
          axios.defaults.xsrfCookieName = 'csrftoken';
          axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  
          axios.post(`https://ce-soir-c-est-jor.com/api/:8000/api/users/updatePosition/` + json + "/" + id_party)
          .then(res => {
              // console.log(res);
          })
      }else {
        
        for(let i = 0; i < nbrCard; i++) {
          let order = $($(card_char)[i]).css("order");
          let id_player = $($(card_char)[i]).attr("data-id");
          if(order == (parseInt(position) - 1)) {
            $($(card_char)[i]).css("order", (parseInt(order) + 1));
            listPosition[i] = [id_player, parseInt(order) + 1];
          }else if(order == parseInt(position)){
            $($(card_char)[i]).css("order", (parseInt(order) - 1));
            listPosition[i] = [id_player, parseInt(order) - 1];
          }else {
            listPosition[i] = [id_player, parseInt(order)];
          }
        }
        setTimeout(function() {
          let json = JSON.stringify(listPosition);
          axios.defaults.xsrfCookieName = 'csrftoken';
          axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  
          axios.post(`https://ce-soir-c-est-jor.com/api/:8000/api/users/updatePosition/` + json + "/" + id_party)
          .then(res => {
              // console.log(res);
          })
        }, 1100);
        
      }
    
  }
  clickArrowRight = (id_player) => {
    var card_char = document.getElementsByClassName('char_card');
    var nbrCard = card_char.length; 
    var listPosition = [];
    var id_party = this.props.id_party;

      let position = $("#card_user_"+id_player).css('order');
      if(position == (nbrCard - 1)) {
        for(let i = 0; i < nbrCard; i++) {
          let order = $($(card_char)[i]).css("order");
          let id_player = $($(card_char)[i]).attr("data-id");
          
          if(order == (nbrCard - 1)) {
            $($(card_char)[i]).css("order", 0);
            listPosition[i] = [id_player, 0];
          }else {
            $($(card_char)[i]).css("order", (parseInt(order) + 1));
            listPosition[i] = [id_player, (parseInt(order) + 1)];
          }
        }
  
          let json = JSON.stringify(listPosition);
          axios.defaults.xsrfCookieName = 'csrftoken';
          axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  
          axios.post(`https://ce-soir-c-est-jor.com/api/:8000/api/users/updatePosition/` + json + "/" + id_party)
          .then(res => {
              // console.log(res);
          })
      }else {
        
        for(let i = 0; i < nbrCard; i++) {
          let order = $($(card_char)[i]).css("order");
          let id_player = $($(card_char)[i]).attr("data-id");
          if(order == (parseInt(position) + 1)) {
            // console.log(position);
            // console.log(order);
            // console.log($(card_char)[i]);
            $($(card_char)[i]).css("order", (parseInt(order) - 1));
            listPosition[i] = [id_player, (parseInt(order) - 1)];
          }else if(order == parseInt(position)){
            $($(card_char)[i]).css("order", (parseInt(order) + 1));
            listPosition[i] = [id_player, (parseInt(order) + 1)];
          }else {
            listPosition[i] = [id_player, parseInt(order)];
          }
        }
        let json = JSON.stringify(listPosition);
          // console.log(json);
          axios.defaults.xsrfCookieName = 'csrftoken';
          axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  
          axios.post(`https://ce-soir-c-est-jor.com/api/:8000/api/users/updatePosition/` + json + "/" + id_party)
          .then(res => {
              // console.log(res);
          })
      }
  }
  
  hoverArrow = (id_player) => {
    $("#card_user_" + id_player).addClass('no_clic');
    var arrowLeft = document.getElementsByClassName('arrow_left');
    var arrowRight = document.getElementsByClassName('arrow_right');
    $(arrowLeft).on('mouseleave', function() {
      $("#card_user_" + id_player).removeClass('no_clic');
    })
    $(arrowRight).on('mouseleave', function() {
      $("#card_user_" + id_player).removeClass('no_clic');
    })
  }
  

  

  // componentDidUpdate(prevProps, prevState, snapshot) {

  //     // Update the component if parent state is updated
  //     if(this.props.updateGroup !== prevProps.updateGroup || 
  //       this.state.updateGroupForStats !== prevState.updateGroupForStats) {
  //       console.log("Updated !!");
  //       axios.defaults.xsrfCookieName = 'csrftoken';
  //       axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  //       axios.get(`https://ce-soir-c-est-jor.com/api/:8000/api/users/active` + "/" + this.props.id_party)
  //       .then(res => {
  //           let result = Object.values(res.data);
  //           this.setState({ users: result });
  //       })
  //     }
  //     console.log("updated");
  //     this.getScripts();
  // }

  componentDidMount() {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get(`https://ce-soir-c-est-jor.com/api/:8000/api/users/active` + "/" + this.props.id_party)
      .then(res => {
        let result = Object.values(res.data);
        // console.log(result);
        this.setState({ users: result });
      })
      console.log("mounted");
      // this.getScripts();
  }

  testFunction = () => {
    
    console.log(this.props.id_party);
  }


  


    render() {

        var users = this.getUsers();

        return (
            <div className='groupActif'>
                {users.map((user, i) => {
                return (
                    <div id={"card_user_" + user.id_player} className="char_card" key={i} style={{"order": i}} data-id={user.id_player} onClick={this.handleClick.bind(this.handleClick, user.id_player)}>
                      <div onClick={this.clickArrowLeft.bind(this.clickArrowLeft, user.id_player)} onMouseEnter={this.hoverArrow.bind(this.hoverArrow, user.id_player)} className="arrow_left">&#8592;</div>
                      <div onClick={this.clickArrowRight.bind(this.clickArrowRight, user.id_player)} onMouseEnter={this.hoverArrow.bind(this.hoverArrow, user.id_player)} className="arrow_right">&#8594;</div>
                      <div className="card_box_img"><img src={require("../assets/img/"+user.Race+".jpeg")} alt={"../assets/img/"+user.Race+".jpeg"} /></div>
                      <div className="char_name">{user.Nom}</div>
                      <div className="char_box_stats">
                        <div className="char_health">{user.health}/{user.maxHealth}<span style={{"width": ((user.health * 100) / user.maxHealth) + "%"}} className="bg_health"></span></div>
                        <div className="char_mana">{user.mana}/{user.maxMana}<span style={{"width": ((user.mana * 100) / user.maxMana) + "%"}} className="bg_mana"></span></div>
                      </div>
                      <div className="char_box_caract">
                        <div className="char_physic">{user.Physique}</div>
                        <div className="char_mental">{user.Mental}</div>
                        <div className="char_social">{user.Social}</div>
                      </div>
                    </div>
                )})}
                {/* <button style={{"order": (users.length)}} className="upTurn"><span>&#8592;</span></button> */}

          {users.length > 0 ? 
            <button onClick={this.upTurn} style={{"order": (users.length)}} className="upTurn"><span>&#8592;</span></button>
             :
             <p className="empty_group">Empty</p>
          }


          {this.state.displayDesc ? 
            <Description 
              displayDesc={this.state.displayDesc}
              id_desc={this.state.id_desc}
              users={this.state.users}
              handlerGroup={this.handlerGroup}
              id_party={this.props.id_party}
            /> : null
          }
                
            </div>
        );
    }
  }

export default GroupActif;