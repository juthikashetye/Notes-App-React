import React from 'react';
import './App.css';
// import Nav from './Nav';
// Import Materialize
// import M from "materialize-css";

const AddNote = (props) => (

			<div className="mt-0">
				
				<nav className="navbar navbar-light mt-0 p-3">
				<span className="navbar-brand m-auto mb-0 h1">Note-It</span>
				<button type="button" className="mr-3 btn btn-sm btn-success" onClick={props.myRecipes}>My Recipes</button>
				<button type="button" className="mr-3 btn btn-sm btn-danger" onClick={props.logout}>Logout</button>
				</nav>
				<div className="container-fluid header">
				</div>

				<div className="container addContainer">

					<h3 className="text-center">Add a New Recipe</h3>

					<div className="editDetails m-auto">

						<form className="form">
							<div className="form-group">
							<label htmlFor="noteHeading">Recipe Name</label>
							<input id="noteHeading" className="form-control" type="text" placeholder="Title of new recipe" /><br />
							</div>

							<div className="form-group">
							<label htmlFor="noteIngredients">Ingredients</label>
							<textarea id="noteIngredients" className="form-control" rows="6" cols="50" placeholder="Ingredients"></textarea><br />
							</div>

							<div className="form-group">
							<label htmlFor="noteInstructions">Instructions</label>
							<textarea id="noteInstructions" className="form-control" rows="10" cols="50" placeholder="Instructions"></textarea><br />
							</div>

							<div className="form-group">
							<label htmlFor="noteImage">Image (optional)</label>
							<input id="noteImage" className="form-control" type="text" placeholder="URL of image" /><br />
							</div>

							<div className="form-group">
							<label htmlFor="noteSource">Reference Website link (optional)</label>
							<input id="noteSource" className="form-control" type="text" placeholder="URL of website" /><br />
							</div>

							<h5>Please fill only one of the alternatives below.</h5>

							
							<label className="bookLabel p-1" htmlFor="existingNotebooks"># Add recipe in existing Notebook</label>
							<select id="existingNotebooks" value={props.notebookValue} className={`${props.notebookId} custom-select custom-select-md`} onChange={props.selectExistingBook}>
						        	<option value="">None Selected</option>

			            			{props.notebookArr.map((optionGroup,ind) => {

			                				return <option key={ind} className={optionGroup.nb_id} value={optionGroup.nb_name}>{optionGroup.nb_name}</option>
			            				}
			            			)}
			        			</select><br />

							<p className="text-center font-weight-bold font-italic mt-2"> OR </p>

							<label htmlFor="newNotebook" className="bookLabel p-1 mr-1"># Add recipe in a new notebook</label>
							<input id="newNotebook" type="text" placeholder="New notebook name" /><br />

						    <button id="createNote" className="btn btn-md btn-success m-2" type="button" onClick={props.createNote}>Create Note</button>
			    		</form>
			    	</div>
			    </div>
			</div>
		);

export default AddNote;