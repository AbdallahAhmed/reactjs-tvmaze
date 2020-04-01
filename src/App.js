import React, {Component} from 'react';
import NavBar from './components/Layouts/NavBar/NavBar';
import Home from './components/Home';
import ShowDetails from './components/Shows/SingleShow/ShowDetails';

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Episode from "./components/Shows/SingleShow/Seasons/Episodes/Episode";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Logout from "./components/User/Logout";
import Edit from "./components/User/Edit";
import {connect} from "react-redux";
import Favorites from "./components/User/Favorites/Favorites";

class App extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <BrowserRouter>
                    <NavBar {...this.props} />
                    <Switch>
                        <Route path="/auth/register" exact component={Register}/>
                        <Route path="/auth/login" exact component={Login}/>
                        <Route path="/auth/logout" exact component={Logout}/>
                        {this.props.isAuth ? <Route path="/account" exact component={Edit}/> : null}
                        {this.props.isAuth ? <Route path="/favorites" exact component={Favorites}/> : null}
                        <Route path="/show/:id/seasons/:season_id/episode/:episode_id" exact component={Episode}/>
                        <Route path="/show/:id" name={"show"} component={ShowDetails}/>
                        <Route path="/" exact component={Home} pathname={"home"}/>
                        <Redirect to={"/"}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth()
    }
};
export default connect(mapStateToProps)(App);
