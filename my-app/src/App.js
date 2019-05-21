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
let notebookId;

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn : false,
      value: "",
      recipeSelected: false,
      notebookArr: [],
      notesArr: [],
      notebookRecipesArr: [],
      globalUserId: 0,
      notebookId: "",
      noteName: "",
      instructions: "",
      ingredients: "",
      imageLink: "",
      sourceLink: "",
      n_name: "",
      nb_name:"" 
    }
  }
  
  componentDidMount() {

    this.getnotes(this.state.globalUserId);
    this.getnotebookNotes(notebookId);

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

    name = document.querySelector("#username").value
    console.log(name);   

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

    name = document.querySelector("#username").value
    console.log(name);   

    pass = document.querySelector("#password").value
    console.log(pass);

    if (name === "" || pass === "") {
        alert("Please fill required (*) fields.");
      }else {
        this.login(name,pass);
      }
  }

  handleSelectChange = (event) => {
    
    event.preventDefault();
    
    console.log(event.target.value);
    
    console.log(event.target.selectedIndex);

    let x = document.getElementById("notebookNotes");
    let i = x.selectedIndex;
    notebookId = x.options[i].getAttribute("selectednotebookid");
    console.log(notebookId);

    this.setState({
      recipeSelected: true,
      value: event.target.value,
      notebookId: notebookId
     
    });
    this.getnotebookNotes(notebookId);
  }

  getnotebookNotes = (id) => {

    fetch(`/get-notebook-notes/${id}`,{
      method: 'GET',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }

    }).then(recipe => recipe.json())
      .then(recipe => {

        console.log(recipe);
        
        let noteName;
        let instructions;
        let ingredients;
        let imageLink;
        let sourceLink;
        let notebookRecipesArr = [...this.state.notebookRecipesArr];

        for (let i = 0; i < recipe.length; i++) {

          if ((noteName !== recipe[i].title)||(!notebookRecipesArr.includes(recipe[i].title))) {

            noteName = recipe[i].title;
            instructions = recipe[i].instructions;
            ingredients = recipe[i].ingredients;
            imageLink = recipe[i].image;
            sourceLink = recipe[i].source;

            notebookRecipesArr = [...this.state.notebookRecipesArr,
                                  {noteName, instructions, ingredients, imageLink, sourceLink}];
            
          }else{
            notebookRecipesArr = [];
          }
          
          this.setState({
              notebookRecipesArr,
              noteName,
              instructions,
              ingredients,
              imageLink,
              sourceLink 
            });

        }
        console.log(notebookRecipesArr);

      });
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

        let nb_id = "";
        let nb_name = "";
        let notesNb_id = "";
        let n_name = "";
        let notebookArr =[...this.state.notebookArr];
        let notesArr = [...this.state.notesArr];

        for (let i = 0; i < nt.length; i++) {

          if (nb_name !== nt[i].notebook_name) {

            nb_name = nt[i].notebook_name;
            nb_id = nt[i].Notebooks_Id;
            // notesNb_id = nt[i].notesNb_Id;
            // n_name = nt[i].title;
            
            notebookArr = [...this.state.notebookArr, {nb_id, nb_name}];
            // notesArr = [...this.state.notesArr, {notesNb_id, n_name}];
   
          }

          this.setState({
            notebookArr,
            notesArr,
            nb_name,
            n_name
          });

          for (var nIndex = 0; nIndex < notebookArr.length; nIndex++) {

              if (n_name !== nt[i].title) {

                notesNb_id = nt[i].notesNb_Id;
                n_name = nt[i].title;
                notesArr = [...this.state.notesArr, {notesNb_id, n_name}];

              }
              this.setState({
                notebookArr,
                notesArr,
                nb_name,
                n_name
              });
              
            }

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
      activePage = <Main notesArr={this.state.notesArr} notebookArr={this.state.notebookArr} value={this.state.value} notebookId={this.state.notebookId} handleSelectChange={this.handleSelectChange}/>

      // console.log(activePage);

      console.log(`Selected recipe title: ${this.state.value}`);
      console.log(`Selected recipe's notebookId: ${this.state.notebookId}`);
        }

    if (this.state.recipeSelected === true) {

      // add values from notes table
      recipePage = <Notes notesTitle={this.state.value} notebookRecipesArr={this.state.notebookRecipesArr} ingredients={this.state.ingredients}/>

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
