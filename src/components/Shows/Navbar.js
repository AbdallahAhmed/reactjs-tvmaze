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
                exact
                to={{
                pathname: '/show/'+props.id+'/episodes',
            }}>Episodes</NavLink></li>
        </div>
    );
};

export default Navbar;