import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar = () => {
    return (
        <div >
            <AppBar position="static" style={{width: '100%'}} >
                <Toolbar>
                    <Typography color="inherit">
                        TVMaze
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default NavBar;