import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const showsFetchStart = () => {
    return {
        type: actionTypes.FETCH_SHOWS_START
    }
};

export const showsFetchSuccess = (shows) => {
    return {
        type: actionTypes.FETCH_SHOWS_SUCCESS,
        shows: shows
    }
};

export const showsFetchFail = (error) => {
    return {
        type: actionTypes.FETCH_SHOWS_FAIL,
        error: error
    }
};

export const fetchShows = () => {
    return dispatch => {
        dispatch(showsFetchStart());
        axios.get('/shows?page=0')
            .then(response => {
                dispatch(showsFetchSuccess(response.data));
            })
            .catch(err => {
                dispatch(showsFetchFail(err))
            })
    }
};

export const changePage = (next) => {
    return {
        type: actionTypes.CHANGE_PAGE,
        next: next
    }
};

export const searchStart = (query) => {
    return {
        type: actionTypes.SEARCH_START,
        query: query
    }
};

export const searchSuccess = (shows) => {
    return {
        type: actionTypes.SEARCH_SUCCESS,
        shows: shows,
    }
};

export const searchFail = (error) => {
    return {
        type: actionTypes.SEARCH_FAIL,
        error: error
    }
};

export const search = (query) => {
    return dispatch => {
        dispatch(searchStart(query));
        let url = query ? 'search/shows?q=' + query : '/shows?page=0';
        axios.get(url)
            .then(response => {
                let shows = query ? response.data.map(show => {
                    return show.show;
                }) : response.data;
                dispatch(searchSuccess(shows));
            })
            .catch(error => {
                dispatch(searchFail());
                console.log("Error occurred:" + error)
            })
    }
};

export const filterStart = () => {
    return {
        type: actionTypes.FILTER_START,
    }
};

export const filterSuccess = (shows, params) => {
    return {
        type: actionTypes.FILTER_SUCCESS,
        shows: shows,
        params: params
    }
};

export const filterShows = (params) => {
    return (dispatch, getState) => {
        let {status, query} = getState().search;
        if (status || params.s) {
            let q = query ? query : params.s;
            dispatch(filterStart());
            axios.get('search/shows?q=' + q)
                .then(response => {
                    let shows = response.data.map(show => {
                        return show.show;
                    });
                    dispatch(filterSuccess(shows, params));
                })
                .catch(err => {
                })
        } else {
            dispatch(filterStart());
            axios.get('/shows?page=0')
                .then(response => {
                    dispatch(filterSuccess(response.data, params));
                })
                .catch(err => {
                })
        }
    }
};
