import React, {Component} from 'react';
import FormValidator from '../validation/FormValidator';
import axios from 'axios';

class FormSpell extends Component{
constructor(props){
super(props);
this.validator = new FormValidator([{
    field: 'spell_name',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter spell name.'
}, {
    field: 'spell_effect',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter spell effect.'
}, {
    field: 'ecole',
    method: 'isEmpty',
    validWhen: false,
    message: 'Select magic school.'
}
]);

this.state = {
spell_name: '',
spell_effect: '',
ecole: 'compétence d\'arme',
validation: this.validator.valid(),
updateInventory: true
}
this.submitted = false;
}
handleInputChange = event => {
event.preventDefault();
this.setState({
[event.target.name]: event.target.value,
});
}
handleFormSubmit = event => {
event.preventDefault();
const validation = this.validator.validate(this.state);
// console.log(validation);
this.setState({
validation
});
this.submitted = true;
if(validation.isValid) {
    // console.log("Validated Item Form !");

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.post(`https://ce-soir-c-est-jor.com/api/api/user/spell_create/`
    + this.state.spell_name + "/" 
    + this.state.spell_effect + "/" 
    + this.state.ecole + "/" 
    + this.props.id_desc
    + "/" + this.props.id_party)
    .then(res => {
        // console.log(res);
        // this.setState({ updateInventory: !this.state.updateInventory });
    }).then(res => {
        this.props.handler();
    })
}
}
render() {
let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
return (
<div>
    <div className="container form_spell form">
        <div className="row">
            <div>
                <form className="registrationForm">
                <h2>New spell</h2>
                    <div className={validation.spell_name.isInvalid ? 'has-error' : null}>
                        <label htmlFor="spell_name">Spell name</label>
                        <input type="string" className="form-control" name="spell_name" placeholder="Spell Name" onChange={this.handleInputChange} /> <span className="help-block">{validation.spell_name.message}</span> 
                    </div>
                    <select onChange={this.handleInputChange} name="ecole" className="form-select" aria-label="Default select example">
                        <option value="compétence d\'arme">Compétence d'arme</option>
                        <option value="Destruction">Destruction</option>
                        <option value="Guérison">Guérison</option>
                        <option value="Alteration">Altération</option>
                        <option value="Conjuration">Conjuration</option>
                        <option value="Illusion">Illusion</option>
                        <option value="Mysticisme">Mysticisme</option>
                        <option value="Pouvoir Spécial">Pouvoir spécial</option>
                    </select>
                    <div className={validation.spell_effect.isInvalid ? 'has-error' : null}>
                        <label htmlFor="spell_effect">Spell effect</label>
                        <input type="string" className="form-control" name="spell_effect" placeholder="Spell effect" onChange={this.handleInputChange} /> <span className="help-block">{validation.spell_effect.message}</span> 
                    </div>
                <button onClick={this.handleFormSubmit} className="btn btn-primary"> Create spell </button>
                </form>
            </div>
        </div>
    </div>

</div>
)
}
}
export default FormSpell;