import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { useHistory } from 'react-router';
import { Song } from './Song';

export const PlaylistDetail = ({ match }) => {
    let params = match.params;
    const [playlistId, setPlaylistId] = useState(params.id);
    const [loading, setLoading] = useState(true)
    const [playlist, setPlaylist] = useState([])
    let history = useHistory();

    useEffect(() => {
        getPlaylistDetail(playlistId);
    }, []); // If we pass an empty array to useEffect, it’s only executed after the first render.  
            // This is due to it being the "Dependency Array".  Since nothing is dependent, once called it goes dormant.

    return (
        <div>
            {loading ? <i>Loading...</i> : renderResult()}
        </div>
    );

    function handleSave() {
        savePlaylistDetail();
    }

    function playlistRedirect(id) {
        history.push("/PlaylistDetail/" + id);
        history.go(0);
    }

    function renderPlaylistData(playlist) {
        return (
            <div>
                <h2>{playlist == null || playlist.descriptor == null ? "New Playlist" : playlist.descriptor.name}</h2>
                Name: <input type="text"
                    id="playlistName"
                    defaultValue={playlist.descriptor.name}
                    onChange={(e) => playlist.descriptor.name = e.target.value}
                    size="50" /><br />
                Desription: <textarea type="text"
                    id="playlistDescription"
                    defaultValue={playlist.descriptor.description}
                    onChange={(e) => playlist.descriptor.description = e.target.value}
                    cols="100" /><br />

                <button onClick={() => handleSave()}>Save</button>
                <button onClick={() => playlistRedirect(0)} >New Playlist</button>
            </div>
       );
    }


    function renderResult() {
        let contents = renderPlaylistData(playlist)
        let songs = <br />
        if (!loading)
            songs = (playlist != null && playlist.songs != null)
                ? Song.renderSongsTable(playlist.songs)
                : <b>No Songs in playlist</b>

        return (
            <div>
                <h3>Playlist Info</h3>
                {contents}
                <h4>Songs</h4>
                {songs}
            </div>
        );
    }

    // fetch both the playlist descriptors and the songs contained
    async function getPlaylistDetail(id) {

        const response = await fetch('api/playlist/' + id);
        let data = await response.json();
        if (data == null)
            data = { descriptor: { playlistId: 0, Name: "", description: "" } }
        setPlaylist(data);
        setLoading(false);
    }

    async function savePlaylistDetail() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playlist)
        };
        const response = await fetch('api/playlist', requestOptions)
            .then(response => response.json());
        if (response != null && response.result > 0)
            playlistRedirect(response.result);
    }
}
