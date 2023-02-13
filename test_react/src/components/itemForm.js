import React, {Component} from 'react';
import FormValidator from '../validation/FormValidator';
import axios from 'axios';
import $ from 'jquery';

class FormItem extends Component{
constructor(props){
super(props);
this.validator = new FormValidator([{
    field: 'item_name',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter item name.'
}, {
    field: 'item_effect',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter item effect.'
}, {
    field: 'item_nbr',
    method: 'isEmpty',
    validWhen: false,
    message: 'Enter item nbr.'
}
]);

this.state = {
item_name: '',
item_effect: '',
item_nbr: 1,
type_object: 'equipement',
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
selectType = (label_class) => {
    $(".form_check_label").removeClass("active");
    $("." + label_class).addClass("active");
    this.setState({ type_object: label_class });
}
handleFormSubmit = event => {
event.preventDefault();
const validation = this.validator.validate(this.state);
// console.log(this.props.id_desc);
this.setState({
validation
});
this.submitted = true;
if(validation.isValid) {
    // console.log("Validated Item Form !");

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios.post(`https://ce-soir-c-est-jor.com/api/api/user/item_create/`
    + this.state.item_name + "/" 
    + this.state.item_effect + "/" 
    + this.state.type_object + "/" 
    + this.props.id_desc + "/" 
    + this.state.item_nbr
    + "/" + this.props.id_party)
    .then(res => {
        // console.log(res);
        this.setState({ updateInventory: !this.state.updateInventory });
    }).then(res => {
        this.props.handler();
    })
}
}
render() {
let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
return (
<div>
    <div className="container form_item form">
        <div className="row">
            <div>
                <form className="registrationForm">
                <h2>New item</h2>
                    <div className={validation.item_name.isInvalid ? 'has-error' : null}>
                        <label htmlFor="item_name">Item name</label>
                        <input type="string" className="form-control" name="item_name" placeholder="Item Name" onChange={this.handleInputChange} /> <span className="help-block">{validation.item_name.message}</span> 
                    </div>
                    <div className="content_form_check">
                        <div className="form_check">
                            <input className="form-check-input" type="radio" name="type_object" id="type_object1" value="equipement" defaultChecked/>
                            <label className="form_check_label equipement active" htmlFor="type_object1" onClick={this.selectType.bind(this.selectType, "equipement")}>
                                Equipement
                            </label>
                        </div>
                        <div className="form_check">
                            <input className="form-check-input" type="radio" name="type_object" id="type_object2" value="quest"/>
                            <label className="form_check_label quest" htmlFor="type_object2" onClick={this.selectType.bind(this.selectType, "quest")}>
                                Quest
                            </label>
                        </div>
                    </div>
                    <div className={validation.item_effect.isInvalid ? 'has-error' : null}>
                        <label htmlFor="item_effect">Item effect</label>
                        <input type="string" className="form-control" name="item_effect" placeholder="Item effect" onChange={this.handleInputChange} /> <span className="help-block">{validation.item_effect.message}</span> 
                    </div>
                    <div className={validation.item_nbr.isInvalid ? 'has-error' : null}>
                        <label htmlFor="item_nbr">Item nbr</label>
                        <input type="integer" className="form-control" name="item_nbr" placeholder="Item nbr" onChange={this.handleInputChange} /> <span className="help-block">{validation.item_nbr.message}</span> 
                    </div>
                <button onClick={this.handleFormSubmit} className="btn btn-primary"> Create item </button>
                </form>
            </div>
        </div>
    </div>

</div>
)
}
}
export default FormItem;