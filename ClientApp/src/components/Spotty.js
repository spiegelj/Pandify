import React, { useState, useEffect } from 'react';
import '../SpotifyUI.css';
import { FetchUserPlaylists } from './fetchUserPlaylists';

export const Spotty = () => {
	const token = 'BQB4cfUuMuyjpGdUNcgN5J2CKoLjgynW55Ffyfe2mrEBQ79yW4PaLf_ZXGT0beK7wxfMLb1kXxj48DwGdslh69IA1RpjNp1M1akyKme07tQqBD_bRZ6wF5PwD3Kw7d0WkZlI_eUgu2dbi-szMxPa17VBT3z7wiR4bMmTUDchnE-PswwJQg'
	const [loading, setLoading] = useState(true)
	const [userPlaylist, setUserPlaylist] = useState({});

	useEffect(() => {
		async function fetchData() {
			const fetcher = await FetchUserPlaylists(token)
			console.log(fetcher)
			setUserPlaylist(fetcher)
			console.log(userPlaylist)
		}

		// Making sure a token exists before calling
		fetchData()
	}, [])

	useEffect(() => {
		sleep(5000)
		console.log(userPlaylist)
		setLoading(false)
	}, [userPlaylist, userPlaylist.playlists])
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	return (
		<div className="playlists">
			{!loading ?
				<div>
					<p>{JSON.stringify(userPlaylist)}</p>
					{userPlaylist.playlists ? userPlaylist.playlists.length : "no playlists"}
				</div>
				:
				<div>
					<h3>Loading...</h3>
				</div>
			}
		</div>
	)
}