import React from 'react';

import './index.scss';
// import icon from './error.png';

const ErrorIndicator = () => {
	return (
		<div className="error-indicator">
			<img src='' alt="error-icon"/>
			<span className="boom">BOOM!</span>
			<span>
				something has gone wrong
			</span>
			<span>
				(but we have already sent droids to fix it)
			</span>
		</div>
	)
};

export default ErrorIndicator;