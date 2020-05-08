import React, { Component, useState } from 'react';
import '../../SpotifyUI.css';

let defaultStyle = {
	color: 'SlateGray',
	'font-family': 'Papyrus',
	'background-color': 'cornflower'
}

let counterStyle = {
	...defaultStyle,
	widht: '40px',
	display: 'inline-block',
	'margin-botton': '20px',
	'font-size': '20px',
	'line-height': '30px'
}

export const AggregatorLabel = (params) => {
	const aggregatorStyle = {
		width: '40%',
		display: 'inline-block',
		'margin-top': '10px',
		'font-size': '14px'
	}
	return (
		<div style={counterStyle}>
			<h2 style={{ color: 'cadetblue' }}>{params.metric}: {params.value}</h2>
		</div>
	)
}