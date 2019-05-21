import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Form from './Form';
import Main from './Main';
import Notes from './Notes';
import AddNote from './AddNote';
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
      notebookValue: "",
      recipeSelected: false,
      addingRecipe: false,
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

  // testing function
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

  // event handler for select tag changes on main page
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
      addingRecipe: false,
      value: event.target.value,
      notebookId: notebookId,
      notebookRecipesArr: []
    });

    this.getnotebookNotes(notebookId);
  }

  // event handler for notebook selection on adding new recipe page
  selectExistingBook = (event) => {
    
    event.preventDefault();

    console.log(`Selected existing notebook name: ${event.target.value}`);
    
    console.log(event.target.selectedIndex);

    let y = document.getElementById("existingNotebooks");
    let z = y.selectedIndex;
    notebookId = y.options[z].getAttribute("class");
    console.log(notebookId);

    this.setState({
      notebookValue: event.target.value,
      notebookId: notebookId   
    });  
  }

  // event handler for add new recipe button click
  addNewRecipe = (event) => {

    event.preventDefault();

    this.setState({
      recipeSelected: false,
      addingRecipe: true
    });
  }

  // gets notes for a specific notebook
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

  // gets notebook name and note name for active user
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
    let addRecipePage = ""

    if(this.state.loggedIn === false){

      activePage = <Form logInClick={this.logInClick} signUpClick={this.signUpClick} handleClick={this.handleClick} />

    }else if((this.state.loggedIn === true) && (this.state.addingRecipe === false)){

      activePage = <Main notesArr={this.state.notesArr} notebookArr={this.state.notebookArr} value={this.state.value} notebookId={this.state.notebookId} handleSelectChange={this.handleSelectChange} addNewRecipe={this.addNewRecipe}/>


      console.log(`Selected recipe title: ${this.state.value}`);
      console.log(`Selected recipe's notebookId: ${this.state.notebookId}`);
        }

    if (this.state.recipeSelected === true) {

      // add values from notes table
      recipePage = <Notes notesTitle={this.state.value} notebookRecipesArr={this.state.notebookRecipesArr} ingredients={this.state.ingredients}/>

    }else if (this.state.addingRecipe === true) {
      addRecipePage = <AddNote notebookArr={this.state.notebookArr} notebookValue={this.state.notebookValue} notebookId={this.state.notebookId} selectExistingBook={this.selectExistingBook}/>
      
      console.log(`Selected notebook: ${this.state.notebookValue}`);
      console.log(`Selected notebook's notebookId: ${this.state.notebookId}`);
    }

    return (
      <div className="App">
        <div className="container center-align">

         {activePage}
         {recipePage}
         {addRecipePage}

        </div>
      </div>
    );
  }
}
export default App;
