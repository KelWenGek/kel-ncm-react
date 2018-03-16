import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '@/store/';
import createRouter from '@/router/';
const Router = createRouter();
const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {Router}
            </Provider>
        )
    }
}