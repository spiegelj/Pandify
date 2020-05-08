import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { SongRow } from './shared/SongRow';
import { Fragment } from "react";


export class Service extends Component {
    static displayName = Service.name;

    static renderServiceLinks() {
        return (
            <div>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <tbody>
                        <tr>
                            <td>
                                <a href="/Service/Spotify">Spotify</a>
                            </td>
                            <td>
                                <a href="/Service/Pandora">Pandora</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>Placeholder for navigating to services</p>
            </div>
        );
    }

    render() {
        let contents = Service.renderServiceLinks();
        return (
            <div>
                {contents}
            </div>
        );
    }
}

