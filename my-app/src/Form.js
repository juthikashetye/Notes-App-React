import React from 'react';
import './App.css';

//stateless component

const Form = (props) => (
	//no constructor, no state property 

  <div className="userLoginSignUp">
    <div className="row">
      <div className="input-field col s12 m6 offset-m3">
        <input id="username" type="text" name="name_input" className="validate" />
        <label htmlFor="username">Username</label>
        <span className="helper-text left-align">Required*</span>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12 m6 offset-m3">
        <input id="password" type="password" name="password_input" className="validate" />
        <label htmlFor="password">Password</label>
        <span className="helper-text left-align">Required*</span>
      </div>
    </div>
    <button onClick={props.logInClick} className="btn btn-primary btn-md" id="loginButton">LOGIN</button>
    <button onClick={props.signUpClick} className="btn btn-secondary btn-md" id="signupButton">SIGN-UP</button>
   </div>

);

export default Form;