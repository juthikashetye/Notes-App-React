import React from 'react';
import './App.css';
// Import Materialize
// import M from "materialize-css";

const Main = (props) => (

			<div>
				<nav>
				<button onClick={props.logout}>Logout</button>
				</nav>

				<h1>Notes App</h1>
			    <div className="row">
			      <div className="input-field col s6">

			        <select id="notebookNotes" value={props.value} selectednoteid={props.noteId} className={props.notebookId} onChange={props.handleSelectChange}>
			        	<option disabled={true} value="">Select a recipe</option>

            			{props.notebookArr.map((optionGroup,ind) => {

                				return <optgroup key={ind} label={optionGroup.nb_name}>

                        			{props.notesArr.map((option,ind) => {
                            			if(option.notesNb_id === optionGroup.nb_id){

                                			return <option key={ind} selectednoteid={option.noteId} selectednotebookid={option.notesNb_id} value={option.n_name}> 
                                        				{option.n_name}
                                    				</option>
                        				
                    					}else {
                    						return null;
                    					}
                    				}
                    			)}
                    			</optgroup>
            				}
            			)}
        			</select>
        			<label>Recipe books</label>
			      </div>

			      <button className="btn waves-effect waves-light" onClick={props.addNewRecipe}>Add a new recipe</button>
			    </div>
			</div>
		);

export default Main;