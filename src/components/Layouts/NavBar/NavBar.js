import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {withRouter} from 'react-router-dom';
import NavToolbar from "./partials/NavToolbar";

const NavBar = (props) => {
    return (
        <div style={{flexGrow: 1}}>
            <AppBar position="static">
                <NavToolbar {...props} />
            </AppBar>
        </div>
    )
};

export default withRouter(NavBar);

/*<AppBar position="static"  style={{width: '100%'}}>
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
            </AppBar>*/