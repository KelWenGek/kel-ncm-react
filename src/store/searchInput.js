import { createTypes, completeTypes, completeReducer } from '@/compose';
export const actions = createTypes(completeTypes(['SET_SEARCH_KEYWORD', 'CLEAR_SEARCH_KEYWORD', 'GET_SEARCH_RESULT_SUCCESS']), 'HOME')
const actionReducerMap = completeReducer(
    function () {
        return {
            actionCreators: {
                onSet: (keyword) => ({
                    type: actions.SET_SEARCH_KEYWORD,
                    payload: keyword
                }),
                onClear: () => ({
                    type: actions.CLEAR_SEARCH_KEYWORD
                })
            },
            reducerHandlers: {
                [actions.SET_SEARCH_KEYWORD](state, action) {
                    return {
                        ...state,
                        SearchKeyword: action.payload
                    }
                },
                [actions.CLEAR_SEARCH_KEYWORD](state, action) {
                    return {
                        ...state,
                        SearchKeyword: '',
                        SearchResult: null,
                        SearchSuggest: null
                    }
                }
            }
        }
    },
    {
        target: 'SearchKeyword'
    }
);

export default actionReducerMap;

