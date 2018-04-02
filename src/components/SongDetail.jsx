import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { GET_SONG_DETAIL, GET_SONG_PLAY } from '@/constants/API'
// import lyricConverter from '@/shared/lyric'
import SongInfoARMap from '@/store/songInfo'
import SongPlayARMap from '@/store/songPlay'
import SongLyricARMap from '@/store/songLyric'
import SongInfoComp from './SongInfo'
import SongLyricComp from './SongLyric'
import SongPlayComp from './SongPlay'
export default connect(
    ({ app: { Song, SongLyric, SongError, SongPlayError } }) => ({ Song, SongLyric, SongError, SongPlayError }),
    {
        onSongInfoSuccess: SongInfoARMap.actionCreators.onSuccess,
        onSongInfoAsync: SongInfoARMap.actionCreators.onAsync,
        onSongPlayAsync: SongPlayARMap.actionCreators.onAsync
        // ,
        // onSongLyricAsync: SongLyricARMap.actionCreators.onAsync
        // ,
        // onSetLyricOtherData: SongLyricARMap.actionCreators.onSetOtherData
    }
)(
    class SongDetail extends Component {
        static childContextTypes = {
            transform: PropTypes.string,
            parent: PropTypes.object
        }
        getChildContext() {
            return {
                parent: this,
                transform: function (e) {
                    var t = ["transform", "webkitTransform", "msTransform", "MozTransform"];
                    for (var n in t)
                        if (void 0 !== e.style[t[n]])
                            return t[n];
                    return t[1];
                }(document.createElement("div"))
            }
        }
        componentDidMount() {
            let { match: { params: { id } },
                SongPlayError,
                SongError,
                onSongInfoAsync,
                onSongPlayAsync,
                onSongInfoSuccess,
                onSongLyricAsync
            } = this.props;
            Promise.all(
                [
                    onSongInfoAsync({
                        url: GET_SONG_DETAIL,
                        params: {
                            ids: id
                        }
                    }),
                    onSongPlayAsync({
                        url: GET_SONG_PLAY,
                        params: {
                            id
                        }
                    })
                ]
            ).then((res) => {
                //歌曲信息和链接都获取成功之后
                onSongInfoSuccess(Object.assign({}, { data: res[0] }, {
                    loaded: true
                }));
            })
            // .then(() => {
            //     if (!SongError && !SongPlayError) {
            //         onSongLyricAsync({
            //             url: GET_SONG_LYRIC,
            //             params: {
            //                 id
            //             }
            //         })
            //     }
            // });
        }
        onChangePlayStatus = (status) => {
            this.playComp.el[status]();
        }
        onResetLyricTimer = (status) => {
            let wrappedLyricComp = this.lyricComp;
            status
                ? wrappedLyricComp.addLyricScrollerTimer(this.playComp.el)
                : wrappedLyricComp.removeLyricScrollerTimer()
        }
        onSetTransformStyle = () => {
            this.infoComp.setTransformStyle();
        }
        render() {
            let { Song } = this.props,
                SongData = Song.data,
                bgStyle;
            SongData && (bgStyle = {
                backgroundImage: `url( "//music.163.com/api/img/blur/${SongData.al.pic_str}")`,
                opacity: 1
            });
            return (
                <div id="j-app" className="u-height" >
                    {
                        !Song.loaded
                            ? <span className="u-spin" ></span>
                            :
                            SongData &&
                            <div className="m-newsong">
                                <div className="m-song-bg" style={bgStyle}></div>
                                <div className="m-scroll_wrapper m-song_nor j-songsrl">
                                    <div className="m-scroll_scroller m-scroll_scroller_vertical">
                                        <div className="m-song_newfst">
                                            {/* <span className="m-logo"></span> */}
                                            <SongInfoComp
                                                ref={infoComp => this.infoComp = infoComp && infoComp.getWrappedInstance()}
                                                onChangePlayStatus={this.onChangePlayStatus}
                                            />
                                            <SongLyricComp
                                                ref={lyricComp => this.lyricComp = lyricComp && lyricComp.getWrappedInstance()}
                                            />
                                            <SongPlayComp
                                                ref={playComp => this.playComp = playComp && playComp.getWrappedInstance()}
                                                onResetLyricTimer={this.onResetLyricTimer}
                                                onSetTransformStyle={
                                                    this.onSetTransformStyle
                                                }
                                            />
                                            <div>
                                                <div className="m-giude" style={{ bottom: '-14px' }}>
                                                    <i className="arr ani"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div >
            )
        }
    }
)
