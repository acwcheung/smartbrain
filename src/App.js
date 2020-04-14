import React from 'react';
import { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
import './App.css';
import 'tachyons';



const particlesOptions = {
    particles: {
	  number: {
	  	value: 30,
	  	density: {
	  	  enable: true,
	  	  value_area: 800	
	  	}
	  }	
	}
}

const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: '',
		joined: ''
	}
}


class App extends Component { 
	constructor() {
		super();
		this.state = initialState;
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
		  leftCol: clarifaiFace.left_col * width,
		  topRow: clarifaiFace.top_row * height,
		  rightCol: width - (clarifaiFace.right_col * width),
		  bottomRow: height - (clarifaiFace.bottom_row * height)	
		}
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		})
	}

	displayFaceBox = (box) => {
		this.setState({box: box});
	}

	onInputChange = (e) => {
		this.setState({input: e.target.value});
	}

	onRouteChange = (route) => {
		if(route === 'home') {
			this.setState({isSignedIn: true})
		} else {
			this.setState(initialState)
		};
		this.setState({route: route});
	}

	onButtonSubmit = (e) => {
	  this.setState({imageUrl: this.state.input})
	  fetch('https://rocky-waters-83290.herokuapp.com/imageURL', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			input: this.state.input
		})
	  })
	  .then(response => response.json())
	    .then(response => {
	    	if(response) {
	    	  fetch('https://rocky-waters-83290.herokuapp.com/image', {
  				method: 'put',
  				headers: {'Content-Type': 'application/json'},
  				body: JSON.stringify({
  					id: this.state.user.id
  				})
  			  })
  			  .then(response => response.json())
  			  .then(count => {
  			  	this.setState(Object.assign(this.state.user, { entries: count }))
  			  })
  			  .catch(err => console.log(err))	    
	    	}
	    	this.displayFaceBox(this.calculateFaceLocation(response))    	  			
	    })     	
	}

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state
		return (
	    <div className="App">
	      <Particles className='particles'
	        params={particlesOptions} 
	      />
	      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
	      { route === 'home'
	      	? <div>
	      		<Logo />
	      		<Rank 
	      		  name={this.state.user.name}
	      		  entries={this.state.user.entries}
	      		/>
			    <ImageLinkForm 
			      onInputChange={this.onInputChange}
			      onButtonSubmit={this.onButtonSubmit}
			    />
			    <FaceRecognition 
			      imageUrl={imageUrl}
			      box={box} 
			    />
	      	  </div>
	      	: ( route === 'signin'
	      		? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
	      		: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
	      	)  	      	 
	  	  }	      
	    </div>
	  );
	}
  

}




export default App;
