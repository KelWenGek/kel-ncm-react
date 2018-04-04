import React, { Component } from 'react'
import { connect } from 'react-redux'
import { definition as searchDefinition } from '@/store/search';

export default connect(
    ({ app: { search: { searchResult, searchResultLoading, searchKeyword } } }) => ({ SearchResult: searchResult, SearchResultLoading: searchResultLoading, SearchKeyword: searchKeyword })
)(class SearchResultComp extends Component {
    render() {
        let { SearchResult, SearchKeyword, SearchResultLoading } = this.props,
            hasResult = SearchResult.data && SearchResult.data.length > 0;
        return (
            <div className="m-searchresult">
                {
                    SearchResultLoading
                        ? <div className="u-spin"></div>
                        : hasResult &&
                        <section className="m-songlist">
                            <div className="m-sglst">
                                {
                                    SearchResult.data.map(({ id, name, artists, album, alias }) => (
                                        <a className="m-sgitem" key={id} href={`/m/song/${id}`}>
                                            <div className="sgfr f-bd f-bd-btm">
                                                <div className="sgchfl">
                                                    <div className="f-thide sgtl">{`${name}`}
                                                        {
                                                            alias.length ?
                                                                <span className="sgalia">
                                                                    {`(${alias.join(' ')})`}
                                                                </span> : null
                                                        }
                                                    </div>
                                                    <div className="f-thide sginfo">
                                                        {/* {
                                                cd ? <i className="u-hmsprt sghot"></i> : null
                                            } */}
                                                        {artists.map(a => a.name).join(' / ')} - {album.name}
                                                    </div>
                                                </div>
                                                <div className="sgchfr">
                                                    <span className="u-hmsprt sgchply"></span>
                                                </div>
                                            </div>
                                        </a>
                                    ))
                                }
                            </div>
                        </section>

                }
            </div>
        )
    }
})
