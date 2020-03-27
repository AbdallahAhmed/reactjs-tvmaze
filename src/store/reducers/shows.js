import * as actionTypes from '../actions/actionTypes';
import {GENRE_VALUES} from "../../constants";

const initialState = {
    shows: [],
    loading: true,
    search: {
        status: false,
        query: ""
    },
    filter: {
        status: false,
        params: {
            rate: "",
            year: "",
            genre: ""
        }
    },
    pageShows: [],
    pageLimit: 20,
    paginationCount: 0,
    paginationPage: 1,
    error: null
};

const setPagination = (state, shows) => {
    return {
        shows: shows,
        paginationCount: shows.length > state.pageLimit ? Math.ceil((shows.length / state.pageLimit)) : 1,
        pageShows: shows.length > state.pageLimit ? shows.slice(0, state.pageLimit) : shows,
        paginationPage: 1,
    }
};
const setShows = (state, shows) => {
    shows.sort((a, b) => {
        return b.weight - a.weight
    });
    shows = shows.length > 200 ? shows.splice(0, 200) : shows;
    return {
        ...state,
        loading: false,
        ...setPagination(state, shows),
        params: {}
    }
};

const filter = (state, params) => {
    let shows = state.shows;
    let stateParams = {
        rate: "",
        year: "",
        genre: ""
    };
    let status = false;
    if (params.year) {
        stateParams.year = params.year;
        shows = shows.filter(show => {
            return show.premiered ? +show.premiered.substring(0, 4) === +params.year : false;
        });
        status = true;
    }
    if (params.rate) {
        stateParams.rate = params.rate;
        shows = shows.filter(show => {
            return show.rating ? show.rating.average ? show.rating.average >= +params.rate : false : false;
        });
        status = true;
    }
    if (params.genre) {
        stateParams.genre = params.genre;
        shows = shows.filter(show => {
            for (let genre of show.genres)
                return genre.toLowerCase() === params.genre.toLowerCase() && GENRE_VALUES.includes(genre.toLowerCase());
            return false
        });
        status = true
    }
    return {
        ...state,
        filter: {
            status: status,
            params: stateParams,
        },
        ...setPagination(state, shows),
        loading: false,
        search: params.s ? {status: true, query: params.s} : {...state.search}
    }
};


const search = (state, shows) => {
    shows.sort((a, b) => {
        return b.weight - a.weight
    });
    shows = shows.length > 200 ? shows.splice(0, 200) : shows;
    let updatedState = {
        ...state,
        ...setPagination(state, shows),
        loading: false,
    };
    if (state.filter.status)
        return filter(updatedState, state.filter.params);
    return updatedState;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SHOWS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_SHOWS_SUCCESS:
            return setShows(initialState, action.shows);
        case actionTypes.FETCH_SHOWS_FAIL:
            return {
                ...state,
                error: action.error.response,
                loading: false
            };
        case actionTypes.CHANGE_PAGE:
            return {
                ...state,
                pageShows: state.shows.slice((action.next - 1) * state.pageLimit, ((action.next - 1) * state.pageLimit) + state.pageLimit),
                paginationPage: action.next,
            };
        case actionTypes.SEARCH_START:
            return {
                ...state,
                loading: true,
                search: {
                    status: !!action.query,
                    query: action.query
                }
            };
        case actionTypes.SEARCH_SUCCESS:
            return search(state, action.shows);
        case actionTypes.FILTER_SUCCESS:
            return filter(setShows(state, action.shows), action.params);
        default:
            return state;
    }

};

export default reducer;