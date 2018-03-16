import React from 'react';
import { Route, Switch } from 'react-router';
import ConnectedRouter from './ConnectedRouter';
import { createBrowserHistory as createHistory } from "history";
import Home from '@/components/Home';
import Playlist from '@/components/Playlist';
export const history = createHistory();

export const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
    routes ? (
        <Switch {...switchProps}>
            {routes.map((route, i) => (
                <Route
                    key={route.key || i}
                    path={route.path}
                    exact={route.exact}
                    strict={route.strict}
                    render={props => (
                        <route.component {...props} {...extraProps} route={route} />
                    )}
                />
            ))}
        </Switch>
    ) : null;

export const routes = [
    {
        name: 'home',
        path: '/',
        exact: true,
        component: Home
    },
    {
        name: 'playlist',
        path: '/m/playlist/:id',
        component: Playlist
    }
];

export default function createRouter() {
    return (
        <ConnectedRouter history={history}>
            {
                renderRoutes(routes)
            }
        </ConnectedRouter>
    );
}