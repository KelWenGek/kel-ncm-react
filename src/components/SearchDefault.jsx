import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchHotComp from '@/components/SearchHot'
import SearchHotARMap from '@/store/searchHot'
// import SearchHistoryComp from '@/components/SearchHistory'
export default connect(
    ({ app: { SearchHot } }) => ({ SearchHot }),
    { onSearchHotAsync: SearchHotARMap.actionCreators.onAsync }
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