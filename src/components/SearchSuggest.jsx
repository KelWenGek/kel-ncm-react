import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce';
import axios from 'axios'
import SearchResultARMap from '@/store/searchResult'
export default connect(
    ({ app: { SearchKeyword, SearchSuggest, SearchResult, SearchSuggestLoading } }) => ({ SearchKeyword, SearchSuggest, SearchResult, SearchSuggestLoading }),
    {
        onSearchResultAsync: SearchResultARMap.actionCreators.onAsync
    }
)(
    class SearchSuggestComp extends Component {
        render() {
            let { SearchKeyword, SearchSuggest, SearchResult, SearchSuggestLoading, onSearchResultAsync } = this.props,
                hasSuggest = SearchSuggest && SearchSuggest.data.length > 0,
                hasResult = SearchResult && SearchResult.data.length > 0;
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
    })
