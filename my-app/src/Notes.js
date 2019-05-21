import React, { Component } from 'react';
import './App.css';
// Import Materialize
// import M from "materialize-css";

class Notes extends Component {

	// constructor(props) {
 //    super(props);

    
 //  }
  
	componentDidMount() {

	}

	render(){
		return (

			<div>
				{/*<select id="notebookNotes" value={this.props.value} className={this.props.notebookId} onChange={this.props.handleSelectChange}>
			        	<option disabled={true} value="">Select a recipe</option>

            			{this.props.notebookArr.map((optionGroup,ind) => {

                				return <optgroup key={ind} label={optionGroup.nb_name}>

                        			{this.props.notesArr.map((option,ind) => {
                            			if(option.notesNb_id === optionGroup.nb_id){

                                			return <option key={ind} selectednotebookid={option.notesNb_id} value={option.n_name}> 
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
        			</select>*/}
				<h2>{this.props.notesTitle}</h2>
				
				{this.props.notebookRecipesArr.map((content,ind) => {
					if (content.noteName === this.props.notesTitle) {
						return 	<div>
									<p>{content.ingredients}</p>
									<p>{content.instructions}</p>
									<img src={content.imageLink} alt={content.imageTitle} />
									<a href={content.sourceLink}>{content.sourceLink}</a>
								</div>
					}else {
						return null;
					}
					
			    })}
			    <button className="btn waves-effect waves-light"><i className="material-icons left">{this.props.icon}</i>{this.props.buttonText}</button>
			    <button className="btn waves-effect waves-light"><i className="material-icons left">delete</i>Delete</button>
			</div>
		);
	}
}
export default Notes;