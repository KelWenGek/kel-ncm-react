import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { definition as playlistDefinition } from '@/store/playlist';
import PlaylistComment from './PlaylistComment';
@connect(
    ({ playlist: { playlist, playlistLoading } }) => ({ Playlist: playlist, PlaylistLoading: playlistLoading }),
    {
        onPlaylistAsync: playlistDefinition.result.actionCreators.onPlaylistAsync,
        onPlaylistCommentAsync: playlistDefinition.result.actionCreators.onPlaylistCommentAsync
    }
)
export default class Playlist extends Component {
    state = {
        isExpanded: false
    }
    handleExpand = () => {
        this.setState(prevState => {
            return {
                isExpanded: !prevState.isExpanded
            }
        })
    }
    componentDidMount() {
        let { match: { params }, Playlist, onPlaylistAsync, onPlaylistCommentAsync } = this.props;
        Playlist.loaded || onPlaylistAsync(params).then((result) => {
            document.title = result.name;
            onPlaylistCommentAsync(params)
        });
    }
    render() {
        let { Playlist, PlaylistLoading } = this.props, creator, tracks;
        let { isExpanded } = this.state;
        if (Playlist = Playlist.data) {
            ({ creator, tracks } = Playlist);
        }
        return (
            PlaylistLoading
                ? <span className="u-spin"></span>
                : Playlist
                    ? <div className="m-playlist u-paddlr u-paddbm">
                        <section className="u-plhead pylst_header">
                            <div className="plhead_bg" style={{ backgroundImage: `url("${Playlist.coverImgUrl}")` }}>
                            </div>
                            <div className="plhead_wrap">
                                <div className="plhead_fl lsthd_fl">
                                    <img className="u-img" src={Playlist.coverImgUrl} />
                                    <span className="lsthd_icon">歌单</span>
                                    <i className="u-earp lsthd_num">
                                        {
                                            `${(Playlist.playCount / Math.pow(10, 4)).toFixed(1)}万`
                                        }
                                    </i>
                                </div>
                                <div className="plhead_fr">
                                    <h2 className="f-thide2 f-brk lsthd_title">
                                        {Playlist.name}
                                    </h2>
                                    <div className="lsthd_auth f-thide">
                                        <a className="lsthd_link" href={`/m/user/${creator.userId}`}>
                                            <div className="u-avatar lsthd_ava">
                                                <img className="u-img" src={creator.avatarUrl} />
                                            </div>{creator.nickname}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="pylst_intro">
                            <div className="lstit_tags">
                                标签：
                                {
                                    Playlist.tags.map((tag, index) => {
                                        return <em key={index} className="f-bd f-bd-full lstit_tag">{tag}</em>
                                    })
                                }

                            </div>
                            <div className="u-intro" onClick={this.handleExpand}>
                                <div className={cn('f-brk', { 'f-thide3': !isExpanded })}>
                                    {
                                        Playlist.description.split('\n\n').map((desc, index) => {
                                            let elem = [];
                                            elem.push(<span key={`${index}-1`}>
                                                <i>
                                                    {desc}
                                                </i>
                                                <br />
                                            </span>)
                                            if (index != 0) {
                                                elem.unshift(<span key={`${index}-0`}>
                                                    <i> </i>
                                                    <br />
                                                </span>)
                                            }
                                            return elem;
                                        })
                                    }
                                </div>
                                <span className={cn('intro_arrow', [isExpanded ? 'u-arowup' : 'u-arowdown'])} ></span>
                            </div>
                        </section>
                        <div className="pylst_list">
                            <h3 className="u-smtitle">歌曲列表</h3>
                            <ol className="u-songs">
                                {
                                    tracks.map((item, index) => (
                                        // , { 'z-dis': item.copyright != 0 }
                                        <li className={cn('u-song')} key={item.id} >
                                            <div className="sgi_fl">{index + 1}</div>
                                            <div className="sgi_fr f-bd f-bd-btm">
                                                <div className="sgich_fl">
                                                    <div className="f-thide sgich_tl">
                                                        {item.name}
                                                    </div>
                                                    <div className="f-thide sgich_info">
                                                        {`${item.ar[0].name}-${item.al.name}`}
                                                    </div>
                                                </div>
                                                <div className="sgich_fr">
                                                    <span className="u-hmsprt sgich_ply"></span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>
                        <PlaylistComment />
                    </div >
                    : null
        )
    }
}


