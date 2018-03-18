

import { createReducer, completeState, combineReducer } from '@/compose';
import homeTabCurIdx from './homeTabCurIdx';
import homeHotList from './homeHotList';
import homeRecoNewsg from './homeRecoNewsg';
import homeRecoPlaylist from './homeRecoPlaylist';
import playlist from './playlist';
import searchHot from './searchHot';
import searchInput from './searchInput';
import searchResult from './searchResult';
import searchSuggest from './searchSuggest';
import songInfo from './songInfo';
import songPlay from './songPlay';
import songLyric from './songLyric';


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
            Playlist: null,
            SearchKeyword: '',
            SearchSuggest: null,
            SearchResult: null,
            SearchHot: null,
            LyricIndex: 0,
            Song: {
                loaded: false,
                data: null
            },
            SongLyric: {
                loaded: false,
                data: null
            },
            SongPlay: {
                loaded: false,
                data: null
            }

        },
        ['HomeTabCurIdx', 'SearchKeyword']
    ),
    combineReducer([
        homeTabCurIdx,
        homeHotList,
        homeRecoNewsg,
        homeRecoPlaylist,
        playlist,
        searchHot,
        searchInput,
        searchResult,
        searchSuggest,
        songInfo,
        songPlay,
        songLyric
    ])
);

