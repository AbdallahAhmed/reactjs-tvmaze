import React, {Component} from 'react';
import Button from '../Layouts/UI/Button/Button';
import Input from '../Layouts/UI/Input/Input';
import './Style.css';
import Spinner from "../Layouts/UI/Spinner/Spinner";
import {update} from "../../store/actions/index";
import {connect} from "react-redux";
import {checkValidity} from "../../constants";
import Avatar from "@material-ui/core/Avatar/Avatar";

class EditAccount extends Component {

    state = {
        controls: {
            avatar: {
                elementType: 'file',
                elementConfig: {
                    type: 'file',
                    accept: 'image/*',
                    id: "avatar",
                },
                hidden: true,
                validation: false,
                changed: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: this.props.user.email,
                validation: {
                    required: true,
                    isEmail: true,
                    message: "Must be a valid email"
                },
                valid: true,
                touched: false
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: this.props.user.name,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 15,
                    message: "Name should be between 3 and 15 characters"
                },
                valid: true,
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
                    minLength: 6,
                    message: "Password shouldn't be less than 6 characters"
                },
                valid: true,
                touched: false
            }
        },
        imageData: '',
        imageUrl: this.props.user.avatar,
    };

    inputChangedHandler = (event, controlName) => {
        const val = event.target.value;
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: val,
                valid: !(controlName === "password" && !val) ? checkValidity(val, this.state.controls[controlName].validation) : true,
                touched: true
            }
        };
        this.setState({
            controls: updatedControls
        })
    };

    imageChangeHandler = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                imageData: file,
                imageUrl: reader.result
            });
        };
        reader.readAsDataURL(file)
    };

    submitHandler = (event) => {
        event.preventDefault();
        let {email, name, password} = this.state.controls;
        if (email.valid && name.valid && password.valid) {
            let data = {
                email: email.value,
                name: name.value,
                password: password.value,
                imageData: this.state.imageData
            };
            this.props.onUpdate(data);
        }
    };

    render() {
        let {loading, user, error, updated} = this.props;
        let {controls, imageUrl} = this.state;

        const formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
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
                    changed={el.config.elementType !== "file" ?
                        (event) => this.inputChangedHandler(event, el.id)
                        : (event) => this.imageChangeHandler(event)
                    }
                    hidden={el.config.hidden}
                    accept={el.config.elementConfig.accept}
                />
                {!el.config.valid && el.config.touched ? (<p>{el.config.validation.message}</p>) : ""}
            </div>

        ));

        if (loading)
            form =
                <Spinner/>
            ;

        let errorMessage = null;
        if (error) {
            errorMessage = error.map((err, i) => (
                <div key={i}>
                    <p>{err}</p>
                </div>
            ));
        }
        let updatedMessage = updated ?  <p>Changes have been saved successfully!</p> : null;
        return (
            <div className={"Main"}>
                <div>
                    <Avatar style={{
                        height: "300px",
                        width: "300px",
                        margin: "auto"
                    }} alt={user.name} src={imageUrl}/>
                </div>
                <form onSubmit={this.submitHandler}>
                    <Button
                        clicked={(e) => {
                            e.preventDefault();
                            document.getElementById('avatar').click()
                        }}
                        btnType={"Success"}>Change Avatar</Button>
                    {form}
                    {errorMessage}
                    {updatedMessage}
                    { loading ? null : <Button btnType={"Success"}>Update</Button>}
                    </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        user: state.auth.user,
        error: state.auth.error,
        updated: state.auth.updated
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdate: (data) => dispatch(update(data))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);