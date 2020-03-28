import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import shows from './store/reducers/shows';
import auth from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();

const reducer = combineReducers({
    shows: shows,
    auth: auth
});
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);
