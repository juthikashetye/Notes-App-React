import React, { Component } from 'react';
import './App.css';
// Import Materialize
// import M from "materialize-css";

class AddNote extends Component {

	// constructor(props) {
 //    super(props);
  
 //  }
  
	componentDidMount() {

	}

	render(){
		return (

			<div>
				<h2>Add a New Recipe</h2>

				<label htmlFor="noteHeading">Recipe Name</label>
				<input id="noteHeading" type="text" placeholder="Title of new recipe" /><br />

				<label htmlFor="noteIngredients">Ingredients</label>
				<textarea id="noteIngredients" rows="4" cols="50" placeholder="Ingredients"></textarea><br />
				
				<label htmlFor="noteInstructions">Instructions</label>
				<textarea id="noteInstructions" rows="4" cols="50" placeholder="Instructions"></textarea><br />

				<label htmlFor="noteImage">Image (optional)</label>
				<input id="noteImage" type="text" placeholder="URL of image" /><br />
				

				<label htmlFor="noteSource">Reference Website link (optional)</label>
				<input id="noteSource" type="text" placeholder="URL of website" /><br />
				

				<h4>Please fill only one of the alternatives below.</h4>

				<label htmlFor="existingNotebooks"># Add recipe in existing Notebook</label>
				<select id="existingNotebooks" value={this.props.notebookValue} className={this.props.notebookId} onChange={this.props.selectExistingBook}>
			        	<option value="">Select a Notebook</option>

            			{this.props.notebookArr.map((optionGroup,ind) => {

                				return <option key={ind} className={optionGroup.nb_id} value={optionGroup.nb_name}>{optionGroup.nb_name}</option>
            				}
            			)}
        			</select><br />
				
				<span> OR </span><br />

				<label htmlFor="newNotebook"># Add recipe in a new notebook</label>
				<input id="newNotebook" type="text" placeholder="New notebook name" /><br />


			    <button className="btn waves-effect waves-light" id="createNote" onClick={this.props.createNote}>Create Note</button>
			    <button className="btn waves-effect waves-light" id="cancelNote">Cancel</button>
			</div>
		);
	}
}
export default AddNote;