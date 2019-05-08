import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="userLoginSignUp w-50 mx-auto pt-5">
          <form className="pb-3">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="name_input" className="form-control" id="username" placeholder="username *" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password_input" className="form-control" id="password" placeholder="password *" />
              <small id="emailHelp" className="form-text text-muted">Username and password are case sensitive.</small>
            </div>
          </form>
          <button className="btn btn-primary btn-md" id="loginButton">LOGIN</button>
          <button className="btn btn-secondary btn-md" id="signupButton">SIGN-UP</button>
        </div>
      </div>
    </div>
  );
}

export default App;
