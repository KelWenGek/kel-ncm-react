import React from 'react';
import { Route, Switch } from 'react-router';
import ConnectedRouter from './ConnectedRouter';
import { createBrowserHistory as createHistory } from "history";
import Bundle from './Bundle'
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
                        <Bundle load={route.component}>
                            {
                                Mod => <Mod {...props} {...extraProps} route={route} />
                            }
                        </Bundle>
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
        component: () => import('@/components/Home')
    },
    {
        name: 'playlist',
        path: '/m/playlist/:id',
        component: () => import('@/components/Playlist')
    },
    {
        name: 'song',
        path: '/m/song/:id',
        component: () => import('@/components/SongDetail')
    },
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