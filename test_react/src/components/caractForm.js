import React, {Component} from 'react';
import FormValidator from '../validation/FormValidator';
import axios from 'axios';

class FormCaract extends Component{
constructor(props){
super(props);
this.validator = new FormValidator([{
    field: 'physic',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter physique'
}, {
    field: 'mental',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter mental'
}, {
    field: 'social',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter social'
}
]);

this.state = {
physic: this.props.physic,
mental: this.props.mental,
social: this.props.social,
validation: this.validator.valid()
}
this.submitted = false;
}

// componentDidUpdate(prevProps, prevState, snapshot) {
//     if(this.props.currentUser !== prevProps.currentUser) {
//         this.setState({
//             physic: this.props.Physique,
//             mental: this.props.Mental,
//             social: this.props.Social
//         });
//     }
    
// }
componentWillReceiveProps(props) {
    this.setState({
        physic: this.props.physic,
        mental: this.props.mental,
        social: this.props.social
    });
}

handleInputChange = event => {
event.preventDefault();
this.setState({
[event.target.name]: event.target.value,
});
}
handleFormSubmit = event => {
event.preventDefault();
// console.log(this.props.mental);
const validation = this.validator.validate(this.state);
this.setState({
validation
});
this.submitted = true;
if(validation.isValid) {
    // console.log("Validated Caract Form !");

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.post(`http://127.0.0.1:8000/api/user/update_caract/` 
    + this.state.physic + "/" 
    + this.state.mental + "/" 
    + this.state.social + "/"
    + this.props.id_desc)
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
    <div className="container form_caract form">
        <div className="row">
            <div>
                <form className="registrationForm">
                <h2>Change caract</h2>
                    <div className={validation.physic.isInvalid ? 'has-error' : null}>
                        <label htmlFor="physic">Physique</label>
                        <input defaultValue={this.props.physic} type="integer" className="form-control" name="physic" onChange={this.handleInputChange} /> <span className="help-block">{validation.physic.message}</span> 
                    </div>
                    
                    <div className={validation.mental.isInvalid ? 'has-error' : null}>
                        <label htmlFor="mental">Mental</label>
                        <input defaultValue={this.props.mental} type="integer" className="form-control" name="mental" onChange={this.handleInputChange} /> <span className="help-block">{validation.mental.message}</span> 
                    </div>
               
                    <div className={validation.social.isInvalid ? 'has-error' : null}>
                        <label htmlFor="social">Social</label>
                        <input defaultValue={this.props.social} type="integer" className="form-control" name="social" onChange={this.handleInputChange} /> <span className="help-block">{validation.social.message}</span> 
                    </div>
                    
                    
                <button onClick={this.handleFormSubmit} className="btn btn-primary"> Changer caractéristiques </button>
                </form>
            </div>
        </div>
    </div>

</div>
)
}
}
export default FormCaract;