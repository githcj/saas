import React from 'react';
import '../assets/css/App.css';
import { Route, Redirect } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import { connect } from 'react-redux'
import Home from './viewIndex/Home'
import Login from './viewIndex/Login'

function App(props) {

	return (
		<div className="App">
			<Redirect from="/" exact to="/home" />
			<PrivateRoute path="/home" Component={Home} auth={props.token} />
			<Route path="/login" component={Login} />
		</div>
	);
}

function mapStateToProps(state) {
	const userReducer = state.userReducer
	return {
	  token: userReducer.token
	}
  }
  
  export default connect(
	mapStateToProps
  )(App)
