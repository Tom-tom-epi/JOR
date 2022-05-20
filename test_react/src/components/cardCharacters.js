import React from 'react';
import axios from 'axios';
import GroupActif from './groupActif';
import $ from 'jquery';

class CardCharacters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        users: [],           //List of character
        update: true,        //Updating self
        updateGroup: true    //Updating group
    };
    // console.log(this.props.id_party);
  }

  getUsers = () => {
    var listUsers = [];
    for(let i = 0; i < this.state.users.length; i++) {
     listUsers.push(this.state.users[i]);
    }
    return (
      listUsers
    )
  };

  addToGroup = (id, active) => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    axios.post(`http://127.0.0.1:8000/api/user/addToGroup/`+id+"/"+active+"/"+ this.props.id_party)
      .then(res => {
        //   Update self
        //   And update the group (child component)
        this.setState({ update: !this.state.update });           
        this.setState({ updateGroup: !this.state.updateGroup });
    })
    
    
    if($(".add_card_id_" + id).hasClass("added")) {
      $(".add_card_id_" + id).removeClass("added");
      $(".add_card_id_" + id).html("+");
    }else {
      $(".add_card_id_" + id).addClass("added");
      $(".add_card_id_" + id).html("x");
    }
    
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
      
      if(this.state.update !== prevState.update) {
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'

        axios.get(`http://127.0.0.1:8000/api/users/`+ this.props.id_party)
        .then(res => {
            let result = Object.values(res.data);
            this.setState({ users: result });
            this.setState({ updateGroup: this.state.updateGroup });
        })

        // this.setState({ updateGroup: !this.state.updateGroup });
        // console.log("CARD -> " + this.state.updateGroup);
      }else if(this.props.updateCard !== prevProps.updateCard) {
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'

        axios.get(`http://127.0.0.1:8000/api/users/`+ this.props.id_party)
        .then(res => {
            let result = Object.values(res.data);
            this.setState({ users: result });
        })
      }
  }

  componentDidMount() {
   
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get(`http://127.0.0.1:8000/api/users/`+ this.props.id_party)
      .then(res => {
        let result = Object.values(res.data);
        this.setState({ users: result });
      })
  }

  

    render() {

        var users = this.getUsers();

        return (
            <div>

              {users.length > 0 ? 
                <div className='cardCharacters'>
                  {users.map((user, i) => {
                  return (
                      <div className={"card " + (user.active == 2 ? "active" : "unactive") } key={i}>
                          <span className={"add-card add_card_id_" + user.id + (user.active == 2 ? "added" : "")} onClick={this.addToGroup.bind(this.addToGroup, user.id, user.active)}>{(user.active == 2 ? "x" : "+")}</span>
                          <div className="card-name">{user.Nom}</div>
                          <div className="card-race">{user.Race}</div>
                          <div className="card-spe">{user.Spécial}</div>
                          <div className="card-passif">{user.Passif}</div>
                          <div className="card-malus">{user.Malus}</div>
                      </div>
                  )})}
                  {/* <GroupActif 
                  updateGroup={this.state.updateGroup}
                  id_party={this.props.id_party}/> */}
                  </div>
              :
                <div className='cardCharacters'>
                  <p className="empty_chars">Empty {users.length}</p>
                </div>
              }
              {users.length > 0 ? 
               <GroupActif 
                  updateGroup={this.state.updateGroup}
                  id_party={this.props.id_party}/>
                : null
              }
                {/* <div className='cardCharacters'>
                    {users.map((user, i) => {
                    return (
                        <div className={"card " + (user.active == 2 ? "active" : "unactive") } key={i}>
                            <span className={"add-card add_card_id_" + user.id + (user.active == 2 ? "added" : "")} onClick={this.addToGroup.bind(this.addToGroup, user.id, user.active)}>{(user.active == 2 ? "x" : "+")}</span>
                            <div className="card-name">{user.Nom}</div>
                            <div className="card-race">{user.Race}</div>
                            <div className="card-spe">{user.Spécial}</div>
                            <div className="card-passif">{user.Passif}</div>
                            <div className="card-malus">{user.Malus}</div>
                        </div>
                    )})}
                </div>
                <GroupActif 
                updateGroup={this.state.updateGroup}
                id_party={this.props.id_party}/> */}
            </div>
        );
    }
  }

export default CardCharacters;