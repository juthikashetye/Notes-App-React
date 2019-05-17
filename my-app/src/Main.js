import React, { Component } from 'react';
import './App.css';
// Import Materialize
import M from "materialize-css";

class Main extends Component {
  
	componentDidMount() {

	    M.AutoInit();

	    var options = {};

	    var elems = document.querySelectorAll('select');
	    M.FormSelect.init(elems, options);

	    // made for testing what this is
	    fetch("/get-all-notebooks/1") //this returns a string
	        .then(res => res.json()) //we convert that string to json and return it
	        .then(notebooks => this.setState({notebooks})
	        ) //then we throw that notebooks json into the state

	}

	render(){
		return (
			<div>
				<h1>Notes App</h1>
			    <div className="row">
			      <div className="input-field col s6">
			        <select id="notebookNotes">
			          <option value="" disabled={true}>Select a recipe</option>
			        </select>
			        <label>Recipe books</label>
			      </div>
			      <button className="btn waves-effect waves-light"><i className="material-icons left">add_circle</i>Add a new recipe</button>
			    </div>
			</div>
		);
	}
}
export default Main;