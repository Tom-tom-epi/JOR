import React, {Component} from 'react';
import FormValidator from '../validation/FormValidator';
import axios from 'axios';
import CardCharacters from './cardCharacters';
import $ from 'jquery';

class FormCharacter extends Component{
constructor(props){
super(props);
this.validator = new FormValidator([{
field: 'full_name',
method: 'isEmpty',
validWhen: false,
message: 'Enter full name.'
}, {
field: 'special',
method: 'isEmpty',
validWhen: false,
message: 'Enter spécial.'
}
]);

this.state = {
full_name: '',
special: '',
race: 'Impérial',
role: 'pnj',
validation: this.validator.valid(),
updateCard: true
}
this.submitted = false;
// console.log(this.props.id_party);
}

handleInputChange = event => {
event.preventDefault();
this.setState({
[event.target.name]: event.target.value,
});
}

selectType = (label_class) => {
    // console.log(label_class);
    $(".form_check_label").removeClass("active");
    $("." + label_class).addClass("active");
    this.setState({ role: label_class });
}

handleFormSubmit = event => {
event.preventDefault();
const validation = this.validator.validate(this.state);
this.setState({
validation
});
this.submitted = true;
if(validation.isValid) {
    // console.log("Validated Form !");

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.post(`https://ce-soir-c-est-jor.com/api/:8000/api/character_create/`
    + this.state.full_name + "/" 
    + this.state.special + "/" 
    + this.state.race + "/"
    + this.state.role + "/"
    + this.props.id_admin
    + "/" + this.props.id_party)
    .then(res => {
        // console.log(res);
        this.setState({ updateCard: !this.state.updateCard });
    })
}
}
render() {
let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
return (
<div>
    <div className="container form_character form">
        <div className="row">
            <div>
                <form className="registrationForm">
                <h2>New Character</h2>
                    <div className={validation.full_name.isInvalid ? 'has-error' : null}>
                        <label htmlFor="full_name">Full Name</label>
                        <input type="string" className="form-control" name="full_name" placeholder="Full Name" onChange={this.handleInputChange} /> <span className="help-block">{validation.full_name.message}</span> 
                    </div> 
                    <label htmlFor="race">Race</label>
                    <select onChange={this.handleInputChange} name="race" className="form-select" aria-label="Default select example">
                        <option value="Impérial">Impérial</option>
                        <option value="Haut-Elfe">Haut-Elfe</option>
                        <option value="Elfe des bois">Elfe des bois</option>
                        <option value="Elfe noir">Elfe noir</option>
                        <option value="Argonien">Argonien</option>
                        <option value="Khajiit">Khajiit</option>
                        <option value="Rougegarde">Rougegarde</option>
                        <option value="Bréton">Bréton</option>
                        <option value="Orc">Orc</option>
                        <option value="Nordique">Nordique</option>
                        <option value="Invocation">Invocation</option>
                        <option value="Ennemi">Ennemi</option>
                    </select>
                    <div className="content_form_check">
                        <div className="form_check">
                            <input className="form-check-input" type="radio" name="role" id="role1" value="equipement" defaultChecked/>
                            <label className="form_check_label pnj active" htmlFor="role1" onClick={this.selectType.bind(this.selectType, "pnj")}>
                                PNJ
                            </label>
                        </div>
                        <div className="form_check">
                            <input className="form-check-input" type="radio" name="role" id="role2" value="quest"/>
                            <label className="form_check_label player" htmlFor="role2" onClick={this.selectType.bind(this.selectType, "player")}>
                                Player
                            </label>
                        </div>
                    </div>
                    <div className={validation.special.isInvalid ? 'has-error' : null}>
                        <label htmlFor="special">Spécial</label>
                        <input type="string" className="form-control" name="special" placeholder="Spécial" onChange={this.handleInputChange} /> <span className="help-block">{validation.special.message}</span> 
                    </div>
                <button onClick={this.handleFormSubmit} className="btn btn-primary"> Register </button>
                </form>
            </div>
        </div>
    </div>

    <CardCharacters 
    updateCard={this.state.updateCard}
    id_party={this.props.id_party}/>
</div>
)
}
}
export default FormCharacter;