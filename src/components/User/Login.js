import React, {Component} from 'react';
import Button from '../Layouts/UI/Button/Button';
import Input from '../Layouts/UI/Input/Input';
import './Style.css';
import Spinner from "../Layouts/UI/Spinner/Spinner";
import {login} from "../../store/actions/index";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {checkValidity} from "../../constants";

class Login extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    message: "Must be a valid email"
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    message: "Password shouldn't be less than 6 characters"
                },
                valid: false,
                touched: false
            }
        },
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({
            controls: updatedControls
        })
    };

    submitHandler = (event) => {
        event.preventDefault();
        let {email, password} = this.state.controls;
        if (email.valid && password.valid) {
            let data = {
                email: email.value,
                password: password.value
            };
            this.props.login(data);
        }
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(el => (
            <div key={el.id}>
                <Input
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    invalid={!el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                    changed={(event) => this.inputChangedHandler(event, el.id)}/>
                {!el.config.valid && el.config.touched ? (<p>{el.config.validation.message}</p>) : ""}
            </div>

        ));

        if (this.props.loading)
            form =
                <Spinner/>
            ;

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = this.props.error.map((err, i) => (
                <div key={i}>
                    <p>{err}</p>
                </div>
            ));
        }
        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={"/"}/>
        }
        return (
            <div className={"Main"}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    {this.props.loading ? null : <Button btnType={"Success"}>Login</Button>}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token
    }
};

export default connect(mapStateToProps, {login})(Login);