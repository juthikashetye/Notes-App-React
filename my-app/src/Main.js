import React from 'react';

//stateless component

const Main = (props) => (

	<>
		<h1>Notes App</h1>
	    <div className="row">
	      <div className="input-field col s6">
	        <select id="notebookNotes">
	          <option disabled={true} defaultValue>Select a recipe</option>
	        </select>
	        <label>Recipe books</label>
	      </div>
	      <button className="btn waves-effect waves-light"><i className="material-icons left">add_circle</i>Add a new recipe</button>
	    </div>
	</>
);
export default Main;