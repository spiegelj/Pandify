import React, { Component } from 'react';
import Fragment from 'react';

export class PlaylistRow extends Component {
    static displayName = PlaylistRow.name;

    render() {
        return (
            <tr>
                <td><a href={"PlaylistDetail/" + this.props.playlistId}>{this.props.name}</a></td>
                <td>{this.props.description}</td>
            </tr>
        );
    }
}

