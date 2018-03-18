import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '@/store/';
import createRouter, { history } from '@/router/';
const Router = createRouter();
const store = createStore(combineReducers({
    app: rootReducer,
    router: routerReducer
}), composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)));

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {Router}
            </Provider>
        )
    }
}