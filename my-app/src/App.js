import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Form from './Form';
import Main from './Main';
import Notes from './Notes';
// Import Materialize
// import M from "materialize-css";

let name;
let pass;
let globalUserId;
// let globalName;
// let notebookId;

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn : false,
      value: "",
      recipeSelected: false,
      notebookArr: [],
      notesArr: [],
      globalUserId: 0
    }
  }
  
  componentDidMount() {

    // M.AutoInit();

    // let options = {};

    // let elems = document.querySelectorAll('select');
    // M.FormSelect.init(elems, options);

    // this.initializeM = () => {
    //   let options = {};

    //   let elems = document.querySelectorAll('select');
    //   M.FormSelect.init(elems, options);
    // }
    

    // document.querySelectorAll('select').onchange = function() {this.initializeM()};

    // this.getnotes(globalUserId);
    this.getnotes(this.state.globalUserId);

  }

  // returns signup msg for user
  signup = (n,p) =>{

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

  // returns login msg for user & sets loggedIn to true
  login = (n,p) => {

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
        this.setState({
          loggedIn: true,
          globalUserId: l.user_id
        });
        this.getnotes(globalUserId);
      }else {
        alert(l);
      }
    });
    
}

  handleClick = () => {
    fetch("/get-all-notes/1")
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
        this.signup(name,pass);
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
        this.login(name,pass);
      }
  }

  handleSelectChange = (event) => {
    this.setState({
      value: event.target.value,
      recipeSelected: true
    });
    // console.log(this.state.value);
    // this.getnotes(globalUserId);
  }

  getnotes = (id) => {

    fetch(`/get-all-notes/${id}`,{
      method: 'GET',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }

    }).then(nt => nt.json())
      .then(nt => {

        console.log(nt);
        let notebookName = "";
        let nb_id = "";
        let nb_name = "";
        let notesNb_id = "";
        let n_name = "";
        let notebookArr;
        let notesArr;

        for (let i = 0; i < nt.length; i++) {

          // if(notebookName != nt[i].notebook_name) {
          //   let optGrp = $("<optgroup>")
          //   .attr("label", nt[i].notebook_name)
          //   .attr("id", "optGroup" + nt[i].Notebooks_Id)
          //   notebookName = nt[i].notebook_name;
          //   $("#notebookNotes").append(optGrp);
          // }

          // let opt = $("<option>").attr("value", nt[i].title).text(nt[i].title);
          // $("#optGroup" + nt[i].Notebooks_Id).append(opt);


          // $("#notebookNotes").trigger('contentChanged');

          if (notebookName !== nt[i].notebook_name) {
            notebookName = nt[i].notebook_name;
            nb_id = nt[i].Notebooks_Id;
            nb_name = nt[i].notebook_name;
            notesNb_id = nt[i].notesNb_Id;
            n_name = nt[i].title;

            notebookArr = [...this.state.notebookArr, {nb_id, nb_name}];
            notesArr = [...this.state.notesArr, {notesNb_id, n_name}];
            
          }
          
          this.setState({
              notebookArr,
              notesArr
            });

          // document.querySelectorAll('select').trigger('contentChanged');
          // let event = document.createEvent('HTMLEvents');
          // let elem = document.querySelectorAll('select');
          // event.initEvent('change', true, false);
          // elem.dispatchEvent(event);

        }
        console.log(notebookArr);
        console.log(notesArr);

      });
  }


  render(){


    let activePage = ""
    let recipePage = ""

    if(this.state.loggedIn === false){

      activePage = <Form logInClick={this.logInClick} signUpClick={this.signUpClick} handleClick={this.handleClick} />

    }else {
          
      // activePage = <Main value={this.state.value} handleSelectChange={this.handleSelectChange}/>
      activePage = <Main notesArr={this.state.notesArr} notebookArr={this.state.notebookArr} value={this.state.value} handleSelectChange={this.handleSelectChange}/>
      // console.log(activePage);
      console.log(`Selected recipe title: ${this.state.value}`);
        }

    if (this.state.recipeSelected === true) {

      // add values from notes table
      recipePage = <Notes notesTitle={this.state.value} />

    }

    return (
      <div className="App">
        <div className="container center-align">

         {activePage}
         {recipePage}

        </div>
      </div>
    );
  }
}
export default App;
