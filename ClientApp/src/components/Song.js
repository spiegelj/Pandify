import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { SongRow } from './shared/SongRow';
import { Fragment } from "react";


export class Song extends Component {
    static displayName = Song.name;

    constructor(props) {
        super(props);
        this.state = { songs: [], loading: true };
    }

    componentDidMount() {
        this.populateSongs();
    }

    static renderSongsTable(songs) {
        return (
            <div>
                Add new song button {/* Given what I can do currently, this implies some reworking to function and adding hooks*/}<br/>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Lyrics</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map(song =>
                                <SongRow songId={song.songId} title={song.title} artist={song.artist} lyrics={song.lyrics} />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Song.renderSongsTable(this.state.songs);
        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateSongs() {
        const response = await fetch('api/song');
        const data = await response.json();
        this.setState({ songs: data, loading: false });
    }
}

