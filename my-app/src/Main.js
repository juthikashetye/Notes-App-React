import React, { Component } from 'react';
import './App.css';
// Import Materialize
// import M from "materialize-css";

class Main extends Component {

	// constructor(props) {
 //    super(props);

    
 //  }
  
	componentDidMount() {

	}

	render(){
		return (
			<div>
				<h1>Notes App</h1>
			    <div className="row">
			      <div className="input-field col s6">
			      
			        {/*<select id="notebookNotes" value={this.props.value} onChange={this.props.handleSelectChange}>
			          <option disabled={true} value="">Select a recipe</option>
			          <optgroup label="nuts">
			          <option value="coconut">coconut</option>
			          <option value="lime">lime</option>
			          </optgroup>
			        </select>
			        <label>Recipe books</label>*/}

			        <select id="notebookNotes" value={this.props.value} className={this.props.notebookId} onChange={this.props.handleSelectChange}>
			        	<option disabled={true} value="">Select a recipe</option>

            			{this.props.notebookArr.map((optionGroup,ind) => {

                				return <optgroup key={`${optionGroup.nb_id}key`} label={optionGroup.nb_name}>

                        			{this.props.notesArr.map((option,ind) => {
                            			if(option.notesNb_id === optionGroup.nb_id){

                                			return <option key={option.notesNb_id} selectednotebookid={option.notesNb_id} value={option.n_name}> 
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

			      <button className="btn waves-effect waves-light"><i className="material-icons left">add_circle</i>Add a new recipe</button>
			    </div>
			</div>
		);
	}
}
export default Main;