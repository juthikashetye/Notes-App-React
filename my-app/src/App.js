import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Main from './Main';
import Notes from './Notes';
import AddNote from './AddNote';
import Edit from './Edit';

let pass;
let globalUserId;
let globalName;
let notebookId;
let noteId;
let nb_id = "";
let nb_name = "";
let notesNb_id = "";
let n_name = "";
let notebookArr;
let notesArr;
let notebookRecipesArr;
let noteName;
let instructions;
let ingredients;
let imageLink;
let sourceLink;

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
      globalName: "",
      notebookId: 0,
      noteId: 0,
      // noteName: "",
      instructions: "",
      ingredients: "",
      imageLink: "",
      sourceLink: "",
      edit: false,
      delete: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleCopyPaste = this.handleCopyPaste.bind(this);
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

      // console.log(l);

      if (l.msg === "You are logged in.") {
        alert(l.msg);
        globalUserId = l.user_id;
        globalName = l.username;
        // console.log(globalUserId);
        this.setState({
          loggedIn: true,
          globalUserId: l.user_id,
          globalName: l.username
        });
        this.getnotes(globalUserId);
      }else {
        alert(l);
      }
    });  
  }

  logout = () => {

    fetch("/logout",{ 
    method: 'GET',
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    }).then(l => l.json())
      .then(l => {

      // console.log(l);
      this.setState ({
        loggedIn : false,
        value: "",
        notebookValue: "",
        recipeSelected: false,
        addingRecipe: false,
        notebookArr: [],
        notesArr: [],
        notebookRecipesArr: [],
        globalUserId: 0,
        globalName: "",
        notebookId: 0,
        noteId: 0,
        instructions: "",
        ingredients: "",
        imageLink: "",
        sourceLink: "",
        edit: false,
        delete: false 
      });

      // console.log(this.state.loggedIn);

    });
  }

  // event handler for signup button
  signUpClick = (event) => {

    event.preventDefault();

    globalName = document.querySelector("#username").value
    // console.log(globalName);   

    pass = document.querySelector("#password").value
    // console.log(pass);

    if (globalName === "" || pass === "") {
        alert("Please fill required (*) fields.");
      }else {
        this.signup(globalName,pass);
      } 
  }

  // event handler for login button
  logInClick = (event) => {

    event.preventDefault();

    globalName = document.querySelector("#username").value
    // console.log(globalName);   

    pass = document.querySelector("#password").value
    // console.log(pass);

    if (globalName === "" || pass === "") {
        alert("Please fill required (*) fields.");
      }else {
        this.login(globalName,pass);
      }
  }

  // event handler for select tag changes on main page
  handleSelectChange = (event) => {
    
    event.preventDefault();
    
    // console.log(event.target.value);
    
    // console.log(event.target.selectedIndex);
    
    let x = document.getElementById("notebookNotes");
    let i = x.selectedIndex;
    notebookId = parseInt(x.options[i].getAttribute("selectednotebookid"));
    noteId = parseInt(x.options[i].getAttribute("selectednoteid"));
    // console.log(notebookId);
    // console.log("in handle select change" + noteId);

    if (!((isNaN(notebookId)) || (isNaN(noteId)) || (notebookId ===0) || (noteId ===0))) {

      this.setState({
        recipeSelected: true,
        addingRecipe: false,
        value: event.target.value,
        notebookId: notebookId,
        notebookRecipesArr: [],
        noteId: noteId,
        delete: false
      });

      this.getnotebookNotes(notebookId);
    }
 
  }

  // event handler for notebook selection on adding new recipe page
  selectExistingBook = (event) => {
    
    event.preventDefault();

    // console.log(`Selected existing notebook name: ${event.target.value}`);
    
    // console.log(event.target.selectedIndex);

    if (event.target.selectedIndex !== 0) {

      let y = document.getElementById("existingNotebooks");
      let z = y.selectedIndex;
      let classofselect =  y.options[z].getAttribute("class");

      notebookId = parseInt(classofselect);
      // console.log(notebookId);

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
      addingRecipe: true,
      notebookId: 0,
      delete: false
    });
  }

  // event handler for My recipes button click
  myRecipes = (event) => {
    event.preventDefault();

    this.setState({
      recipeSelected: true,
      addingRecipe: false,
      edit: false,
      notebookId,
      noteId,
      delete: true
    });
  }

  // event handler for cancel button click
  cancelNote = (event) => {
    event.preventDefault();

    this.setState({
      notebookRecipesArr,
      recipeSelected: true,
      addingRecipe: false,
      edit: false,
      notebookId,
      noteId,
      delete: false
    });
  }

  // event handler for edit button click
  editNote = (event) => {
    event.preventDefault();

    noteId = this.state.noteId;

     this.setState({
      edit: true,
      delete: false
    });

    fetch(`/get-note/${noteId}`,{ 
      method: 'GET',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      }).then(recipeDetails => recipeDetails.json())
        .then(recipeDetails => {

        // console.log(recipeDetails);

        this.setState({
          value: recipeDetails[0].title,
          imageLink: recipeDetails[0].image,
          ingredients: recipeDetails[0].ingredients,
          instructions: recipeDetails[0].instructions,
          sourceLink: recipeDetails[0].source
        });

    });

  }

  // event handler for save button click
  updateNote = (event) => {

    event.preventDefault();
    noteId = this.state.noteId;

    let t = document.getElementById("editTitle").value;
    let i = document.getElementById("editIngredients").value;

    let it = document.getElementById("editInstructions").value;
    console.log(it);
    let im = document.getElementById("editImage").value;
    let s = document.getElementById("editSource").value;

    fetch(`/recipe-update/${noteId}`,{ 
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
      }),
    }).then(recipeDetails => recipeDetails.json())
      .then(recipeDetails => {

        // console.log(recipeDetails);

        noteId = this.state.noteId;
        noteName = t;
        instructions = it;
        ingredients = i;
        imageLink = im;
        sourceLink = s;

        notebookRecipesArr = [...this.state.notebookRecipesArr];

        for (var j = notebookRecipesArr.length - 1; j >= 0; j--) {
          if(notebookRecipesArr[j].noteId === noteId){
            notebookRecipesArr[j] = {noteId, noteName, instructions, ingredients, imageLink, sourceLink};
          }
        }

        this.setState({
          notebookRecipesArr,
          recipeSelected: true,
          addingRecipe: false,
          edit: false,
          notebookId,
          noteId,
          delete: false
        });

      console.log(notebookRecipesArr);

    });
  
}

