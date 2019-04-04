import React, { Component } from 'react';
import ErrorBoundry from '../error-boundry';

export default class App extends Component {

	render() {
		return (
			<ErrorBoundry>
				<div>Error!</div>
			</ErrorBoundry>
		)
	}

}