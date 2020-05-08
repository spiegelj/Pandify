import React, { Component } from 'react';
import '../../SpotifyUI.css';

import { useState } from 'react';

export const Filter = (changeFunction) => {
	const [theFunc, setTheFunc] = useState(changeFunction);
	const [unused, setUnused] = useState(theFunc);
	return (
		<div>
			<img />
			<input type="text" onKeyUp={event => changeFunction.onTextChange(event.target.value)}/>
			Filter
		</div>
	)
}