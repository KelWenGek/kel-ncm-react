import { mergeDeep } from 'immutable';
import { completeModule, createReducer } from '@/state-management-composer';
import httpClient from '@/config/request';
import * as API from '@/constants/API';
import { OK } from '@/constants/STATUS_CODE'
const definition = completeModule(
    {
        namespace: 'HOME',
        mapTypesToModule: ['CHANGE_TAB_INDEX'],
        mapTargetsToModule: ['hotList', 'recoPlaylist', 'recoNewsg'],
        mapDefinitionToModule({ types, reducerHandlers, actionCreators }) {
            return {
                initialState: {
                    curTabIndex: 0
                },
                actionCreators: {
                    ...actionCreators,
                    onTabChange: index => ({ type: types.CHANGE_TAB_INDEX, payload: index }),
                    onRecoNewsgAsync: () => async dispatch => {

                        await httpClient({
                            url: API.GET_HOME_NEWSONGS,
                            shouldLoading: true,
                            target: 'recoNewsg',
                            error: {
                                message: '获取最新歌曲失败'
                            }
                        }).then(({ data }) => {
                            if (data.code === OK) {
                                dispatch(actionCreators.onRecoNewsgSuccess({
                                    data: {
                                        loaded: true,
                                        data: data.result
                                    }
                                }));
                            }
                        });
                    },
                    onRecoPlaylistAsync: () => async dispatch => {

                        await httpClient({
                            url: API.GET_HOME_PLAYLIST,
                            shouldLoading: true,
                            target: 'recoPlaylist',
                            error: {
                                message: '获取推荐歌单失败'
                            }
                        }).then(({ data }) => {
                            if (data.code === OK) {
                                dispatch(actionCreators.onRecoPlaylistSuccess({
                                    data: {
                                        loaded: true,
                                        data: data.result
                                    }
                                }));
                            }
                        });
                    },
                    onHotListAsync: id => async dispatch => {
                        await httpClient({
                            url: API.GET_HOME_TOP,
                            params: {
                                idx: id || 1
                            },
                            shouldLoading: true,
                            target: 'hotList',
                            error: {
                                message: '获取热门歌曲失败'
                            }
                        }).then(({ data }) => {
                            if (data.code === OK) {
                                dispatch(actionCreators.onHotListSuccess({
                                    data: {
                                        loaded: true,
                                        data: data.playlist.tracks
                                    }
                                }));
                            }
                        })
                    }
                },
                reducerHandlers: {
                    ...reducerHandlers,
                    [types.CHANGE_TAB_INDEX](state, action) {
                        return {
                            ...state,
                            curTabIndex: action.payload
                        }
                    }
                }
            }
        }
    }
);

const reducer = createReducer(definition.result.initialState, definition.result.reducerHandlers);
export { definition, reducer };

