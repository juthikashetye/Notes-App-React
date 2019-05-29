import React, {Component} from 'react';
import './App.css';
// Import Materialize
// import M from "materialize-css";

class Edit extends Component {

	// constructor(this.props) {
 //    super(this.props);

 //  }

	componentDidMount() {

	let textareaTag = document.getElementById("editInstructions");
    let att = document.createAttribute("onpaste");
    att.value = "return true";
    textareaTag.setAttributeNode(att);

    console.log(att.value);

	}

	render(){
		return (

			<div>
				<nav>
				<button onClick={this.props.myRecipes}>My Recipes</button>
				<button onClick={this.props.logout}>Logout</button>
				</nav>

				<h2>Edit Recipe</h2>

				<label htmlFor="editTitle">Recipe Name</label>
				<input id="editTitle" type="text" name="value" value={this.props.recipeTitle} onChange={this.props.handleInputChange} /><br />

				<label htmlFor="editIngredients">Ingredients</label>
				<textarea id="editIngredients" rows="4" cols="50" name="ingredients" value={this.props.ingredients} onChange={this.props.handleInputChange}></textarea><br />
				
				<label htmlFor="editInstructions">Instructions</label>
				<textarea id="editInstructions" rows="10" cols="50" name="instructions" value={this.props.instructions} onChange={this.props.handleInputChange} onInput={this.props.handleInputChange} onCopy={this.props.handleInputChange} onPaste={this.props.handleInputChange} ></textarea><br />

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