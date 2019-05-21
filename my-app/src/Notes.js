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
				<h2>{this.props.notesTitle}</h2>

				{this.props.notebookRecipesArr.map((content,ind) => {

					if (content.noteName === this.props.notesTitle) {

						return 	<div key={`${ind}div`}>
									<p key={`${ind}ingd`} className="ingredientPara"> {content.ingredients} </p>
									<p key={`${ind}inst`} className="instructionPara"> {content.instructions} </p>
									<img key={`${ind}img`} className="recipeImage" src={content.imageLink} alt={content.imageTitle} />
									<a key={`${ind}link`} className="recipeLink" href={content.sourceLink}> {content.sourceLink} </a>
								</div>

					}else {
						return null;
					}
					
			    })}

			    <button className="btn waves-effect waves-light">{this.props.buttonText}</button>
			    <button className="btn waves-effect waves-light">Delete</button>
			</div>
		);
	}
}
export default Notes;