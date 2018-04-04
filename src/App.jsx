import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createRouter from '@/router';
import store from '@/store'
const Router = createRouter();
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {Router}
            </Provider>
        )
    }
}