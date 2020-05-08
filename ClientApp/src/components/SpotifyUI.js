import React, { useState, useEffect } from 'react';
import logo from '../Spotify.svg';
import { render } from 'react-dom';
import { useHistory } from 'react-router';
import '../SpotifyUI.css';
import { AggregatorLabel } from './shared/AggregatorLabel';
import { Filter } from './shared/Filter';
import { PlaylistSnapshot } from './shared/PlaylistSnapshot';
import queryString from 'query-string';
import { FetchUserPlaylists } from './fetchUserPlaylists';
/*
 * NOTE:  The server code needs to redirect to where this is running (https://localhost:44393/) and make sure it's using SSL.
 * */

let defaultStyle = {
	color: 'SlateGray',
	'font-family': 'Papyrus',
	'background-color': 'cornflower'
}

export const SpotifyUI = () => {
	const [filterString, setFilterString] = useState("");
	const [totalTracks, setTotalTracks] = useState(0);
	const [loading, setLoading] = useState(true)
	const [authToken, setAuthToken] = useState("")
	let history = useHistory();

	const [userPlaylist, setUserPlaylist] = useState({});


	let parsed = queryString.parse(window.location.search);
	console.log(parsed)

	if (!parsed || !parsed.access_token) {
		window.location = 'http://localhost:8888/login'
	}
	useEffect(() => {
		async function fetchData() {
			console.log('Called fetchData')
			const fetcher = await FetchUserPlaylists(parsed.access_token)
			console.log('fetcher:')
			console.log(fetcher)
			setUserPlaylist(fetcher)
		}
		console.log(`parsed:  ${parsed.queryString}`)
		if (parsed && parsed.access_token) {
			setAuthToken(parsed.access_token)
			fetchData()
		}
	}, [])

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	useEffect(() => {
		console.log(`Set loading result:  ${loading}`)
	}, [loading])

	useEffect(() => {
		console.log(`Setting loading==>  userPlaylist: ${userPlaylist}  userPlaylist.playlists exist:  ${userPlaylist.playlists != null}`)
		setLoading(userPlaylist == null || userPlaylist.playlists == null /*|| userPlaylist.playlists.length === 0*/)
		console.log(userPlaylist)
	}, [userPlaylist])

	//Update here
	useEffect(() => {
		console.log('Totaling songs effect entered')
		if (userPlaylist.playlists) {
			console.log('Totaling songs condition met')
			setTotalTracks(userPlaylist.playlists.reduce((sum, playlist) => {
				if (filterString === '' || playlist.name.toLowerCase().includes(filterString.toLowerCase()))
					return sum + playlist.total
				else
					return sum
			}, 0));
		}
	}, [filterString, userPlaylist]); // If we pass an empty array to useEffect, it’s only executed after the first render.  

	function spotifyAuthenticate() {
		history.push("http://localhost:8888/login");
		history.go(0);
	}


	return (
		<div className="SpotifyUI"
			style={{...defaultStyle}}>
			{loading != null &&!loading ?
				<div>
					<h3>{userPlaylist.display_name}'s Playlists</h3>
					
					<AggregatorLabel metric="Total Songs" value={totalTracks} />
					{<Filter onTextChange={text => {
						setFilterString(text);
					}} />}
					{/*userPlaylist &&*/ userPlaylist.playlists && userPlaylist.playlists.length > 0 ? userPlaylist.playlists.filter(playlist =>
						filterString === '' || playlist.name.toLowerCase().includes(filterString.toLowerCase()))
						.map(playlist =>
							<PlaylistSnapshot playlist={playlist} />
						) : <br/>}
				</div>
				:
				<div>
					<h3>Loading...</h3>
					<p>Attempting to authenticate...</p>
					{/*<button onClick={() => window.location='http://localhost:8888/login'}
						style={{ padding: '20px', 'font-size': '50px', 'marginTop': '20px' }}>Sign in to Spotify</button>*/}
				</div>
			}
		</div>
	)
}
