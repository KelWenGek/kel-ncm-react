import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
export const actions = createTypes(completeTypes(['GET_HOME_HOT_LIST']), 'HOME')
const actionReducerMap = completeReducer(
    function (reducerHandlers, actionCreators) {
        return {
            actionCreators: {
                onAsync: options => async dispatch => {
                    return fetch({
                        options, dispatch, actionCreators
                    }).then(({ data }) => {
                        if (data.code === 200) {
                            dispatch(actionCreators.onSuccess({
                                loaded: true,
                                data: data.playlist.tracks
                            }));
                        } else {
                            let err = {
                                message: '获取热门歌曲失败'
                            };
                            dispatch(actionCreators.onFailure(err));
                        }
                    });
                }
            }
        }
    },
    {
        target: 'HomeHotList',
        primaryActions: [actions.GET_HOME_HOT_LIST]
    }
);

export default actionReducerMap;

