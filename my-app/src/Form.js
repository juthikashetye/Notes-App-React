import React from 'react';
import './App.css';


const Form = (props) => (

  <div className="container formDiv mt-3">
  
    <h1 className="text-center mt-5 mb-5"> Note-It </h1>
    <form className="userLoginSignUp">
    
      <div className="form-row justify-content-md-center no-gutters">
        <div className="form-group col-md-7 col-lg-6">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" placeholder="username*" className="form-control" />
        </div>
      </div>

      
      <div className="form-row justify-content-md-center no-gutters">
        <div className="form-group col-md-7 col-lg-6">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="password*" className="form-control" />
          <small id="passwordHelp" className="form-text text-muted">Username and password are case sensitive.</small>
        </div>
      </div>

      <div className="form-row justify-content-center">

        <button onClick={props.logInClick} className="form-group btn btn-success btn-md col-sm-3 col-md-3 col-lg-2 m-2" id="loginButton">LOGIN</button>
        <button onClick={props.signUpClick} className="form-group btn btn-primary btn-md col-sm-3 col-md-3 col-lg-2 m-2" id="signupButton">SIGN-UP</button>

      </div>
     </form>

   </div>
);

export default Form;