export const FetchUserPlaylists = async (token) => {

    if (!token)
        return null

    // because we don't rely on user data, it can be sync for a bit, right?
    let playlistResult = []
    let user = await getUser(token).then((user) => {
        console.log(user)
        return user
    });
    let returnUser = {}
    //const playlists = await getPlaylists(token, user.email).then(console.log('Got playlists'))
    const playlists = await getPlaylistsTest(token, user.email).then(console.log('Got playlists test'))
   // await buildPlaylists().then(console.log('Built playlists'))
    await finalizeUser().then(console.log('finalized user'))

    console.log(returnUser)
    debugger
    return returnUser

    async function finalizeUser() {
        returnUser = {
            id: user.id,
            display_name: user.display_name,
            href: user.href,
            email: user.email,
            uri: user.uri,
            playlists: playlists
        }
    }

    //async function buildPlaylists() {
    //    await playlists.items.map(async (playlist) => {
    //        await playlistResult.push({
    //            "id": playlist.id,
    //            "name": playlist.name,
    //            "description": playlist.description,
    //            "href": playlist.href,
    //            "total": playlist.tracks.total,    // Useful because we don't always bring back all songs.
    //            "images": playlist.images,
    //            "tracks": await getPlaylistTracks(token, playlist.tracks.href)
    //        })
    //    });
    //}

    async function getPlaylistTracks(token, url) {
        const playlistTracks = await fetch(url + '?limit=3' /* + '?offset=0&limit=3'*/, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((response) => response.json())

        return await parseTrackSet(playlistTracks.items)
    }


    //async function getPlaylistTracksTest(token, url) {
    //    const playlistTracks = await fetch(url + '?limit=3' /* + '?offset=0&limit=3'*/, {
    //        headers: { 'Authorization': 'Bearer ' + token }
    //    })
    //        .then((response) => response.json())
    //        .then((response) => { return parseTrackSet(response.items) })

    //    return await parseTrackSet(playlistTracks.items)
    //}

    async function getUser(token) {
        return await fetch('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((response) => response.json())
    }

    async function getPlaylists(token) {
        // keep href and total properties from top level and dig into items array
        return await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((response) => response.json());

    }

    async function getPlaylistsTest(token) {
        // keep href and total properties from top level and dig into items array
        return fetch('https://api.spotify.com/v1/me/playlists', {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((response) => response.json())
            .then( async (response) => {
                console.log(response.items)
                let copout = []
                console.log(response.length)
                for (let i = 0; i < response.items.length; i++) {
                    copout.push({
                        "id": response.items[i].id,
                        "name": response.items[i].name,
                        "description": response.items[i].description,
                        "href": response.items[i].href,
                        "images": response.items[i].images,
                        "total": response.items[i].tracks.total,    // Useful because we don't always bring back all songs.
                        "tracks": await getPlaylistTracks(token, response.items[i].tracks.href)
                    })
                    console.log(copout)
                }
                return copout
                //return await response.items.reduce(async (paredPlaylists, playlist) => {
                //    console.log(playlist)
                //    await paredPlaylists.concat({
                //        "id": "foo" //playlist.id,
                //        //"name": playlist.name,
                //        //"description": playlist.description,
                //        //"href": playlist.href,
                //        //"total": playlist.tracks.total,    // Useful because we don't always bring back all songs.
                //        //"tracks": "test text"   //await getPlaylistTracks(token, playlist.tracks.href)
                //    })
                //    console.log(paredPlaylists)
                //}, [])
            })
    }


    async function parseTrackSet(trackSet) {
        let tracks = []
        await trackSet.map(sourceTrack => {
            tracks.push({
                album: {
                    album_type: sourceTrack.track.album.album_type,
                    artists: sourceTrack.track.album.artists,
                    images: sourceTrack.track.album.images,
                    name: sourceTrack.track.album.name,
                    release_date: sourceTrack.track.album.release_date
                },
                artists: sourceTrack.track.artists,
                duration_ms: sourceTrack.track.duration_ms,
                href: sourceTrack.track.href,
                id: sourceTrack.track.id,
                name: sourceTrack.track.name,
                video_thumbnail: sourceTrack.video_thumbnail,
            })
        })
        return tracks
    }

    async function parseTrackSetTest(trackSet) {
        let tracks = []
        await trackSet.map(sourceTrack => {
            tracks.push({
                album: {
                    album_type: sourceTrack.track.album.album_type,
                    artists: sourceTrack.track.album.artists,
                    images: sourceTrack.track.album.images,
                    name: sourceTrack.track.album.name,
                    release_date: sourceTrack.track.album.release_date
                },
                artists: sourceTrack.track.artists,
                duration_ms: sourceTrack.track.duration_ms,
                href: sourceTrack.track.href,
                id: sourceTrack.track.id,
                name: sourceTrack.track.name,
                video_thumbnail: sourceTrack.video_thumbnail,
            })
        })
        return tracks
    }

    async function parseSong(song) {
        return {
            "track": {
                "id": song.id,
                "name": song.name,
                "artists": song.artists,
                "duration_ms": song.duration_ms,
                "href": song.href,
                "album": {
                    "name": song.album.name,
                    "artists": song.album.artists,
                    "href": song.album.href,
                    "id": song.album.id,
                    "images": song.album.images,
                    "release_date": song.album.release_date
                }

            }
        }
    }

}
