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

				<label htmlFor="noteHeading">Recipe Name</label><br />
				<input id="noteHeading" type="text" placeholder="Title of new recipe" /><br />

				<label htmlFor="noteIngredients">Ingredients</label><br />
				<textarea id="noteIngredients" rows="4" cols="50" placeholder="Ingredients"></textarea><br />
				
				<label htmlFor="noteInstructions">Instructions</label><br />
				<textarea id="noteInstructions" rows="4" cols="50" placeholder="Instructions"></textarea><br />

				<label htmlFor="noteImage">Image</label><br />
				<input id="noteImage" type="text" placeholder="URL of image" /><br />

				<label htmlFor="noteSource">Reference Website link</label><br />
				<input id="noteSource" type="text" placeholder="URL of website" /><br />

				<label htmlFor="newNotebook">Add recipe in a new notebook</label><br />
				<input id="newNotebook" type="text" placeholder="New notebook name" /><br />
				<span> OR </span><br />

				<label htmlFor="existingNotebooks">Add recipe in existing Notebook</label><br />
				<select id="existingNotebooks" value={this.props.notebookValue} className={this.props.notebookId} onChange={this.props.selectExistingBook}>
			        	<option disabled={true} value="">Select a Notebook</option>

            			{this.props.notebookArr.map((optionGroup,ind) => {

                				return <option key={ind} className={optionGroup.nb_id} value={optionGroup.nb_name}>{optionGroup.nb_name}</option>
            				}
            			)}
        			</select><br />

			    <button className="btn waves-effect waves-light">Save</button>
			    <button className="btn waves-effect waves-light">Cancel</button>
			</div>
		);
	}
}
export default AddNote;