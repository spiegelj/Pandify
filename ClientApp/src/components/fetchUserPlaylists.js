export const FetchUserPlaylists = async (token) => {

    if (!token)
        return null

    let user = await getUser(token).then((user) => {
        console.log(user)
        return user
    });
    let returnUser = {}
    const playlists = await getPlaylistsTest(token, user.email).then(console.log('Got playlists test'))
    await finalizeUser().then(console.log('finalized user'))

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


    async function getPlaylistTracks(token, url) {
        const playlistTracks = await fetch(url + '?limit=3' /* + '?offset=0&limit=3'*/, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then((response) => response.json())

        return await parseTrackSet(playlistTracks.items)
    }


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
                let copout = []
                // seems better to use map or reduce, but keep getting hung up on awaiting promises to complete
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
                }
                return copout
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


}
