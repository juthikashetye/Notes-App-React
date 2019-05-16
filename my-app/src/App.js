import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Form from './Form';

let name;
let pass;
let globalUserId;

// returns login msg for user & redirects to main page
const login = (n,p) => {

  fetch(`/login/${n}/${p}`,{
    method: 'POST',
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

    }).then(l => l.json())
      .then(l => {

      console.log(l);

      if (l.msg === "You are logged in.") {
        alert(l.msg);
        globalUserId = l.user_id;
        console.log(globalUserId);
        window.location.href = "./main.html"
      }else {
        alert(l);
      }
    });
    
}

// returns signup msg for user
const signup = (n,p) =>{

  fetch(`/signup/${n}/${p}`,{ 
    method: 'POST',
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

    }).then(s => s.json())
      .then(s => {

      alert(s);

    });
}

class App extends Component {
  constructor() {
    super();
    
  }
  
  componentDidMount() {
    fetch("/get-all-notebooks/1") //this returns a string
        .then(res => res.json()) //we convert that string to json and return it
        .then(notebooks => this.setState({notebooks})
        ) //then we throw that notebooks json into the state

  }

  handleClick = () => {
    fetch("/get-all-notebooks/1")
    .then(response => response.json())
    .then(myJson => console.log(JSON.stringify(myJson))
    );

  }

  // event handler for signup button
  signUpClick = (event) => {

    // name = event.target.parentElement.children[0].children[0].children[0].value
    name = document.querySelector("#username").value
    console.log(name);   
    // pass = event.target.parentElement.children[1].children[0].children[0].value
    pass = document.querySelector("#password").value
    console.log(pass);

    if (name === "" || pass === "") {
        alert("Please fill required (*) fields.");
      }else {
        signup(name,pass);
      }
    
  }
  // event handler for login button
  logInClick = (event) => {

    // name = event.target.parentElement.children[0].children[0].children[0].value
    name = document.querySelector("#username").value
    console.log(name);   
    // pass = event.target.parentElement.children[1].children[0].children[0].value
    pass = document.querySelector("#password").value
    console.log(pass);

    if (name === "" || pass === "") {
        alert("Please fill required (*) fields.");
      }else {
        login(name,pass);
      }
  }

  render(){
    return (
      <div className="App">
        <div className="container center-align">
      {/*<Form />*/}
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
            <button onClick={this.logInClick}className="btn btn-primary btn-md" id="loginButton">LOGIN</button>
            <button onClick={this.signUpClick} className="btn btn-secondary btn-md" id="signupButton">SIGN-UP</button>
            <button onClick={this.handleClick}>Test</button>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
