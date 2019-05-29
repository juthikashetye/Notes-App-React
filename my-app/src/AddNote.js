import React from 'react';
import './App.css';
// import Nav from './Nav';
// Import Materialize
// import M from "materialize-css";

const AddNote = (props) => (

			<div>
				
				<nav>
				<button onClick={props.myRecipes}>My Recipes</button>
				<button onClick={props.logout}>Logout</button>
				</nav>

				<h2>Add a New Recipe</h2>

				<label htmlFor="noteHeading">Recipe Name</label>
				<input id="noteHeading" type="text" placeholder="Title of new recipe" /><br />

				<label htmlFor="noteIngredients">Ingredients</label>
				<textarea id="noteIngredients" rows="10" cols="50" placeholder="Ingredients"></textarea><br />
				
				<label htmlFor="noteInstructions">Instructions</label>
				<textarea id="noteInstructions" rows="10" cols="50" placeholder="Instructions"></textarea><br />

				<label htmlFor="noteImage">Image (optional)</label>
				<input id="noteImage" type="text" placeholder="URL of image" /><br />
				

				<label htmlFor="noteSource">Reference Website link (optional)</label>
				<input id="noteSource" type="text" placeholder="URL of website" /><br />
				

				<h4>Please fill only one of the alternatives below.</h4>

				<label htmlFor="existingNotebooks"># Add recipe in existing Notebook</label>
				<select id="existingNotebooks" value={props.notebookValue} className={props.notebookId} onChange={props.selectExistingBook}>
			        	<option value="">None Selected</option>

            			{props.notebookArr.map((optionGroup,ind) => {

                				return <option key={ind} className={optionGroup.nb_id} value={optionGroup.nb_name}>{optionGroup.nb_name}</option>
            				}
            			)}
        			</select><br />
				
				<span> OR </span><br />

				<label htmlFor="newNotebook"># Add recipe in a new notebook</label>
				<input id="newNotebook" type="text" placeholder="New notebook name" /><br />


			    <button className="btn waves-effect waves-light" id="createNote" onClick={props.createNote}>Create Note</button>
			</div>
		);

export default AddNote;