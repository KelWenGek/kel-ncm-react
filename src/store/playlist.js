import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
export const actions = createTypes(completeTypes(['GET_PLAYLIST', 'GET_PLAYLIST_COMMENT']), 'PLAYLIST')
const actionReducerMap = completeReducer(
    function (reducerHandlers, actionCreators) {
        return {
            actionCreators: {
                onAsync: options => async (dispatch, getState) => {
                    return fetch({
                        options, dispatch, actionCreators
                    }).then(({ data }) => {
                        if (data.code === 200) {
                            dispatch(
                                actionCreators.onSuccess(
                                    Object.assign({}, getState().app.Playlist || {}, data.playlist)
                                )
                            );
                            return Promise.resolve(data.playlist);
                        } else {
                            let err = {
                                message: '获取歌单详情失败'
                            };
                            dispatch(actionCreators.onFailure(err));
                        }
                    });;
                },
                onAsyncComment: options => async (dispatch, getState) => {
                    return fetch({
                        options, dispatch, actionCreators
                    }).then(({ data }) => {
                        if (data.code === 200) {
                            dispatch(
                                actionCreators.onSuccess(
                                    Object.assign({}, getState().app.Playlist || {}, { cmt: data })
                                )
                            );
                        } else {
                            let err = {
                                message: '获取歌单评论失败'
                            };
                            dispatch(actionCreators.onFailure(err));
                        }
                    });
                }
            }
        }
    },
    {
        target: 'Playlist',
        primaryActions: [actions.GET_PLAYLIST, actions.GET_PLAYLIST_COMMENT]
    }
);

export default actionReducerMap;

