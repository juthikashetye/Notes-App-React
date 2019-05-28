import React from 'react';
import './App.css';
// Import Materialize
// import M from "materialize-css";

const Main = (props) => (

			<div className="text-center">
				<nav className="navbar navbar-light bg-light p-3">
				<span className="navbar-brand m-auto mb-0 h1">Note-It</span>
				<button type="button" className="mr-3 btn btn-sm btn-danger" onClick={props.logout}>Logout</button>
				</nav>
				<div className="container-fluid header">
				<div className="container m-auto row justify-content-md-center no-gutters">
				    
				    	<div className="col mb-3">
				      		<button className="btn btn-md btn-primary" type="button" onClick={props.addNewRecipe}>Add a new recipe</button>
				    	</div>

				      	<div className="col-md-9 col-lg-9 align-start input-group mb-3">
					        <select id="notebookNotes" value={props.value} selectednoteid={props.noteId} className={`${props.notebookId} custom-select custom-select-md`} onChange={props.handleSelectChange}>
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
		        			<div className="input-group-append">
    							<label className="input-group-text" htmlFor="notebookNotes">Recipe books</label>
  							</div>
				      	</div>
				      	
				    </div>
				</div>
			</div>
		);

export default Main;