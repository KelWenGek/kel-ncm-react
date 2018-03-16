import React, { Component } from 'react'
import { connect } from 'react-redux'
import EmptyComp from '@/components/Empty'
export default connect(
    ({ HomeRecoNewsg, HomeRecoNewsgLoading }) => ({ HomeRecoNewsg, HomeRecoNewsgLoading })
)(
    class HomeRecoNewsgComp extends Component {
        render() {
            let { HomeRecoNewsg, HomeRecoNewsgLoading } = this.props;
            return (
                <div>
                    <h2 className="remd_tl">
                        最新音乐
                    </h2>
                    <div className="remd_newsg">
                        {
                            HomeRecoNewsgLoading
                                ? <div className="u-spin"></div>
                                : <div className="m-sglst">
                                    {
                                        HomeRecoNewsg.data.length ? HomeRecoNewsg.data.map(({ id, name, song: { alias: alia, artists: ar, album: al } }) => (
                                            <a className="m-sgitem" key={id} href={`/m/song/${id}`}>

                                                <div className="sgfr f-bd f-bd-btm">
                                                    <div className="sgchfl">
                                                        <div className="f-thide sgtl">{`${name}`}
                                                            {
                                                                alia.length ?
                                                                    <span className="sgalia">
                                                                        {`(${alia.join(' ')})`}
                                                                    </span> : null
                                                            }
                                                        </div>
                                                        <div className="f-thide sginfo">
                                                            {/* {
                                                                cd ? <i className="u-hmsprt sghot"></i> : null
                                                            } */}
                                                            {ar.map(a => a.name).join(' / ')} - {al.name}
                                                        </div>
                                                    </div>
                                                    <div className="sgchfr">
                                                        <span className="u-hmsprt sgchply"></span>
                                                    </div>
                                                </div>
                                            </a>
                                        )) : <EmptyComp />
                                    }
                                </div>
                        }
                    </div>
                </div>
            );
        }
    })