import React from 'react';
import { Component } from 'react';
import Clarifai from 'clarifai';
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

const app = new Clarifai.App({
 apiKey: 'e928102f5cda44748013e52fd47b9337'
});


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

class App extends Component { 
	constructor() {
		super();
		this.state = {
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
			this.setState({isSignedIn: false})
		};
		this.setState({route: route});
	}

	onButtonSubmit = (e) => {
	  this.setState({
	  	imageUrl: this.state.input
	  })	
	  app.models
	    .predict(
	  	  Clarifai.FACE_DETECT_MODEL, 
	  	  this.state.input)
	    .then(response => {	    	
	    	fetch('http://localhost:3000/image', {
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
	    	this.displayFaceBox(this.calculateFaceLocation(response))    	  	
	    })	    	
      	.catch(err => console.log(err));  	    
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
