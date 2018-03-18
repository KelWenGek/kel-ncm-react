import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request';
import { OK } from '@/constants/STATUS_CODE'
export const actions = createTypes(completeTypes(['GET_SEARCH_RESULT', 'SET_SEARCH_KEYWORD']), 'HOME')
const actionReducerMap = completeReducer(
    function (reducerHandlers, actionCreators) {
        return {
            actionCreators: {
                onAsync: keyword => async dispatch => {
                    dispatch({ type: actions.SET_SEARCH_KEYWORD, payload: keyword });
                    return fetch({
                        options: {
                            url: `/search?keywords=${keyword}`
                        },
                        dispatch,
                        actionCreators
                    }).then(({ data }) => {
                        if (data.code === 200) {
                            dispatch(actionCreators.onSuccess({
                                loaded: true,
                                data: data.result.songs || []
                            }))
                        } else {
                            let err = {
                                message: '获取搜索结果失败'
                            };
                            dispatch(actionCreators.onFailure(err));
                        }
                    })
                }
            }
        }
    },
    {
        target: 'SearchResult',
        primaryActions: [actions.GET_SEARCH_RESULT]
    });


export default actionReducerMap;


