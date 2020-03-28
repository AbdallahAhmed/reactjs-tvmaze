import React, {Component} from 'react';

import {Redirect} from "react-router-dom";
import {logout} from "../../store/actions/index";
import {connect} from "react-redux";

class Logout extends Component {

    componentDidMount(){
        this.props.logout();
    }
    render() {

        return (
            <Redirect to={"/"}/>
        );
    }
}

const maptDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
};
export default connect(null, maptDispatchToProps)(Logout);