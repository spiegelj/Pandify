import React, { Component, useState, useEffect } from 'react';
import Button from 'react';
import ReactDOM from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    BrowserRouter,
    useParams
} from "react-router-dom";
import { useHistory } from 'react-router';
import { Playlist } from './Playlist';

export const SongDetail = ({ match }) => {
    let params = match.params;
    const [songId, setSongId] = useState(params.id);
    const [loading, setLoading] = useState(true)
    const [song, setSong] = useState([])
    let history = useHistory();

    useEffect(() => {
        getSongDetail(songId);
    }, []); // If we pass an empty array to useEffect, it’s only executed after the first render.  
            // This is due to it being the "Dependency Array".  Since nothing is dependent, once called it goes dormant.

    return (
        <div>
            {loading ? <i>Loading...</i> : renderResult()}
        </div>
    );

    function handleSave() {
        saveSongDetail();
    }

    function songRedirect(id) {
        history.push("/SongDetail/" + id);
        history.go(0);
    }
    function renderSongData(song) {
        //getSongDetail(songId)
        return (
            <div>
                <h2 id="TitleHeader">{song == null || song.title == null ? "New Song" : song.title}</h2>
                Title: <input type="text" id="songTitle" placeholder="Song Title" defaultValue={song.title} onChange={(e) => song.title = e.target.value} size="50" /><br />
                Artist: <input type="text" id="songArtist" defaultValue={song.artist} onChange={(e) => song.artist = e.target.value} size="50" /><br />
                Sample Lyrics: <textarea type="text" id="songLyrics" defaultValue={song.lyrics} onChange={(e) => song.lyrics = e.target.value} cols="100"/><br />
                <button onClick={() => handleSave()}>Save</button>
                <button onClick={() => songRedirect(0) } >New Song</button>
            </div>
        );
    }

    function renderResult() {
        let contents = renderSongData(song)
        let playlists = <br />
        if (!loading)
            playlists = (song != null && song.membership != null)
                ? Playlist.renderPlaylistsTable(song.membership)
                : <h4>Songs is not a member of any playlist</h4>

        return (
            <div>
                <h3>Song Info</h3>
                {contents}
                <h4>Playlist Membership</h4>
                {playlists}
            </div>
        );
    }

    async function getSongDetail(id) {
        const response = await fetch('api/song/' + id);
        let data = await response.json();
        if (data == null)
            data = { songId: 0, title: "", artist:"", lyrics:"" }
        setSong(data);
        setLoading(false);
    }

    async function saveSongDetail() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(song)
        };
        const response = await fetch('api/song', requestOptions)
            .then(response => response.json());
            //.then(data => this.setState({ postId: data.id }));
        if (response != null && response.result > 0)
            songRedirect(response.result);
    }
}