// event handler for delete button click
  deleteNote = (event) => {
    event.preventDefault();

    noteId = this.state.noteId;

     this.setState({
      edit: false
    });

    fetch(`/recipe-delete/${noteId}`,{ 
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      }).then(recipe => recipe.json())
        .then(recipe => {

        // console.log(recipe);

        noteId = this.state.noteId;

        notebookRecipesArr = [...this.state.notebookRecipesArr];
        notesArr = [...this.state.notesArr];

        for (var j = notebookRecipesArr.length - 1; j >= 0; j--) {
          if(notebookRecipesArr[j].noteId === noteId){
            notebookRecipesArr.splice(j,1);
          }
        }

        for (var x = notesArr.length - 1; x >= 0; x--) {
          if(notesArr[x].noteId === noteId){
            notesArr.splice(x,1);
          }
        }

        this.setState({
          notebookRecipesArr,
          notesArr,
          recipeSelected: false,
          addingRecipe: false,
          edit: false,
          delete: true
        });

        // console.log("After deleting recipe notebookRecipesArr:",notebookRecipesArr);
        // console.log("After deleting recipe notesArr:",notesArr);

    });

  }

  // event handler for edit page input
  handleInputChange(event) {

    event.preventDefault();

    const newInputValue = event.target.value;
    const name = event.target.name;
    
    this.setState({
      [name]: newInputValue
    });

    // console.log(newInputValue);
    // console.log(name);

    // this.setState({
    //   value: document.getElementById("editTitle").value,
    //   instructions: document.getElementById("editInstructions").value,
    //   ingredients: document.getElementById("editIngredients").value,
    //   imageLink: document.getElementById("editImage").value,
    //   sourceLink: document.getElementById("editSource").value
    // });

    // console.log(this.state.instructions);
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

    notebookArr = [...this.state.notebookArr];
    notesArr = [...this.state.notesArr];

    const checkNotebookName = obj => obj.nb_name === newntbks;
    const checkRecipeName = robj => robj.n_name === t;


    if ((t === "") || (i === "") || (it === "")) {
      alert("Please fill all required fields.");
    }else if ((ntbks === "") && (newntbks === "")) {
      alert("Please select existing notebook from dropdown or create a new notebook.");
    }else if((ntbks !== "") && (newntbks !== "")){
      alert("Please fill only one of the fields marked as #");
    }else if ((t !== "") && (i !== "") && (it !== "")) {

      if (newntbks) {

        if ((notebookArr.some(checkNotebookName) === true) && (notesArr.some(checkRecipeName) === true)) {
          alert("The recipe and notebook name already exist. Please give some other names.");
        }else if(notebookArr.some(checkNotebookName) === true){
          alert("Notebook name already exists. Please give another name or select from existing notebooks.");
        }else if(notesArr.some(checkRecipeName) === true){
          alert("Recipe name already exists. Please give another name.");
        }else if ((notebookArr.some(checkNotebookName) === false) && (notesArr.some(checkRecipeName) === false)){

            let ob = newntbks;
            // console.log(ob);

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

                // console.log(myJson)

                nb_id = myJson;
                nb_name = newntbks;

                notebookArr = [...this.state.notebookArr, {nb_id, nb_name}];

                this.setState({
                  notebookArr,
                  notesArr
                });
                // console.log(notebookArr);

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
                    // console.log(r);

                    noteId = r;
                    notesNb_id = nb_id;
                    n_name = t;

                    notesArr = [...this.state.notesArr, {noteId, notesNb_id, n_name}];

                    this.setState({
                      notebookArr,
                      notesArr
                    });

                    // console.log(notesArr);
                });    
            });
            alert(`Created new notebook ${newntbks} and added ${t} recipe in it successfully.`);

            document.getElementById("existingNotebooks").value = "";
            document.getElementById("newNotebook").value = "";
            document.getElementById("noteHeading").value = "";
            document.getElementById("noteIngredients").value = "";
            document.getElementById("noteInstructions").value = "";
            document.getElementById("noteImage").value = "";
            document.getElementById("noteSource").value = "";      
        }      
      }else if (ntbks) {
        if ((notesArr.some(checkRecipeName) === true)) {
          alert("Recipe name already exists. Please give another name.");
        }else {
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
              .then(newNoteId => {
                // console.log(newNoteId);

                noteId = newNoteId;
                notesNb_id = notebookId;
                n_name = t;

                notesArr = [...this.state.notesArr, {noteId, notesNb_id, n_name}];

                this.setState({
                  notebookArr,
                  notesArr
                });
                // console.log(notesArr);
              });
              alert(`${t} recipe added to ${ntbks} notebook successfully`);

              document.getElementById("existingNotebooks").value = "";
              document.getElementById("newNotebook").value = "";
              document.getElementById("noteHeading").value = "";
              document.getElementById("noteIngredients").value = "";
              document.getElementById("noteInstructions").value = "";
              document.getElementById("noteImage").value = "";
              document.getElementById("noteSource").value = "";   
        } 
      }
    }
      this.setState({
        notebookArr,
        notesArr
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

        // console.log(recipe);

        notebookRecipesArr = [...this.state.notebookRecipesArr];

        for (let i = 0; i < recipe.length; i++) {

          if ((noteName !== recipe[i].title)||(!notebookRecipesArr.includes(recipe[i].title))) {

            noteId = recipe[i].id;
            noteName = recipe[i].title;
            instructions = recipe[i].instructions;
            ingredients = recipe[i].ingredients;
            imageLink = recipe[i].image;
            sourceLink = recipe[i].source;

            notebookRecipesArr = [...this.state.notebookRecipesArr,
                                  {noteId, noteName, instructions, ingredients, imageLink, sourceLink}];

           } 
          this.setState({
              notebookRecipesArr
            });
        }
        // console.log(notebookRecipesArr);

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

        // console.log(nt);

        notebookArr =[...this.state.notebookArr];
        notesArr = [...this.state.notesArr];

        for (let i = 0; i < nt.length; i++) {

          if (nb_name !== nt[i].notebook_name) {

            nb_name = nt[i].notebook_name;
            nb_id = nt[i].Notebooks_Id;
            
            notebookArr = [...this.state.notebookArr, {nb_id, nb_name}];
   
          }

          this.setState({
            notebookArr,
            notesArr
          });

          for (var nIndex = 0; nIndex < notebookArr.length; nIndex++) {

              if (n_name !== nt[i].title) {

                notesNb_id = nt[i].notesNb_Id;
                n_name = nt[i].title;
                noteId = nt[i].Notes_Id;
                notesArr = [...this.state.notesArr, {noteId, notesNb_id, n_name}];

              }
              this.setState({
                notebookArr,
                notesArr
              });
              
            }
        }
        // console.log(notebookArr);
        // console.log(notesArr);

      });
  }

  render(){

    let activePage = ""
    let recipePage = ""
    let addRecipePage = ""
    

    if(this.state.loggedIn === false){

      activePage = <Form logInClick={this.logInClick} signUpClick={this.signUpClick} />

    }else if((this.state.loggedIn === true) && (this.state.addingRecipe === false) && (this.state.edit === false)){

      activePage = <Main notesArr={this.state.notesArr} notebookArr={this.state.notebookArr} value={this.state.value} notebookId={this.state.notebookId} noteId={this.state.noteId} handleSelectChange={this.handleSelectChange} addNewRecipe={this.addNewRecipe} logout={this.logout}/>

      // console.log(`Selected recipe title: ${this.state.value}`);
      // console.log(`Selected recipe's notebookId: ${this.state.notebookId}`);
      // console.log(`Selected recipe's noteId: ${this.state.noteId}`);
    }

    if (this.state.recipeSelected === true) {
      if ((this.state.edit === false) && (this.state.delete === false)) {

        // add values from notes table
        recipePage = <Notes notesTitle={this.state.value} notebookRecipesArr={this.state.notebookRecipesArr} editNote={this.editNote} deleteNote={this.deleteNote} />

      }else if (this.state.edit === true) {

        // add values from notes table
        activePage = <Edit recipeTitle={this.state.value} ingredients={this.state.ingredients} instructions={this.state.instructions} imageLink={this.state.imageLink} sourceLink={this.state.sourceLink} saveNote={this.updateNote} cancelNote={this.cancelNote} myRecipes={this.myRecipes} logout={this.logout} handleInputChange={this.handleInputChange} />
        // console.log(this.state.ingredients);
        // console.log(this.state.instructions);

      }else if ((this.state.delete === true) && (this.state.edit === false)){
        recipePage = 
        <div className="container mx-auto mt-5 mb-5">
          <p className="text-center message">Explore more by selecting a recipe or create something new.</p>
        </div>
      }

    }else if (this.state.addingRecipe === true) {
      addRecipePage = <AddNote notebookArr={this.state.notebookArr} notebookValue={this.state.notebookValue} notebookId={this.state.notebookId} selectExistingBook={this.selectExistingBook} createNote={this.createNote} myRecipes={this.myRecipes} logout={this.logout}/>
      
      // console.log(`Selected notebook: ${this.state.notebookValue}`);
      // console.log(`Selected notebook's notebookId: ${this.state.notebookId}`);

    }else if ((this.state.recipeSelected === false) && (this.state.loggedIn === true) && (this.state.delete === false)){
      recipePage = 
      <div className="container mx-auto mt-5 mb-5">
        <p className="text-center message">Welcome {this.state.globalName}! Start by selecting a recipe or create something new today.</p>
      </div>
    }else if ((this.state.recipeSelected === false) && (this.state.loggedIn === true) && (this.state.delete === true)){
      recipePage = 
      <div className="container mx-auto mt-5 mb-5">
        <p className="text-center message">Deleted recipe successfully. Explore more by selecting a recipe or create something new.</p>
      </div>
    }

    return (
      <div className="App">
        

         {activePage}
         {recipePage}
         {addRecipePage}

        <footer className="footer mt-auto py-3 text-center">
          <div className="container">
            <small className="footerColor text-center">Copyright &copy; 2019 <a href="https://juthikashetye.github.io/Updated-Portfolio-Page/" target="_blank" rel="noopener noreferrer" title="Visit Juthika's Portfolio">Juthika Shetye</a>. All rights reserved.</small>
          </div>
        </footer>
      </div>
    );
  }
}
export default App;
