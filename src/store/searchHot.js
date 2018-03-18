import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
import { OK } from '@/constants/STATUS_CODE';
export const actions = createTypes(completeTypes(['GET_SEARCH_HOT']), 'HOME')
const actionReducerMap = completeReducer(
    function (reducerHandlers, actionCreators) {
        return {
            actionCreators: {
                onAsync: () => async dispatch => {
                    return fetch({
                        options: {
                            url: '/search/hot'
                        },
                        dispatch,
                        actionCreators
                    }).then(({ data }) => {
                        if (data.code === OK) {
                            dispatch(actionCreators.onSuccess({
                                loaded: true,
                                data: data.result.hots
                            }))
                        } else {
                            let err = {
                                message: '获取歌单详情失败'
                            };
                            dispatch(actionCreators.onFailure(err))
                        }
                    })
                }
            }
        }
    },
    {
        target: 'SearchHot',
        primaryActions: [actions.GET_SEARCH_HOT]
    }
);


export default actionReducerMap;


