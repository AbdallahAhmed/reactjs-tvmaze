import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    error: null,
    loading: false,
    updated: false
};

const user = (state, data) => {
    let {user, token} = data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return {
        ...state,
        user: user,
        token: token,
        loading: false,
        error: false,
        updated: true
    }
};


const logout = (state) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return {
        ...state,
        user: null,
        token: null,
        updated: false
    };
};

const favorites = (state, favorites) => {
    let {user} = state;
    user.shows_count = favorites.shows_count;
    user.shows_ids = favorites.shows_ids;
    localStorage.setItem("user", JSON.stringify(user));
    return {
        ...state,
        user: user
    }
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
            return logout(state);
        case actionTypes.UPDATE_START:
            return {
                ...state,
                loading: true,
                updated: false
            };
        case actionTypes.UPDATE_SUCCESS:
            return user(state, action.data);
        case actionTypes.UPDATE_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
                updated: false
            };
        case actionTypes.UPDATE_SHOWS_COUNT:
            return favorites(state, action.favorites)
        default:
            return state;

    }
};

export default reducer;