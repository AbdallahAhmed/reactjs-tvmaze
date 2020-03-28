import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {NavLink} from "react-router-dom";
import Search from "../../Search/Search";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {Favorite} from "@material-ui/icons";
import {connect} from "react-redux";


const navToolbar = (props) => {
    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },

        search: {
            marginLeft: 0,
            width: '30%',
        },
    }));
    const classes = useStyles();
    const {user, isAuth} = props;
    let [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Toolbar style={{justifyContent: "space-between"}}>
                <Typography className={classes.title} variant="h6" noWrap>
                    <NavLink style={{color: 'white', textDecoration: "none"}} to={{
                        pathname: '/',
                        search: ''
                    }}
                             exact
                    >
                        TVMaze
                    </NavLink>
                </Typography>
                {props.history.location.pathname !== "/" ?(
                    <div className={classes.search}>
                        <Search changed={() => {
                        }}/>
                    </div>
                ) : null}
                {isAuth ? (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Favorite/>
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar variant={"circle"}
                                    src={ user && user.avatar ? user.avatar : null}/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <NavLink style={{textDecoration: "none", color: "black", flexGrow: 1}} to={{
                                    pathname: '/account',
                                    search: ''
                                }}
                                         exact
                                >
                                    {user.name}
                                </NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <NavLink style={{textDecoration: "none", color: "black", flexGrow: 1}} to={{
                                    pathname: '/auth/logout',
                                    search: ''
                                }}
                                         exact
                                >
                                    Logout
                                </NavLink>
                            </MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <div>
                        <NavLink style={{color: 'white', textDecoration: "none"}} to={{
                            pathname: '/auth/login',
                            search: ''
                        }}
                                 exact
                        >
                            Login
                        </NavLink>
                        <NavLink style={{color: 'white', textDecoration: "none", paddingLeft: 16}} to={{
                            pathname: '/auth/register',
                            search: ''
                        }}
                                 exact
                        >
                            Sign Up
                        </NavLink>
                    </div>
                )}
            </Toolbar>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: !!state.auth.token,
        user: state.auth.user
    }
};
export default connect(mapStateToProps)(navToolbar);
