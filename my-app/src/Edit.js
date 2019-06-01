import React, {Component} from 'react';
import './App.css';

class Edit extends Component {

	componentDidMount() {

	// let textareaTag = document.getElementById("editInstructions");
 //    let att = document.createAttribute("onpaste");
 //    att.value = "return true";
 //    textareaTag.setAttributeNode(att);

 //    console.log(att.value);

	}

	render(){
		return (

			<div className="mt-0">
				
				<nav className="navbar navbar-light mt-0 p-3">
					<span className="navbar-brand m-auto mb-0 h1">Note-It</span>
					<button type="button" className="mr-3 btn btn-sm btn-success" onClick={this.props.myRecipes}>My Recipes</button>
					<button type="button" className="mr-3 btn btn-sm btn-danger" onClick={this.props.logout}>Logout</button>
				</nav>
				<div className="container-fluid header">
				</div>
				<div className="container editContainer">

					<h3 className="text-center">Edit Recipe</h3>

					<div className="editDetails m-auto">

						<form className="form">
							<div className="form-group">
							<label htmlFor="editTitle">Recipe Name</label>
							<input id="editTitle" type="text" className="form-control" name="value" value={this.props.recipeTitle} onChange={this.props.handleInputChange} /><br />
							</div>

							<div className="form-group">
							<label htmlFor="editIngredients">Ingredients</label>
							<textarea id="editIngredients" className="form-control" rows="4" cols="50" name="ingredients" value={this.props.ingredients} onChange={this.props.handleInputChange}></textarea><br />
							</div>

							<div className="form-group">
							<label htmlFor="editInstructions">Instructions</label>
							<textarea id="editInstructions" className="form-control" rows="10" cols="50" name="instructions" value={this.props.instructions} onChange={this.props.handleInputChange} ></textarea><br />
							</div>

							<div className="form-group">
							<label htmlFor="editImage">Image (optional)</label>
							<input id="editImage" className="form-control" type="text" name="imageLink" value={this.props.imageLink} onChange={this.props.handleInputChange} /><br />
							</div>

							<div className="form-group">
							<label htmlFor="editSource">Reference Website link (optional)</label>
							<input id="editSource" className="form-control" type="text" name="sourceLink" value={this.props.sourceLink} onChange={this.props.handleInputChange} /><br />
							</div>

							<button type="button" className="mr-3 btn btn-md btn-success" onClick={this.props.saveNote}>Save</button>
			        		<button type="button" className="mr-3 btn btn-md btn-danger" onClick={this.props.cancelNote}>Cancel</button>
		        		</form>

	        		</div>
	        		
        		</div>
        	
			</div>
		);
	}
}

export default Edit;