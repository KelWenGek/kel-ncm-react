import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
import lyricConverter from '@/shared/lyric';
import SongPlayARMap from './songPlay';
export const actions = createTypes(completeTypes(['GET_SONG_LYRIC', 'SET_OTHER_DATA', 'SET_LYRIC_INDEX']), 'SONG_LYRIC')
const actionReducerMap = completeReducer(
    function (reducerHandlers, actionCreators) {
        return {
            reducerHandlers: {
                [actions.SET_LYRIC_INDEX](state, action) {
                    state.LyricIndex = action.payload;
                    return state;
                },
                [actions.SET_OTHER_DATA](state, action) {
                    state.SongLyric.data = Object.assign({}, state.SongLyric.data, { _other: action.payload });
                    return state;
                }
            },
            actionCreators: {
                onSetLyricIndex(payload) {
                    return {
                        type: actions.SET_LYRIC_INDEX,
                        payload
                    }
                },
                onSetOtherData(payload) {
                    return {
                        type: actions.SET_OTHER_DATA,
                        payload
                    }
                },
                onAsync: options => async (dispatch, getState) => {
                    return fetch({
                        options, dispatch, actionCreators
                    }).then(({ data }) => {
                        if (data.code === 200) {
                            dispatch(
                                actionCreators.onSuccess(
                                    {
                                        loaded: true,
                                        data: lyricConverter.parseFinalLyricMap(data)
                                    }
                                )
                            );
                        } else {
                            let err = {
                                message: '获取歌词信息失败'
                            };
                            dispatch(actionCreators.onFailure(err));
                        }
                    });
                }
            }
        }
    },
    {
        target: 'SongLyric',
        primaryActions: [actions.GET_SONG_LYRIC]
    }
);

export default actionReducerMap;

