import { mergeDeep } from 'immutable';
import { completeModule, createReducer } from '@/state-management-composer';
import httpClient from '@/config/request';
import * as API from '@/constants/API';
import { OK } from '@/constants/STATUS_CODE';
import lyricConverter from '@/shared/lyric';
const definition = completeModule(
    {
        namespace: 'SONG',
        mapTypesToModule: ['SET_OTHER_DATA', 'SET_LYRIC_INDEX', 'SET_PLAYING_STATUS'],
        mapTargetsToModule: ['song', 'songLyric', 'songPlay'],
        mapDefinitionToModule({ types, reducerHandlers, actionCreators }) {
            return {
                initialState: {
                },
                actionCreators: {
                    ...actionCreators,
                    onSetLyricCurrentIndex(payload) {
                        return {
                            type: types.SET_LYRIC_INDEX,
                            payload
                        }
                    },
                    onSetLyricOtherData(payload) {
                        return {
                            type: types.SET_OTHER_DATA,
                            payload
                        }
                    },
                    onSetPlayingStatus(payload) {
                        return {
                            type: types.SET_PLAYING_STATUS,
                            payload
                        }
                    },
                    onSongDetailAsync: id => async dispatch => {
                        await httpClient({
                            url: API.GET_SONG_DETAIL,
                            params: {
                                ids: id
                            },
                            shouldLoading: true,
                            target: 'song',
                            error: {
                                message: '获取歌曲详情失败'
                            }
                        }).then(({ data }) => {
                            if (data.code === OK) {
                                dispatch(
                                    actionCreators.onSongSuccess(
                                        {
                                            data: {
                                                data: data.songs[0]
                                            }
                                        }
                                    )
                                );
                                return Promise.resolve(data.songs[0]);
                            }
                        });
                    },
                    onSongLyricAsync: id => async dispatch => {
                        await httpClient({
                            url: API.GET_SONG_LYRIC,
                            params: {
                                id
                            },
                            shouldLoading: true,
                            target: 'songLyric',
                            error: {
                                message: '获取歌词信息失败'
                            }
                        }).then(({ data }) => {
                            if (data.code === OK) {
                                dispatch(
                                    actionCreators.onSongLyricSuccess(
                                        {
                                            data: {
                                                loaded: true,
                                                data: lyricConverter.parseFinalLyricMap(data)
                                            }
                                        }
                                    )
                                );
                            }
                        });
                    },
                    onSongPlayAsync: id => async dispatch => {
                        return httpClient({
                            url: API.GET_SONG_PLAY,
                            params: {
                                id
                            },
                            error: {
                                message: '获取歌曲链接失败'
                            }
                        }).then(({ data }) => {
                            if (data.code === 200) {
                                let result = Object.assign({}, data.data[0] || {}, { playing: true });
                                dispatch(
                                    actionCreators.onSongPlaySuccess(
                                        {
                                            data: {
                                                loaded: true,
                                                data: result
                                            }
                                        }
                                    )
                                );
                                return Promise.resolve(result);
                            }
                        });
                    }

                },
                reducerHandlers: {
                    ...reducerHandlers,
                    [types.SET_LYRIC_INDEX](state, action) {
                        state.lyricIndex = action.payload;
                        return state;
                    },
                    [types.SET_OTHER_DATA](state, action) {
                        state.songLyric.data._other = action.payload;
                        return state;
                    },
                    [types.SET_PLAYING_STATUS](state, action) {
                        return mergeDeep(state, {
                            songPlay: {
                                data: {
                                    playing: action.payload
                                }
                            }
                        });
                    }
                }
            }
        }
    }
);

const reducer = createReducer(definition.result.initialState, definition.result.reducerHandlers);
export { definition, reducer };

