import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export class Spotify extends Component {

    static renderService() {
        return (
            <div>
                <p>Spotify placeholder page</p>
            </div>
        );
    }

    render() {
        let contents = <p>Placeholder</p>;  //Spotify.renderService();
        return (
            <div>
                {contents}
            </div>
        );
    }
}

