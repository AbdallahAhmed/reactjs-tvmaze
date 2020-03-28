import React from 'react';

import './Input.css';

const input = (props) => {
    let inputElement = "";
    let inputClasses = "InputElement ";

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses += "Invalid ";
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case ('file'):
            inputElement = (
                <input
                    {...props.elementConfig}
                    onChange={props.changed}
                />
            );
            break;
        default:
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
    }

    return  (
        <div className={"Input"} style={{display: props.hidden ? "none" : "block"}}>
            <label className={"Label"}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;