import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
export const actions = createTypes(completeTypes(['GET_HOME_RECO_NEWSG']), 'HOME')
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
                                message: '获取最新歌曲失败'
                            };
                            dispatch(actionCreators.onFailure(err));
                        }
                    });
                }
            }
        }
    },
    {
        target: 'HomeRecoNewsg',
        primaryActions: [actions.GET_HOME_RECO_NEWSG]
    }
);

export default actionReducerMap;

