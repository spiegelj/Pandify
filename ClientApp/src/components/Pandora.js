import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export class Pandora extends Component {
    static renderService() {
        return (
            <div>
                <p>Pandora placeholder page</p>
            </div>
        );
    }

    render() {
        let contents = Pandora.renderService();
        return (
            <div>
                {contents}
            </div>
        );
    }
}

