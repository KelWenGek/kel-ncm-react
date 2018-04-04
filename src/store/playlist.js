import { mergeDeep } from 'immutable';
import { completeModule, createReducer } from '@/state-management-composer';
import httpClient from '@/config/request';
import * as API from '@/constants/API';
import { OK } from '@/constants/STATUS_CODE'
const definition = completeModule(
    {
        namespace: 'PLAYLIST',
        mapTypesToModule: [],
        mapTargetsToModule: ['playlist', 'playlistComment'],
        mapDefinitionToModule({ types, reducerHandlers, actionCreators }) {
            return {
                initialState: {},
                actionCreators: {
                    ...actionCreators,
                    onPlaylistAsync: params => async dispatch => {
                        return httpClient({
                            url: API.GET_PLAYLIST_DETAIL,
                            shouldLoading: true,
                            target: 'playlist',
                            error: {
                                message: '获取歌单详情失败'
                            },
                            params
                        }).then(({ data }) => {
                            if (data.code === OK) {
                                dispatch(actionCreators.onPlaylistSuccess({
                                    data: {
                                        loaded: true,
                                        data: data.playlist
                                    }
                                }));
                                return Promise.resolve(data.playlist);
                            }
                        });
                    },
                    onPlaylistCommentAsync: params => async dispatch => {
                        await httpClient({
                            url: API.GET_PLAYLIST_COMMENT,
                            error: {
                                message: '获取歌单评论失败'
                            },
                            target: 'playlistComment',
                            params
                        }).then(({ data }) => {
                            if (data.code === OK) {
                                dispatch(actionCreators.onPlaylistCommentSuccess({
                                    data: {
                                        loaded: true,
                                        data: data
                                    }
                                }));
                            }
                        });
                    }
                },
                reducerHandlers: {
                    ...reducerHandlers
                }
            }
        }
    }
);

const reducer = createReducer(definition.result.initialState, definition.result.reducerHandlers);
export { definition, reducer };

