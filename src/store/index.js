

import { createReducer, completeState, combineReducer } from '@/compose';
import homeTabCurIdx from './homeTabCurIdx';
import homeHotList from './homeHotList';
import homeRecoNewsg from './homeRecoNewsg';
import homeRecoPlaylist from './homeRecoPlaylist';



export default createReducer(
    completeState(
        {
            HomeTabCurIdx: 0,
            HomeRecoNewsg: {
                loaded: false,
                data: []
            },
            HomeRecoPlaylist: {
                loaded: false,
                data: []
            },
            HomeHotList: {
                loaded: false,
                data: []
            },
            SearchKeyword: '',
            SearchSuggest: [],
            SearchResult: [],
            SearchHot: []
        },
        ['HomeTabCurIdx', 'SearchKeyword']
    ),
    combineReducer([
        homeTabCurIdx,
        homeHotList,
        homeRecoNewsg,
        homeRecoPlaylist
    ])
);

