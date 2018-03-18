import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
export const actions = createTypes(completeTypes(['GET_SONG_PLAY', 'SET_PLAYING_STATUS']), 'SONG_PLAY')
const actionReducerMap = completeReducer(
    function (reducerHandlers, actionCreators) {
        return {
            reducerHandlers: {
                [actions.SET_PLAYING_STATUS](state, action) {
                    state.SongPlay.data = Object.assign({}, state.SongPlay.data, { playing: action.payload })
                    return state;
                }
            },
            actionCreators: {
                onPlayingSet(payload) {
                    return {
                        type: actions.SET_PLAYING_STATUS,
                        payload
                    }
                },
                onAsync: options => async (dispatch, getState) => {
                    return fetch({
                        options, dispatch, actionCreators
                    }).then(({ data }) => {
                        if (data.code === 200) {
                            let result = Object.assign({}, data.data[0] || {}, { playing: false });
                            dispatch(
                                actionCreators.onSuccess(
                                    {
                                        loaded: true,
                                        data: result
                                    }
                                )
                            );
                            return Promise.resolve(result);
                        } else {
                            let err = {
                                message: '获取歌曲链接失败'
                            };
                            dispatch(actionCreators.onFailure(err));
                        }
                    });
                }
            }
        }
    },
    {
        target: 'SongPlay',
        primaryActions: [actions.GET_SONG_PLAY]
    }
);

export default actionReducerMap;

