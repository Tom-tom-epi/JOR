import React from 'react';
// import $ from 'jquery';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import '../assets/homepage.css';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_login: true,
      success_register: false
    };
    
    
  }

  switchForm = (register = false) => {
    // this.setState({
    //   form_login: !this.state.form_login
    // })
    if(register == true) {
      this.setState({
        success_register: true,
        form_login: !this.state.form_login
      })
    }else {
      this.setState({
        success_register: false,
        form_login: !this.state.form_login
      })
    }
  }
 
    render() {
      return (
        <div className='Homepage'>
            <h1>JOR</h1>
            {this.state.success_register ? 
              <span className="alert_register_success">You've been registered</span>
              :
              null
            }
            
            <div className="content_forms">
            {this.state.form_login ? 
              <LoginForm
                switchForm = {this.switchForm} 
                getLogged = {this.props.getLogged}
              />
              :
              <RegisterForm 
                switchForm = {this.switchForm} 
              />
            }
            </div>
        </div>
      );
    }
  }

export default Homepage;