import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {NavLink, withRouter} from 'react-router-dom';
import Search from "./Search/Search";

const NavBar = (props) => {
    return (
        <div>
            <AppBar position="static"  style={{width: '100%'}}>
                <Toolbar style={{justifyContent: "space-between"}} >
                    <NavLink style={{color: 'white', textDecoration: "none"}} to={{
                        pathname: '/',
                        search: ''
                    }}
                         exact
                    >
                        TVMaze
                    </NavLink>
                    <Search style={{justifySelf: "right"}} changed={() => {}} {...props}/>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default withRouter(NavBar);