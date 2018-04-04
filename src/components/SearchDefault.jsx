import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchHotComp from '@/components/SearchHot'
import { definition as searchDefinition } from '@/store/search';
// import SearchHistoryComp from '@/components/SearchHistory'
export default connect(
    ({ app: { search: { searchHot } } }) => ({ SearchHot: searchHot }),
    { onSearchHotAsync: searchDefinition.result.actionCreators.onSearchHotAsync }
)(
    class SearchDefaultComp extends Component {

        componentDidMount() {

            let { SearchHot, onSearchHotAsync } = this.props;
            (!SearchHot || !SearchHot.loaded) && onSearchHotAsync();
        }

        render() {
            return (
                < div className="m-default" >
                    <SearchHotComp />
                    {/* <SearchHistoryComp />  */}
                </div >
            )
        }
    }
)