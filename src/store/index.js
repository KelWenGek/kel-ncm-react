import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { history } from '@/router/';
import { reducer as homeReducer } from './home';
import { reducer as searchReducer } from './search';
import { reducer as playlistReducer } from './playlist';
import { reducer as songReducer } from './song';
export default createStore(combineReducers({
    app: combineReducers({
        home: homeReducer,
        search: searchReducer,
        playlist: playlistReducer,
        song: songReducer
    }),
    router: routerReducer
}), composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)));
