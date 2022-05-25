import React, {Component} from 'react';
import FormValidator from '../validation/FormValidator';
import axios from 'axios';


class FormStats extends Component{
constructor(props){
super(props);
this.validator = new FormValidator([{
    field: 'health',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter health'
}, {
    field: 'maxHealth',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter max health'
}, {
    field: 'mana',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter mana'
}, 
{
    field: 'maxMana',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter max mana'
}
]);

this.state = {
health: this.props.health,
maxHealth: this.props.maxHealth,
mana: this.props.mana,
maxMana: this.props.maxMana,
validation: this.validator.valid()
}
this.submitted = false;
}

componentWillReceiveProps(props) {
    this.setState({
        health: this.props.health,
        maxHealth: this.props.maxHealth,
        mana: this.props.mana,
        maxMana: this.props.maxMana
    });
}



handleInputChange = event => {
event.preventDefault();
// console.log(this.props.health);
this.setState({
[event.target.name]: event.target.value,
});
}
handleFormSubmit = event => {
event.preventDefault();
// console.log(this.props.mana);

const validation = this.validator.validate(this.state);
// console.log(this.props.id_desc);
this.setState({
validation
});
this.submitted = true;
if(validation.isValid) {
    // console.log("Validated Stats Form !");

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.post(`https://ce-soir-c-est-jor.com/api/:8000/api/user/update_stats/` 
    + this.state.health + "/" 
    + this.state.maxHealth + "/" 
    + this.state.mana + "/"
    + this.state.maxMana + "/"
    + this.props.id_desc
    + "/" + this.props.id_party)
    .then(res => {
        // console.log(res);
    }).then(res => {
        this.props.handlerStats();
        // Update the parent Description until Group is update 
    })
}
}
render() {
let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
return (
<div>
    <div className="container form_stats form">
        <div className="row">
            <div>
                <form className="registrationForm">
                <h2>Change stats</h2>
                <div className="content_stats">
                    <div className={validation.health.isInvalid ? 'has-error' : null}>
                        <label htmlFor="health">Health</label>
                        <input defaultValue={this.props.health} type="integer" className="form-control" name="health" onChange={this.handleInputChange} /> <span className="help-block">{validation.health.message}</span> 
                    </div> 
                    <div className='slash'>/</div>
                    <div className={validation.maxHealth.isInvalid ? 'has-error' : null}>
                        <label htmlFor="maxHealth">Max Health</label>
                        <input defaultValue={this.props.maxHealth} type="integer" className="form-control" name="maxHealth" onChange={this.handleInputChange} /> <span className="help-block">{validation.maxHealth.message}</span> 
                    </div>
                </div>
                <div className="content_stats">
                    <div className={validation.mana.isInvalid ? 'has-error' : null}>
                        <label htmlFor="mana">Mana</label>
                        <input defaultValue={this.props.mana} type="integer" className="form-control" name="mana" onChange={this.handleInputChange} /> <span className="help-block">{validation.mana.message}</span> 
                    </div> 
                    <div className='slash'>/</div>
                    <div className={validation.maxMana.isInvalid ? 'has-error' : null}>
                        <label htmlFor="maxMana">Max Mana</label>
                        <input defaultValue={this.props.maxMana} type="integer" className="form-control" name="maxMana" onChange={this.handleInputChange} /> <span className="help-block">{validation.maxMana.message}</span> 
                    </div>
                </div>
                    
                    
                <button onClick={this.handleFormSubmit} className="btn"> Change stats </button>
                </form>
            </div>
        </div>
    </div>

</div>
)
}
}
export default FormStats;