import { completeModule, createReducer } from '@/state-management-composer';
import { mergeDeep } from 'immutable';
import httpClient from '@/config/request';
import * as API from '@/constants/API';
import { OK } from '@/constants/STATUS_CODE';
const definition = completeModule(
    {
        namespace: 'SEARCH',
        mapTypesToModule: ['SET_SEARCH_KEYWORD', 'CLEAR_SEARCH_KEYWORD'],
        mapTargetsToModule: ['searchHot', 'searchResult', 'searchSuggest'],
        mapDefinitionToModule({ types, reducerHandlers, actionCreators }) {
            return {
                initialState: {
                    searchKeyword: ''
                },
                actionCreators: {
                    ...actionCreators,
                    onKeywordSet: (keyword) => ({
                        type: types.SET_SEARCH_KEYWORD,
                        payload: keyword
                    }),
                    onKeywordClear: () => ({
                        type: types.CLEAR_SEARCH_KEYWORD
                    }),
                    onSearchHotAsync: () => async dispatch => {
                        await httpClient({
                            url: API.GET_SEARCH_HOT,
                            error: {
                                message: '获取热门搜索推荐失败'
                            }
                        }).then(({ data }) => {
                            if (data.code === OK) {
                                dispatch(actionCreators.onSearchHotSuccess({
                                    data: {
                                        loaded: true,
                                        data: data.result.hots
                                    }
                                }))
                            }
                        });
                    },
                    onSearchResultAsync: keyword => async dispatch => {
                        dispatch({ type: types.SET_SEARCH_KEYWORD, payload: keyword });
                        dispatch(actionCreators.onSearchResultLoading());
                        await httpClient({
                            url: API.GET_SEARCH_RESULT,
                            shouldLoading: true,
                            target: 'searchResult',
                            error: {
                                message: '获取搜索结果失败'
                            },
                            params: {
                                keywords: keyword
                            }
                        }).then(({ data }) => {
                            if (data.code === OK) {
                                dispatch(actionCreators.onSearchResultSuccess({
                                    data: {
                                        loaded: true,
                                        data: data.result.songs || []
                                    }
                                }))
                            }
                        });
                    },
                    onSearchSuggestAsync: keyword => async dispatch => {
                        dispatch({ type: types.SET_SEARCHRESULT_SUCCESS, payload: { data: [] } });
                        dispatch(actionCreators.onSearchSuggestLoading());
                        await httpClient({
                            url: API.GET_SEARCH_SUGGEST,
                            shouldLoading: true,
                            target: 'searchSuggest',
                            error: {
                                message: '获取搜索建议失败'
                            },
                            params: {
                                keywords: keyword
                            }
                        }).then(({ data }) => {
                            if (data.code === OK) {
                                dispatch(actionCreators.onSearchSuggestSuccess({
                                    data: {
                                        loaded: true,
                                        data: data.result.songs || []
                                    }
                                }));
                            }
                        });
                    }
                },
                reducerHandlers: {
                    ...reducerHandlers,
                    [types.SET_SEARCH_KEYWORD](state, action) {
                        return {
                            ...state,
                            searchKeyword: action.payload
                        }
                    },
                    [types.CLEAR_SEARCH_KEYWORD](state, action) {
                        return mergeDeep(state, {
                            searchKeyword: '',
                            searchResult: { data: [] },
                            searchSuggest: { data: [] }
                        })
                    }
                }
            }
        }
    }
);

const reducer = createReducer(definition.result.initialState, definition.result.reducerHandlers);
export { definition, reducer };

