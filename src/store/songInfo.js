import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
export const actions = createTypes(completeTypes(['GET_SONG_DETAIL']), 'SONG')
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
                                    {
                                        data: data.songs[0]
                                    }
                                )
                            );
                            return Promise.resolve(data.songs[0]);
                        } else {
                            let err = {
                                message: '获取歌曲详情失败'
                            };
                            dispatch(actionCreators.onFailure(err));
                        }
                    });
                }
            }
        }
    },
    {
        target: 'Song',
        primaryActions: [actions.GET_SONG_DETAIL]
    }
);

export default actionReducerMap;

