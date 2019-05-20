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
				<p>{this.props.ingredients}</p>
				<p>{this.props.instructions}</p>
				<img src={this.props.imageLink} alt={this.props.imageTitle} />
				<a href={this.props.sourceLink}>{this.props.sourceLink}</a>
			    
			    <button className="btn waves-effect waves-light"><i className="material-icons left">{this.props.icon}</i>{this.props.buttonText}</button>
			    <button className="btn waves-effect waves-light"><i className="material-icons left">delete</i>Delete</button>
			</div>
		);
	}
}
export default Notes;