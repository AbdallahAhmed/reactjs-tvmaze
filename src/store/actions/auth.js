import * as actionTypes from './actionTypes';
import axios from 'axios';

const url = "http://fleet-management.local/api/auth/"; //"https://agile-basin-94102.herokuapp.com/api/auth/";

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    }
};

export const registerSuccess = (data) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        data: data
    }
};

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    }
};

export const register = (data) => {
    return dispatch => {
        dispatch(registerStart());
        axios.post(url + 'register', data)
            .then(res => {
                dispatch(registerSuccess(res.data.data));
            }).catch(err => {
            dispatch(registerFail(err.response.data.errors));
        })
    }
};

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    }
};

export const loginSuccess = (data) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        data: data
    }
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    }
};

export const login = (data) => {
    return dispatch => {
        dispatch(loginStart());
        axios.post(url + 'login', data)
            .then(res => {
                dispatch(loginSuccess(res.data.data));
            }).catch(err => {
            dispatch(loginFail(err.response.data.errors));
        })
    }
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
};