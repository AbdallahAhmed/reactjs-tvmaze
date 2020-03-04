import React, {Component} from 'react';
import NavBar from './components/NavBar';
import ShowList from './components/Shows/ShowsList';
import ShowDetails from './components/Shows/SingleShow/ShowDetails';
import Episodes from './components/Shows/SingleShow/Episodes';
import Cast from './components/Shows/SingleShow/Cast';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <NavBar/>
                <BrowserRouter>
                    <Switch>

                        <Route path="/show/:id"  component={ShowDetails}/>
                        <Route path="/" exact component={ShowList}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
