import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import shows from "./reducers/shows";
import auth from "./reducers/auth";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();

const reducer = combineReducers({
    shows: shows,
    auth: auth
});
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store