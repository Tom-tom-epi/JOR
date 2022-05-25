import React, {Component} from 'react';
import FormValidator from '../validation/FormValidator';
import axios from 'axios';
import $ from 'jquery';

class LoginForm extends Component{
constructor(props){
super(props);
this.validator = new FormValidator([
{
    field: 'email',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter your email.'
}, {
    field: 'password',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter password.'
}
]);

this.state = {
email: '',
password: '',
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
// console.log(this.props.id_desc);
this.setState({
validation
});
this.submitted = true;
if(validation.isValid) {

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
console.log("in log");
    axios.get(`https://ce-soir-c-est-jor.com/api/:8000/user_login/`+ this.state.email + "/" + this.state.password)
    .then(res => {
        this.props.getLogged(res.data.username, res.data.email, res.data.id);
    })
}
}
render() {
let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
return ( 
<div>
    <div className="container form_login form">
        <div className="row">
            <div>
                <form className="registrationForm formulaire_home">
                <h2>Login</h2>
                    
                    <div className={validation.email.isInvalid ? 'has-error' : null}>
                        <label htmlFor="email">Email</label>
                        <input type="string" className="form-control" name="email" placeholder="Email" onChange={this.handleInputChange} /> <span className="help-block">{validation.email.message}</span> 
                    </div>
                    <div className={validation.password.isInvalid ? 'has-error' : null}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInputChange} /> <span className="help-block">{validation.password.message}</span> 
                    </div>

                <button onClick={this.handleFormSubmit} className="btn"> Submit </button>
                </form>
                
            </div>
        </div>
        <p onClick={this.props.switchForm} className="switch_form">New ? <br/> Sign up</p>
    </div>
    
</div>
)
}
}
export default LoginForm;