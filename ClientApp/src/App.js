import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Playlist } from './components/Playlist';
import { PlaylistDetail } from './components/PlaylistDetail';
import { Song } from './components/Song';
import { SongDetail } from './components/SongDetail';
import { SpotifyUI } from './components/SpotifyUI';
import { Spotty } from './components/Spotty';
import { Service } from './components/Service';
import { Spotify } from './components/Spotify';
import { Pandora } from './components/Pandora';
import Modal from './components/shared/Modal';
import { Switch } from "react-router-dom"

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
         <Switch>
           <Route exact path='/' component={Home} />
           <Route path='/counter' component={Counter} />
           <Route path='/playlist' component={Playlist} />
           <Route path='/song' component={Song} />
           <Route path='/SpotifyUI' component={SpotifyUI} />
           <Route path='/Spotty' component={Spotty} />
           <Route exact path='/Service' component={Service} />
           <Route path='/Service/Spotify' component={Spotify} />
           <Route path='/Service/Pandora' component={Pandora} />
           <Route path='/SongDetail/:id' component={SongDetail} />
           <Route path='/PlaylistDetail/:id' component={PlaylistDetail} />
           <Route exact path="/Modal/:id" component={Modal} />
           <Route component={Error} />
         </Switch>
      </Layout>
    );
  }
}
