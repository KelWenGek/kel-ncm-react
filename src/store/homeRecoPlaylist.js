import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
export const actions = createTypes(completeTypes(['GET_HOME_RECO_PLAYLIST']), 'HOME')
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
                                data: data.result
                            }));
                        } else {
                            let err = {
                                message: '获取推荐歌单失败'
                            };
                            dispatch(actionCreators.onFailure(err));
                        }
                    });
                }
            }
        }
    },
    {
        target: 'HomeRecoPlaylist',
        primaryActions: [actions.GET_HOME_RECO_PLAYLIST]
    }
);
export default actionReducerMap;

