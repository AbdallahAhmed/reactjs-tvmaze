import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    error: null,
    loading: false,
};

const user = (state, data) => {
    let {user, token} = data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return {
        ...state,
        user: user,
        token: token,
        loading: false
    }
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return initialState;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.REGISTER_SUCCESS:
            return user(state, action.data);
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.LOGIN_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.LOGIN_SUCCESS:
            return user(state, action.data);
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.LOGOUT:
            return logout();
        default:
            return state;

    }
};

export default reducer;