import React, { Component } from 'react';
import './App.css';
// Import Materialize
// import M from "materialize-css";

class Edit extends Component {

	// constructor(props) {
 //    super(props);
 
 //  }
  
	componentDidMount() {

	}

	render(){
		return (

			<div>
				<label htmlFor="editTitle">Recipe Name</label>
				<input id="editTitle" type="text" name="value" value={this.props.recipeTitle} onChange={this.props.handleInputChange} /><br />

				<label htmlFor="editIngredients">Ingredients</label>
				<textarea id="editIngredients" rows="4" cols="50" name="ingredients" value={this.props.ingredients} onChange={this.props.handleInputChange}></textarea><br />
				
				<label htmlFor="editInstructions">Instructions</label>
				<textarea id="editInstructions" rows="4" cols="50" name="instructions" value={this.props.instructions} onChange={this.props.handleInputChange}></textarea><br />

				<label htmlFor="editImage">Image (optional)</label>
				<input id="editImage" type="text" name="imageLink" value={this.props.imageLink} onChange={this.props.handleInputChange} /><br />
				

				<label htmlFor="editSource">Reference Website link (optional)</label>
				<input id="editSource" type="text" name="sourceLink" value={this.props.sourceLink} onChange={this.props.handleInputChange} /><br />

				<button className="btn waves-effect waves-light" onClick={this.props.saveNote}>Save</button>
        		<button className="btn waves-effect waves-light" onClick={this.props.cancelNote}>Cancel</button>

			</div>
		);
	}
}
export default Edit;