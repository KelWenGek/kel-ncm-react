import React, { Component } from 'react'
import { connect } from 'react-redux'
import EmptyComp from '@/components/Empty'

export default connect(
    ({ app: { home: { recoPlaylist, recoPlaylistLoading } } }) => ({ HomeRecoPlaylist: recoPlaylist, HomeRecoPlaylistLoading: recoPlaylistLoading })
)(
    class HomeRecoPlaylistComp extends Component {
        render() {
            let { HomeRecoPlaylist, HomeRecoPlaylistLoading } = this.props,
                hasItem = HomeRecoPlaylist.data && HomeRecoPlaylist.data.length > 0,
                recoPlaylist = hasItem ? [HomeRecoPlaylist.data.slice(0, 3), HomeRecoPlaylist.data.slice(3, 6)] : [];
            return (
                <div>
                    <h2 className="remd_tl">
                        推荐歌单
                    </h2>
                    <div className="remd_songs">
                        {
                            HomeRecoPlaylistLoading
                                ? <div className="u-spin"></div>
                                : hasItem
                                    ? recoPlaylist.map((list) => {
                                        return (
                                            <div key={list[0].id} className="remd_ul" >
                                                {
                                                    list.map(item => {
                                                        let { id, name, picUrl, playCount } = item;
                                                        return (
                                                            <a key={id} className="remd_li" href={`/m/playlist/${id}`}>
                                                                <div className="remd_img">
                                                                    <img className="u-img" src={picUrl} />
                                                                    <span className="u-earp remd_lnum">{`${(playCount / 10e4).toFixed(1)}万`}</span>
                                                                </div>
                                                                <p className="remd_text">{name}</p>
                                                            </a>
                                                        );
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                    : <EmptyComp />
                        }
                    </div>
                </div>
            );
        }
    })