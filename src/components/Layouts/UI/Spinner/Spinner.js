import React from 'react';
import './Spinner.css';

const spinner = (props) => (
    <div style={props.style} className={"Loader"}>Loading...</div>
);

export default spinner;