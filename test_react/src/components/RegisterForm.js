import React, {Component} from 'react';
import FormValidator from '../validation/FormValidator';
import axios from 'axios';
import $ from 'jquery';
import{ init, send } from '@emailjs/browser';

class RegisterForm extends Component{
constructor(){
super();
this.validator = new FormValidator([{
    field: 'username',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter username.'
}, {
    field: 'email',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter your email.'
}, {
    field: 'password',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter password.',
    minimalScore: 4
}, {
    field: 'password_confirmation',
    method: this.passwordMatch,
    validWhen: true,
    message: 'Enter password confirmation.'
}
]);

this.state = {
username: '',
email: '',
password: '',
password_confirmation: '',
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
passwordMatch = (confirmation, state) => (state.password === confirmation);
handleFormSubmit = event => {
event.preventDefault();
const validation = this.validator.validate(this.state);
this.setState({
validation
});
this.submitted = true;
if(validation.isValid) {

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.post(`https://ce-soir-c-est-jor.com/api/:8000/api/user_register/`+ this.state.username + "/" + this.state.email + "/" + this.state.password)
    .then(res => {
        console.log(res);
        if(res.data[0] !== undefined) {
            if(res.data[0].username !== undefined) {
                init("khZEel_OFdFp8l2MS");
                var templateParams = {
                    username: res.data[0].username,
                    email: res.data[0].email
                };
                send('service_fbwp3ta', 'template_viei73s', templateParams)
                    .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    }, function(error) {
                    console.log('FAILED...', error);
                });
                this.props.switchForm(true);
            }
        }
    })
}
}
render() {
let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
return (
<div>
    <div className="container form_register form">
        <div className="row"> 
            <div>
                <form className="registrationForm formulaire_home">
                <h2>Register</h2> 
                    <div className={validation.username.isInvalid ? 'has-error' : null}>
                        <label htmlFor="username">Username</label>
                        <input type="string" className="form-control" name="username" placeholder="Username" onChange={this.handleInputChange} /> <span className="help-block">{validation.username.message}</span> 
                    </div>
                    
                    <div className={validation.email.isInvalid ? 'has-error' : null}>
                        <label htmlFor="email">Email</label>
                        <input type="string" className="form-control" name="email" placeholder="Email" onChange={this.handleInputChange} /> <span className="help-block">{validation.email.message}</span> 
                    </div>
                    <div className={validation.password.isInvalid ? 'has-error' : null}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInputChange} /> <span className="help-block">{validation.password.message}</span> </div>
                    <div className={validation.password_confirmation.isInvalid ? 'has-error' : null}>
                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Confirm Password" name="password_confirmation" onChange={this.handleInputChange} /> <span className="help-block">{validation.password_confirmation.message}</span> 
                    </div>

                <button onClick={this.handleFormSubmit} className="btn"> Submit </button>
                </form>
                
            </div>
        </div>
        <p onClick={this.props.switchForm} className="switch_form">Have an account ? <br/> Sign in</p>
    </div>
    
</div>
)
}
}
export default RegisterForm;