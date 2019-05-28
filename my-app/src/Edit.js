import React from 'react';
import './App.css';
// Import Materialize
// import M from "materialize-css";

const Edit = (props) => (

			<div>
				<nav>
				<button onClick={props.myRecipes}>My Recipes</button>
				<button onClick={props.logout}>Logout</button>
				</nav>

				<h2>Edit Recipe</h2>

				<label htmlFor="editTitle">Recipe Name</label>
				<input id="editTitle" type="text" name="value" value={props.recipeTitle} onChange={props.handleInputChange} /><br />

				<label htmlFor="editIngredients">Ingredients</label>
				<textarea id="editIngredients" rows="4" cols="50" name="ingredients" value={props.ingredients} onChange={props.handleInputChange}></textarea><br />
				
				<label htmlFor="editInstructions">Instructions</label>
				<textarea id="editInstructions" rows="10" cols="50" name="instructions" value={props.instructions} onChange={props.handleInputChange} onInput={props.handleCopyPaste} onCopy={props.handleCopyPaste} onPaste={props.handleCopyPaste} ></textarea><br />

				<label htmlFor="editImage">Image (optional)</label>
				<input id="editImage" type="text" name="imageLink" value={props.imageLink} onChange={props.handleInputChange} /><br />
				

				<label htmlFor="editSource">Reference Website link (optional)</label>
				<input id="editSource" type="text" name="sourceLink" value={props.sourceLink} onChange={props.handleInputChange} /><br />

				<button className="btn waves-effect waves-light" onClick={props.saveNote}>Save</button>
        		<button className="btn waves-effect waves-light" onClick={props.cancelNote}>Cancel</button>

			</div>
		);

export default Edit;