import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { PlaylistRow } from './PlaylistRow';

// A playlist and library are both listings of songs.  Start with reusing playlist as library, but may be a nice chance for a base class if we get there.
export class Playlist extends Component {
    static displayName = Playlist.name;

    constructor(props) {
        super(props);
        this.state = { playlists: [], loading: true };
    }

    componentDidMount() {
        this.populatePlaylists();
    }

    static renderPlaylistsTable(playlists) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {playlists.map(playlist =>
                        <PlaylistRow playlistId={playlist.playlistId} name={playlist.name} description={playlist.description} />
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Playlist.renderPlaylistsTable(this.state.playlists);

        return (
            <div className="Playlists">
                <h1>Playlists</h1>
                Insert Playlist list here!
                {contents}
            </div>
        );
    }

    async populatePlaylists() {
        const response = await fetch('api/playlist');
        const data = await response.json();
        this.setState({ playlists: data, loading: false });
    }
}

