import React, { Component, useState, useEffect } from 'react';
import '../../SpotifyUI.css';


export const PlaylistSnapshot = (playlistParam) => {
	const [playlist, setPlaylist] = useState(playlistParam.playlist);
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(false);
	}, []); // If we pass an empty array to useEffect, it’s only executed after the first render.  
	// This is due to it being the "Dependency Array".  Since nothing is dependent, once called it goes dormant.
	useEffect(() => {
		setPlaylist(playlistParam.playlist);
	}, [playlistParam]);   // Once first called, we need to depend on the parameter changing.  It seems the function
						// persists as an object and calling it again just updates the parameters vs. sending to a 
						// new function.  

	return (
		<div style={{ 'min-width': '150px', width: '20%', display: 'inline-block', backgroundColor: 'LightSteelBlue'}}>
			{loading ? <i>Loading...</i> : renderResult()}
		</div>
	);

	function renderResult() {
		const alternatedStyle = {
			textAlign: 'center',
			backgroundColor: 'aliceblue'
		}
		return (
			<div style={{ textAlign: 'center', backgroundColor: 'aliceblue' }}>
				<img src={playlist.images[0].url} style={{width: '90%'}} />
				<h3>{playlist.name} ({playlist.total})</h3>
				<ul>
					<li>{playlist.tracks[0].name}</li>
					<li>{playlist.tracks[1].name}</li>
					<li>{playlist.tracks[2].name}</li>
				</ul>
			</div>
		)
	}
}