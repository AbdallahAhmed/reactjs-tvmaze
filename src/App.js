import React, {Component} from 'react';
import NavBar from './components/Layouts/NavBar';
import Home from './components/Home';
import ShowDetails from './components/Shows/SingleShow/ShowDetails';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Episode from "./components/Shows/SingleShow/Seasons/Episodes/Episode";

class App extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <BrowserRouter>
                    <NavBar/>
                    <Switch>
                        <Route path="/show/:id/seasons/:season_id/episode/:episode_id" exact component={Episode}/>
                        <Route path="/show/:id" name={"show"}  component={ShowDetails}/>
                        <Route path="/" exact component={Home}/>
                        <Route component={Home} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
