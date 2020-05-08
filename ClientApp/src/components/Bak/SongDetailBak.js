import React, { Component, useState  } from 'react';
import ReactDOM from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Playlist } from './Playlist';

export const SongDetailBak = (props) => {
    const [count, setCount] = useState(0)

    //constructor(props) {
    //    super(props);
        this.state = { song: null, loading: true };
        this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    renderResult();
    //}


    function handleSave() {
        alert(this.state.song.title);
        const songUpdate = this.state.song;
        songUpdate.lyrics = this.songLyrics.contents;

        this.setState({song: songUpdate});
        this.saveSongDetail(this.state.song);
    }

    function handleChange() {
        alert('Changed:  ' + this.state.song.title);
    }

    function componentDidMount() {
        this.getSongDetail(this.props.match.params);
    }

    function renderSongData(song) {
        return (
            <div>
                <h2>{song == null || song.title == null ? "New Song" : song.title}</h2>
                Title: <input type="text" id="songTitle" defaultValue={song == null ? "" : song.title} onChange={this.handleChange} readOnly={false} /><br />
                Artist: <input type="text" id="songArtist" defaultValue={song == null ? "" : song.artist} onChange={this.handleChange} readOnly={false} /><br />
                Lyrics Sample: <input type="text" id="songLyrics" defaultValue={song == null ? "" : song.lyrics} onChange={this.handleChange} readOnly={false} /><br />
                <a href="SongDetail/0">New</a>
            </div>
        );
    }

    function renderResult() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SongDetail.renderSongData(this.state.song);
        let playlists = <br />
        if (!this.state.loading)
            playlists = (this.state.song != null && this.state.song.membership != null)
                ? Playlist.renderPlaylistsTable(this.state.song.membership)
                : <h4>No Songs in playlist</h4>

        return (
            <div>
                <h3>Song Info</h3>
                {contents}
                <h4>Playlist Membership</h4>
                {playlists}
                <button onClick={this.handleSave}>Save</button>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>Click me</button>
            </div>
        );
    }

    async function getSongDetail(paramObject) {
        const response = await fetch('api/song/' + paramObject.id);
        const data = await response.json();
        this.setState({ song: data, loading: false });
    }

    async function saveSongDetail(paramObject) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paramObject)
        };
        fetch('api/song', requestOptions)
            .then(response => response.json());
            //.then(data => this.setState({ postId: data.id }));
    }
}
