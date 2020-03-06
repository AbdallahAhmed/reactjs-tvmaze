import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {NavLink} from 'react-router-dom';
import Search from "./Search/Search";
import InputBase from "@material-ui/core/InputBase/InputBase";

const NavBar = (props) => {
    return (
        <div>
            <AppBar position="static"  style={{width: '100%'}}>
                <Toolbar style={{justifyContent: "center"}} >
                    <NavLink style={{color: 'white', textDecoration: "none"}} to={{
                        pathname: '/',
                    }}
                         exact
                    >
                        TVMaze
                    </NavLink>

                    <Search style={{justifySelf: "right"}} {...props}/>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavBar;