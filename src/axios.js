import axios from 'axios';
import store from './store/store';

export const api = axios.create({
    baseURL: 'http://api.tvmaze.com/'
});
api.interceptors.response.use(response => {
    return response.data
});

export const backend = axios.create({
    baseURL: "http://fleet-management.local/api/"//"https://agile-basin-94102.herokuapp.com/api/";
});
backend.interceptors.response.use(response => {
    return response.data
});

const token = store.getState().auth.token;
if (token) {
    backend.defaults.headers.common.Authorization = `Bearer ${token}`;
}

