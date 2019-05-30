import React from 'react';
import './App.css';
// Import Materialize
// import M from "materialize-css";

const Notes = (props) => (

			<div className="container notesContainer mx-auto">
				<h2 className="text-center recipeHeading">{props.notesTitle}</h2>

				{props.notebookRecipesArr.map((content,ind) => {

					if (content.noteName === props.notesTitle) {

						return 	<div className="recipeDetails m-auto clearfix" key={`${ind}div`}>
									<h3>Ingredients</h3>
									<p key={`${ind}ingd`} className="ingredientPara"> {content.ingredients} </p>
									<h3>Instructions</h3>
									<p key={`${ind}inst`} className="instructionPara"> <img key={`${ind}img`} className="recipeImage rounded-lg" src={content.imageLink} alt={content.imageTitle} /> {content.instructions} </p>
									<a key={`${ind}link`} className="recipeLink" href={content.sourceLink}> {content.sourceLink} </a>
									<br/>
									<button className="btn btn-md btn-success m-2 editButton" type="button" onClick={props.editNote}>Edit</button>
			    					<button className="btn btn-md btn-danger m-2 deleteButton" type="button" onClick={props.deleteNote}>Delete</button>
								</div>

					}else {
						return null;
					}
					
			    })}   
			</div>
		);

export default Notes;