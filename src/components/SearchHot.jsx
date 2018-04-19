import React, { Component } from 'react'
import { connect } from 'react-redux'
import { definition as searchDefinition } from '@/store/search';
export default connect(
    ({ search: { searchHot, searchResult, searchKeyword } }) => ({ SearchHot: searchHot, SearchResult: searchResult, SearchKeyword: searchKeyword }),
    { onSearchResultAsync: searchDefinition.result.actionCreators.onSearchResultAsync }
)(
    class SearchHotComp extends Component {
        render() {
            let { SearchHot, SearchResult, SearchKeyword, onSearchResultAsync } = this.props;
            let hasHot = SearchHot.data && SearchHot.data.length > 0, hasResult = SearchResult.data && SearchResult.data.length > 0;
            return (
                !SearchKeyword && !hasResult &&
                < section className="m-hotlist" >
                    <h3 className="title">热门搜索</h3>
                    <ul className="list">
                        {
                            hasHot && SearchHot.data.map((h, index) => {
                                return (
                                    <li key={index} className="item f-bd f-bd-full" onClick={() => onSearchResultAsync(h.first)}>
                                        <a className="link" href="javascript:void(0);">{h.first}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section >
            );
        }
    }
)
