import React, { Component } from 'react';
import Fragment from 'react';

export class SongRow extends Component {
    static displayName = SongRow.name;

    render() {
        return (
            <tr>
                <td><a href={"SongDetail/" + this.props.songId}>{this.props.title}</a></td>
                <td>{this.props.artist}</td>
                <td>{this.props.lyrics}</td>
            </tr>
        );
    }
}

