import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce';
import { definition as searchDefinition } from '@/store/search';
@connect(
    ({ search: { searchKeyword, searchSuggest, searchResult, searchSuggestLoading } }) => ({ SearchKeyword: searchKeyword, SearchSuggest: searchSuggest, SearchResult: searchResult, SearchSuggestLoading: searchSuggestLoading }),
    {
        onSearchResultAsync: searchDefinition.result.actionCreators.onSearchResultAsync
    }
)
export default class SearchSuggestComp extends Component {
    render() {
        let { SearchKeyword, SearchSuggest, SearchResult, SearchSuggestLoading, onSearchResultAsync } = this.props,
            hasSuggest = SearchSuggest.data && SearchSuggest.data.length > 0,
            hasResult = SearchResult.data && SearchResult.data.length > 0;
        return (
            (!hasResult && SearchKeyword) &&
            <section className="m-recom" >
                <h3 className="title f-bd f-bd-btm f-thide" onClick={() => onSearchResultAsync(SearchKeyword)}>
                    {`搜索"${SearchKeyword}"`}
                </h3>
                <ul>
                    {
                        SearchSuggestLoading
                            ? <div className="u-spin"></div>
                            : hasSuggest && SearchSuggest.data.map(({ id, name }) => (
                                <li key={id} className="recomitem" onClick={() => onSearchResultAsync(name)}>
                                    <i className="u-svg u-svg-search"></i>
                                    <span className="f-bd f-bd-btm f-thide">
                                        {name}
                                    </span>
                                </li>
                            ))
                    }

                </ul>
            </section >
        )
    }
}
