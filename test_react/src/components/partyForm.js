import React, {Component} from 'react';
import FormValidator from '../validation/FormValidator';
import axios from 'axios';
import '../assets/party.css';
import $ from 'jquery';

class PartyForm extends Component{
constructor(props){
super(props);
this.validator = new FormValidator([{
    field: 'name',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter party name'
}
]);

this.state = {
name: "",
validation: this.validator.valid()
}
this.submitted = false;
}


handleInputChange = event => {
event.preventDefault();
this.setState({
[event.target.name]: event.target.value,
});
}
handleClose = () => {
    if($(".form_party").hasClass("displayed")) {
        $(".form_party").removeClass("displayed");
    }
}
handleFormSubmit = event => {
event.preventDefault();
const validation = this.validator.validate(this.state);
this.setState({
validation
});





this.submitted = true;
if(validation.isValid) {
    console.log("Validated party Form !");
    console.log(this.props.email_user);
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.post(`http://127.0.0.1:8000/api/user/create_party/` 
    + this.state.name + "/"
    + this.props.id_user + "/"
    + this.props.email_user)
    .then(res => {
        console.log(res);
        if($(".form_party").hasClass("displayed")) {
            $(".form_party").removeClass("displayed");
        }else {
            $(".form_party").addClass("displayed");
        }
        
    }).then(res => {
        this.props.handleUpdate();
        // this.props.handlerStats();
        // Update the parent Description until Group is update 
    })
}
}
render() {
let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
return (
<div>
    <div className="container form_party form">
        <div className="btn_close_party_form" onClick={this.handleClose.bind(this.handleClose)}>x</div>
        <div className="row">
            <div>
                <form className="registrationForm">
                <h2>New party</h2>
                    <div className={validation.name.isInvalid ? 'has-error' : null}>
                        <label htmlFor="name">Name</label>
                        <input defaultValue={this.props.name} type="text" className="form-control" name="name" onChange={this.handleInputChange} /> <span className="help-block">{validation.name.message}</span> 
                    </div>
                    
                <button onClick={this.handleFormSubmit} className="btn btn-primary"> Create </button>
                </form>
            </div>
        </div>
    </div>

</div>
)
}
}
export default PartyForm;