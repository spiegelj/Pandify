﻿import React, { Component } from "react";
import hash from "./hash";
import logo from "./logo.svg";
import "./App.css";

export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "12179fba5b4f486aa8748bc51848f17e";
const redirectUri = "https://localhost:44310/Service/Spotify";
const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
];
// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
        if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = "";

class App extends Component {
    componentDidMount() {
        // Set token
        let _token = hash.access_token;
        if (_token) {
            // Set token
            this.setState({
                token: _token
            });
        }
    }
    render() {
        let headerStyle = { color: green; 'font-size'= '20px'}
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {!this.state.token && (
                        <a
                            className="btn btn--loginApp-link"
                            href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                        >
                            Login to Spotify
                        </a>
                        <h1 style={headerStyle} >Hello</h1>
                    )}
                    {this.state.token && (
        // Spotify Player Will Go Here In the Next Step
      )}
                </header>
            </div>
        );
    }
}
export default App;