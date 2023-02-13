import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import PartyForm from './partyForm';
// import '../assets/party.css';

class SelectParty extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleUpdate.bind(this);
    this.state = {
        parties: [],
        update: false
    };
  }

  componentDidMount() {
    this.fetchData(this.props.id_user);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
      if(this.state.update !== prevState.update) {
        this.fetchData(this.props.id_user);
      }
  }
  
  handeClick = (id) => {
    this.props.selectParty(id);
  }

  showDeleteBox = (id) => {
      if($(".box_delete_party_" + id).hasClass('displayed')) {
            $(".box_delete_party_" + id).removeClass('displayed');
      }else {
          $(".box_delete_party_" + id).addClass('displayed');
      }
  }

  deleteParty = (id) => {
      // console.log("Delete party !" + this.props.id_admin);
      axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.post(`https://ce-soir-c-est-jor.com/api/api/user/delete_party` + `/` + id + `/` + this.props.id_user)
      .then(res => {
        // console.log(res);
        this.setState({ update: !this.state.update }); 
        this.showDeleteBox(id);
    })
  }


  fetchData = (id) => {
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios.get(`https://ce-soir-c-est-jor.com/api/api/user/getParties` + `/` + id)
      .then(res => {
        // let result = Object.values(res.data);
        // console.log(res);
        this.setState({ parties: res.data }); 
        // return result;
    })
  } 

  getParties = () => {
    var parties = [];
    for(let i = 0; i < this.state.parties.length; i++) {
     parties.push(this.state.parties[i]);
    }
    return (
      parties
    )
  }

  handleClick = () => {
      if($(".form_party").hasClass("displayed")) {
        $(".form_party").removeClass("displayed");
      }else {
        $(".form_party").addClass("displayed");
      }

  }

  handleUpdate = () => {
    this.setState({ update: !this.state.update }); 
  }
  
    render() {
    var parties = this.getParties(this.props.id_user);
    // console.log(parties);
        return (
            <div className="content_parties">
              <div className="block_parties">
                {parties.map((partie, i) => {
                    return (
                    <div key={i} className="box_parties">
                        <p className="partie_name">{partie.name}</p>
                        <p className="partie_nbr_player">{partie.nbr_player} players</p>
                        <button className="btn_partie_delete" onClick={this.showDeleteBox.bind(this.showDeleteBox, partie.id)}>DELETE {partie.id}</button>
                        <button className="btn_partie_select" onClick={this.handeClick.bind(this.handeClick, partie.id)}>Select {partie.id}</button>
                        

                        <div className={"box_delete box_delete_party_" + partie.id }>
                            <div className="content_delete_party">
                                <p>Are you sure you want to delete this party ?</p>
                                <p>All the content will be lost !</p>
                                <div className="box_btn_delete_party">
                                    <button className="cancel_delete" onClick={this.showDeleteBox.bind(this.showDeleteBox, partie.id)}>No, cancel</button>
                                    <button className="confirm_delete" onClick={this.deleteParty.bind(this.deleteParty, partie.id)}>Yes, i'm sure</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )})}
              </div>
            <div className="box_create_parties">
                <div>Create new party</div>
                <button onClick={this.handleClick.bind(this.handeClick)}>Create</button>
            </div>

            
            
            <PartyForm 
            id_user={this.props.id_user} 
            email_user={this.props.email} 
            handleUpdate={this.handleUpdate.bind(this.handleUpdate)}/>

            </div>
        );
    }
  }

export default SelectParty;