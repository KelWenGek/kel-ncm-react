import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import findIndex from 'lodash/findIndex'
import { GET_SONG_DETAIL, GET_SONG_PLAY } from '@/constants/API'
import lyricConverter from '@/shared/lyric'
import { definition as songDefinition } from '@/store/song'
import SongInfoComp from './SongInfo'
import SongLyricComp from './SongLyric'
import SongPlayComp from './SongPlay'
export default connect(
    ({
        app: {
            song:
            {
                lyricIndex,
                song,
                songLyric,
                songError,
                songPlayError
            }
        }
    }) => ({
        LyricIndex: lyricIndex,
        Song: song,
        SongLyric: songLyric,
        SongError: songError,
        SongPlayError: songPlayError
    }),
    {
        onSongSuccess: songDefinition.result.actionCreators.onSongSuccess,
        onSongDetailAsync: songDefinition.result.actionCreators.onSongDetailAsync,
        onSongPlayAsync: songDefinition.result.actionCreators.onSongPlayAsync,
        onSongLyricAsync: songDefinition.result.actionCreators.onSongLyricAsync,
        onSetPlayingStatus: songDefinition.result.actionCreators.onSetPlayingStatus,
        onSetLyricOtherData: songDefinition.result.actionCreators.onSetLyricOtherData,
        onSetLyricCurrentIndex: songDefinition.result.actionCreators.onSetLyricCurrentIndex
    }
)(
    class SongDetail extends Component {
        static childContextTypes = {
            transform: PropTypes.string,
            parent: PropTypes.object
        }

        state = {
            lyricIndex: 0
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
                onSongDetailAsync,
                onSongPlayAsync,
                onSongSuccess,
                onSongLyricAsync,
                onSetPlayingStatus
            } = this.props;
            Promise.all(
                [
                    onSongDetailAsync(id),
                    onSongPlayAsync(id)
                ]
            ).then((res) => {
                //歌曲信息和链接都获取成功之后
                onSongSuccess(Object.assign({}, {
                    data: {
                        loaded: true
                    }
                }));
            }).then(() => {
                if (!SongError && !SongPlayError) {
                    onSongLyricAsync(id).then(() => {
                        onSetPlayingStatus(true);
                    })
                    setTimeout(() => {
                        this.resize();
                    });
                }
            })

            window.addEventListener('resize', this.resize, false);
        }



        addLyricScrollerTimer(audio) {
            let lines = this.props.SongLyric.data.lines,
                onSetLyricCurrentIndex = this.props.onSetLyricCurrentIndex;
            // audio = this.context.parent.playComp.getWrappedInstance().el;
            this.start = Date.now() - audio.currentTime * 1000
            this.lyrSclTimer = setInterval(() => {
                this.now = Date.now();
                let slaped = this.now - this.start,
                    current = findIndex(lines, (lyr, index) => {
                        return index === lines.length - 1 ||
                            (
                                slaped >= lyr.time * 1000 &&
                                slaped <= lines[index + 1].time * 1000
                            )
                    });
                current !== this.last && (
                    this.last = current,
                    this.setState(prevState => {
                        return {
                            lyricIndex: current
                        }
                    }),
                    this.SongLyricComp.addHighlightToCurrentLine()
                );
            }, 16);
        }
        removeLyricScrollerTimer() {
            this.lyrSclTimer && clearInterval(this.lyrSclTimer);
            this.lyrSclTimer = null;
        }

        resize = () => {
            let { onSetLyricOtherData, SongLyric } = this.props,
                lritems = document.querySelectorAll('.j-lritem');
            if (!lritems || lritems.length === 0) {
                return this.removeResize();
            }
            let _other = lyricConverter.getOtherData({
                lyric: SongLyric.data,
                lritems
            });
            onSetLyricOtherData(_other);
        }
        removeResize = () => {
            window.removeEventListener('resize', this.resize);
        }
        onChangePlayStatus = (status) => {
            this.playComp.el[status]();
        }
        onResetLyricTimer = (status) => {
            status
                ? this.addLyricScrollerTimer(this.playComp.el)
                : this.removeLyricScrollerTimer()
        }
        onSetTransformStyle = () => {
            this.infoComp.setTransformStyle();
        }

        onEnd() {
            this.setState(prevState => {
                return {
                    lyricIndex: 0
                }
            })
        }

        render() {
            let { Song, SongLyric } = this.props,
                SongData = Song.data,
                bgStyle;
            let { lyricIndex } = this.state;
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
                                            <SongLyricComp ref={comp => this.SongLyricComp = comp} index={lyricIndex} Song={Song} SongLyric={SongLyric} />
                                            <SongPlayComp
                                                ref={playComp => this.playComp = playComp && playComp.getWrappedInstance()}
                                                onResetLyricTimer={this.onResetLyricTimer}
                                                onSetTransformStyle={
                                                    this.onSetTransformStyle
                                                }
                                                onEnd={
                                                    this.onEnd.bind(this)
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
