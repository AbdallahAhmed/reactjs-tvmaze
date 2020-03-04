import React from 'react';
import {NavLink} from 'react-router-dom';


const Navbar = (props) => {
    return (
        <div>
            <li><NavLink
                to={{
                    pathname: '/show/'+props.id+'/cast',
                }}
                exact
                >Cast</NavLink></li>
            <li><NavLink
                to={{
                pathname: '/show/'+props.id+'/seasons',
            }}>Seasons</NavLink></li>
        </div>
    );
};

export default Navbar;