import React from 'react';
import './App.css';
// Import Materialize
// import M from "materialize-css";

const Notes = (props) => (

			<div className="container">
				<h2 className="text-center">{props.notesTitle}</h2>

				{props.notebookRecipesArr.map((content,ind) => {

					if (content.noteName === props.notesTitle) {

						return 	<div className="w-50 m-auto" key={`${ind}div`}>
									<h3>Ingredients</h3>
									<p key={`${ind}ingd`} className="ingredientPara"> {content.ingredients} </p>
									<h3>Instructions</h3>
									<p key={`${ind}inst`} className="instructionPara"> {content.instructions} </p>
									<img key={`${ind}img`} className="recipeImage" src={content.imageLink} alt={content.imageTitle} />
									<a key={`${ind}link`} className="recipeLink" href={content.sourceLink}> {content.sourceLink} </a>
									<br/>
									<button className="btn btn-md btn-primary m-2" type="button" onClick={props.editNote}>Edit</button>
			    					<button className="btn btn-md btn-primary m-2" type="button" onClick={props.deleteNote}>Delete</button>
								</div>

					}else {
						return null;
					}
					
			    })}   
			</div>
		);

export default Notes;