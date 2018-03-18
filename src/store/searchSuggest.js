import { createTypes, completeTypes, completeReducer } from '@/compose';
import { fetch } from '@/config/request'
import { OK } from '@/constants/STATUS_CODE'
export const actions = createTypes(completeTypes(['GET_SEARCH_SUGGEST', 'CLEAR_SEARCH_KEYWORD', 'GET_SEARCH_RESULT_SUCCESS']), 'HOME')
const actionReducerMap = completeReducer(
    function (reducerHandlers, actionCreators) {
        return {
            actionCreators: {
                onAsync: keyword => async dispatch => {
                    dispatch({ type: actions.GET_SEARCH_RESULT_SUCCESS, payload: null, target: 'SearchResult' });
                    return fetch({
                        options: {
                            url: `/search/suggest?keywords=${keyword}`
                        },
                        dispatch,
                        actionCreators
                    }).then(({ data }) => {
                        if (data.code === 200) {
                            dispatch(actionCreators.onSuccess({
                                loaded: true,
                                data: data.result.songs || []
                            }));
                        } else {
                            let err = {
                                message: '获取搜索建议失败'
                            };
                            dispatch(actionCreators.onFailure(err));
                        }
                    });
                }
            }
        }
    },
    {
        target: 'SearchSuggest',
        primaryActions: [actions.GET_SEARCH_SUGGEST]
    });
export default actionReducerMap;

