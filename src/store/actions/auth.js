import * as actionTypes from './actionTypes';
import {backend} from '../../axios';


export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
};

export const registerSuccess = (data) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        data: data
    };
};

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
};

export const register = (data) => {
    return dispatch => {
        dispatch(registerStart());
        backend.post('auth/register', data)
            .then(res => {
                dispatch(registerSuccess(res.data));
            }).catch(err => {
            dispatch(registerFail(err.response.data.errors));
        });
    };
};

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (data) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        data: data
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const login = (data) => {
    return dispatch => {
        dispatch(loginStart());
        backend.post('auth/login', data)
            .then(res => {
                dispatch(loginSuccess(res.data));
            }).catch(err => {
            dispatch(loginFail(err.response.data.errors));
        });
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    };
};

export const updateStart = () => {
    return {
        type: actionTypes.UPDATE_START
    };
};

export const updateSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_SUCCESS,
        data: data
    };
};

export const updateFail = (error) => {
    return {
        type: actionTypes.UPDATE_FAIL,
        error: error
    };
};

export const update = (data) => {
    return dispatch => {
        dispatch(updateStart());
        let formData = new FormData();
        formData.append("email", data.email);
        formData.append("name", data.name);
        if (data.imageData)
            formData.append("image", data.imageData);
        if (data.password)
            formData.append("password", data.password);

        backend.post('update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                dispatch(updateSuccess(res.data));
            }).catch(err => {
            dispatch(updateFail(err.response.data.errors));
        });
    };
};

export const updateUserShows = favorites => {
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_SHOWS_COUNT,
            favorites: favorites
        });
    };
};

