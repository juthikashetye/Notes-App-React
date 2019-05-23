import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Form from './Form';
import Main from './Main';
import Notes from './Notes';
import AddNote from './AddNote';
// import Nav from './Nav';
// Import Materialize
// import M from "materialize-css";

let name;
let pass;
let globalUserId;
// let globalName;
let notebookId;
let nb_id = "";
let nb_name = "";
let notesNb_id = "";
let n_name = "";
let notebookArr ="";
let notesArr = "";

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
      notebookId: 0,
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
    notebookId = parseInt(x.options[i].getAttribute("selectednotebookid"));
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

    if (event.target.selectedIndex !== 0) {

      let y = document.getElementById("existingNotebooks");
      let z = y.selectedIndex;
      let classofselect =  y.options[z].getAttribute("class");

      notebookId = parseInt(classofselect);
      console.log(notebookId);

      this.setState({
        notebookValue: event.target.value,
        notebookId: notebookId   
      });  

    }else {
      this.setState({
        notebookValue: event.target.value,
        notebookId: 0   
      });  
    }
  
  }

  // event handler for add new recipe button click
  addNewRecipe = (event) => {

    event.preventDefault();

    this.setState({
      recipeSelected: false,
      addingRecipe: true
    });
  }

  // event handler for createNote button click
  createNote = (event) => {

    let ntbks = document.getElementById("existingNotebooks").value;
    let newntbks = document.getElementById("newNotebook").value;
    let t = document.getElementById("noteHeading").value;
    let i = document.getElementById("noteIngredients").value;
    let it = document.getElementById("noteInstructions").value;
    let im = document.getElementById("noteImage").value;
    let s = document.getElementById("noteSource").value;


    if ((ntbks === "") && (newntbks === "")) {
      alert("Please select existing notebook from dropdown or create a new notebook.");
    }else if((ntbks !== "") && (newntbks !== "")){
      alert("Please fill only one of the fields marked as #");
    }else if ((t !== "") && (i !== "") && (it !== "")) {

      if (newntbks) {

        alert("added newnotebook");
    
        let ob = newntbks;
        console.log(ob);
        // console.log(JSON.stringify(ob));

        fetch(`/add-notebook/${globalUserId}`,{
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({notebook_name: ob}),
        })
        .then(response => response.json())
        .then(myJson => {

            console.log(myJson)

            nb_id = myJson;
            nb_name = newntbks;

            notebookArr = [...this.state.notebookArr, {nb_id, nb_name}];
            // notesArr = [...this.state.notesArr, {notesNb_id, n_name}];

            this.setState({
              notebookArr,
              notesArr,
              nb_name,
              n_name
            })
            console.log(notebookArr);

            fetch(`/add-notes/${nb_id}`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title : t,
                ingredients: i,
                instructions: it,
                image: im,
                source: s
              })
            }).then(res => res.json())
              .then(r => {
                console.log(r);

                notesNb_id = nb_id;
                n_name = t;

                // notebookArr = [...this.state.notebookArr, {nb_id, nb_name}];
                notesArr = [...this.state.notesArr, {notesNb_id, n_name}];

                this.setState({
                  notebookArr,
                  notesArr,
                  nb_name,
                  n_name
                })

                console.log(notesArr);

              });

            });
      }else if (ntbks) {
        alert("selected existing notebook");

        fetch(`/add-notes/${notebookId}`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                title : t,
                ingredients: i,
                instructions: it,
                image: im,
                source: s
              })
            }).then(res => res.json())
              .then(r => {
                console.log(r);

                notesNb_id = notebookId;
                n_name = t;

                // notebookArr = [...this.state.notebookArr, {nb_id, nb_name}];
                notesArr = [...this.state.notesArr, {notesNb_id, n_name}];

                this.setState({
                  notebookArr,
                  notesArr,
                  nb_name,
                  n_name
                })

                console.log(notesArr);

              });
      }
    }else {
      alert("Please fill all required fields.")
    }

    this.setState({
      notebookArr,
      notesArr,
      nb_name,
      n_name
    })

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

        notebookArr =[...this.state.notebookArr];
        notesArr = [...this.state.notesArr];

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

      activePage = <Form logInClick={this.logInClick} signUpClick={this.signUpClick} />

    }else if((this.state.loggedIn === true) && (this.state.addingRecipe === false)){

      activePage = <Main notesArr={this.state.notesArr} notebookArr={this.state.notebookArr} value={this.state.value} notebookId={this.state.notebookId} handleSelectChange={this.handleSelectChange} addNewRecipe={this.addNewRecipe}/>

      console.log(`Selected recipe title: ${this.state.value}`);
      console.log(`Selected recipe's notebookId: ${this.state.notebookId}`);
        }

    if (this.state.recipeSelected === true) {

      // add values from notes table
      recipePage = <Notes notesTitle={this.state.value} notebookRecipesArr={this.state.notebookRecipesArr} ingredients={this.state.ingredients}/>

    }else if (this.state.addingRecipe === true) {
      addRecipePage = <AddNote notebookArr={this.state.notebookArr} notebookValue={this.state.notebookValue} notebookId={this.state.notebookId} selectExistingBook={this.selectExistingBook} createNote={this.createNote}/>
      
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
