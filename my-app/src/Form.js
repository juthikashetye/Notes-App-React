import React from 'react';
import './App.css';

const smallStyles = {fontSize: "14px", color: "#444444"};
const nameStyle = {color: "inherit"};

const Form = (props) => (
 

  <div className="mt-0">

    <button type="button" className="d-block ml-auto mr-3 mt-3 mb-3 btn btn-sm btn-danger" data-toggle="modal" data-target="#modalScrollable">About</button>

    <div className="container formDiv">
    
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

    {/*Modal*/}
    <div className="modal fade" id="modalScrollable" tabindex="-1" role="dialog" aria-labelledby="modalScrollableTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title modalHeading font-weight-bold" id="modalScrollableTitle">Note-It</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body modalBody aboutModal">
            <p>With Note-It you can neatly organize your recipe notes in notebooks.</p>
            <p>Create, save, edit and delete recipes online in your own private account and access them anywhere, any time.</p>
            <p>Just fill in a unique username, and a password that you will easily remember. We suggest that you save this password somewhere secure as we currently do not have a feature to retrieve your password incase you forget it.</p>
            <p>That's it! Go ahead and Note-It!</p>
            <small style={smallStyles}>Developed by <a href="https://juthikashetye.github.io/Updated-Portfolio-Page/" target="_blank" rel="noopener noreferrer" title="Visit Juthika's Portfolio" style={nameStyle}>Juthika Shetye</a></small><br/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default Form;