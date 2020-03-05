import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <AppBar position="static"  style={{width: '100%'}}>
                <Toolbar style={{justifyContent: "center"}} >
                    <NavLink style={{color: 'white'}} to={{
                        pathname: '/',
                    }}
                         exact
                    >
                        TVMaze
                    </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavBar;