import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce';
import SearchInputARMap from '@/store/searchInput';
import SearchSuggestARMap from '@/store/searchSuggest';
import SearchResultARMap from '@/store/searchResult';
import cn from 'classnames'
export default connect(
    ({ app: { SearchKeyword } }) => ({ SearchKeyword }),
    {
        onKeywordSet: SearchInputARMap.actionCreators.onSet,
        onKeywordClear: SearchInputARMap.actionCreators.onClear,
        onSearchSuggestAsync: SearchSuggestARMap.actionCreators.onAsync,
        onSearchResultAsync: SearchResultARMap.actionCreators.onAsync

    }
)(
    class SearchInputComp extends Component {

        constructor(props) {
            super(props);
            this.getSearchSuggest = debounce(this.props.onSearchSuggestAsync.bind(this), 700);
        }

        //搜索关键字变化时
        onKeywordChange = (e) => {
            let { onKeywordSet, onKeywordClear } = this.props;
            let value = e.target.value;
            onKeywordSet(value);
            if (!value) {
                onKeywordClear();
            } else {
                this.getSearchSuggest(value);
            }
        }

        getSearchResultByKeyword = () => {
            let { onSearchResultAsync, SearchKeyword } = this.props;
            onSearchResultAsync(SearchKeyword);
        }


        render() {
            let { SearchKeyword, onKeywordClear } = this.props;
            let hasWord = SearchKeyword.length > 0;
            return (
                <form className="m-input f-bd f-bd-btm" method="get" action="#">
                    <div className="inputcover">
                        <i className="u-svg u-svg-srch" onClick={this.getSearchResultByKeyword}></i>
                        <input
                            type="search"
                            name="search"
                            className="input"
                            placeholder=""
                            value={SearchKeyword}
                            autoComplete="off"
                            onChange={this.onKeywordChange}
                        />
                        <label className="holder">{hasWord ? '' : '搜索歌曲、歌手、专辑'}</label>
                        <figure className="close" onClick={onKeywordClear}>
                            <i className={cn('u-svg', 'u-svg-empty', { 'z-show': hasWord })}></i>
                        </figure>
                    </div>
                </form>
            )
        }
    });