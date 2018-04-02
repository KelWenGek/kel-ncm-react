import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createMatchSelector } from '@/router/selectors'
import PropTypes from 'prop-types'
import cn from 'classnames'
import findIndex from 'lodash/findIndex'
import { GET_SONG_LYRIC } from '@/constants/API'
import SongLyricARMap from '@/store/songLyric'
import SongPlayARMap from '@/store/songPlay'
import lyricConverter from '@/shared/lyric'
export default connect(
    state => {
        let { app: { LyricIndex, Song, SongLyric, SongLyricLoading } } = state;
        let match = createMatchSelector('/m/song/:id')(state);
        return { Song, SongLyric, SongLyricLoading, match }
    },
    {
        onPlayStatusSet: SongPlayARMap.actionCreators.onPlayingSet,
        onSetLyricOtherData: SongLyricARMap.actionCreators.onSetOtherData,
        onSetLyricIndex: SongLyricARMap.actionCreators.onSetLyricIndex,
        onSongLyricAsync: SongLyricARMap.actionCreators.onAsync
    },
    null,
    {
        withRef: true
    }
)(
    class SongLyric extends Component {
        static contextTypes = {
            transform: PropTypes.string,
            parent: PropTypes.object
        }
        state = {
            lrcTransCls: this.getLrcTransCls(this.props),
            lrcScrollerStyle: this.getLrcScrollerStyle(this.props),
            scrollerTransform: this.getScrollerTransform(this.props)
        }
        getLrcTransCls({ SongLyric }) {
            let SongLyricData = SongLyric.data;
            return cn({
                'm-song-scroll': true,
                'm-song-lrtrans': SongLyricData && SongLyricData.hasTrans
            });
        }
        getLrcScrollerStyle({ SongLyric }) {
            let SongLyricData = SongLyric.data;
            return SongLyricData && SongLyricData._other.outerHeight
                ? {
                    height: SongLyricData._other.outerHeight + 'px'
                }
                : {}
        }
        getScrollerTransform({ LyricIndex, SongLyric }) {
            let current = 0,
                transformKey = this.context.transform,
                heights = SongLyric.data && SongLyric.data._other.heights;
            if (heights) {
                for (var i = 0, len = heights.length; i < len; i++) {
                    if (i < LyricIndex - 1) {
                        current += heights[i];
                    } else {
                        break;
                    }
                }
                return {
                    [transformKey]: `translateY(-${current}px)`
                };
            }
            return {
                [transformKey]: `translateY(0px)`
            }
        }
        componentDidMount() {
            let { onSongLyricAsync, onPlayStatusSet, match: { params } } = this.props;
            onSongLyricAsync({
                url: GET_SONG_LYRIC,
                params
            }).then(() => {
                onPlayStatusSet(true);
                setTimeout(() => {
                    this.resize();
                }, 0);
            })
            window.addEventListener('resize', this.resize, false);
        }
        componentWillReceiveProps(nextProps) {
            this.setState(prevState => {
                return {
                    lrcTransCls: this.getLrcTransCls(nextProps),
                    lrcScrollerStyle: this.getLrcScrollerStyle(nextProps),
                    scrollerTransform: this.getScrollerTransform(nextProps)
                }
            })
        }
        addLyricScrollerTimer(audio) {
            let lines = this.props.SongLyric.data.lines,
                onSetLyricIndex = this.props.onSetLyricIndex;
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
                    onSetLyricIndex(current),
                    this.addHighlightToCurrentLine()
                );
            }, 16);
        }
        removeLyricScrollerTimer() {
            this.lyrSclTimer && clearInterval(this.lyrSclTimer);
            this.lyrSclTimer = null;
        }
        addHighlightToCurrentLine() {
            Promise.resolve().then(() => {
                let scrollerEl = this.lycScl, LyricIndex = this.props.LyricIndex;
                if (LyricIndex > 0) {
                    scrollerEl.childNodes[LyricIndex - 1].style.color = ``;
                }
                scrollerEl.childNodes[LyricIndex].style.color = `rgba(255,255,255,1)`;
            })
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
        render() {
            let { Song, SongLyric, SongLyricLoading } = this.props,
                SongData = Song.data, SongLyricData = SongLyric.data;
            let { lrcScrollerStyle, lrcTransCls, scrollerTransform } = this.state;
            return (
                <div className="m-song-info">
                    <h2 className="m-song-h2">
                        <span className="m-song-sname">{SongData.name + ' ' + SongData.alia}</span>
                        <span className="m-song-gap">-</span>
                        <b className="m-song-autr">{SongData.ar.map(ar => ar.name).join('/')}</b>
                    </h2>
                    <div className="m-song-lrc f-pr">
                        {
                            SongLyricLoading
                                ?
                                <p className="m-song-lremp">歌词正在加载...</p>
                                : SongLyricData &&
                                <div className={lrcTransCls} style={lrcScrollerStyle}>
                                    <div className="m-song-iner" ref={lycScl => this.lycScl = lycScl} style={scrollerTransform}>
                                        {
                                            SongLyricData.lines.map(line => (
                                                <p key={line.tag} className="m-song-lritem j-lritem" >
                                                    {
                                                        !SongLyricData.hasTrans
                                                            ? line.lyric || `&nbsp;`
                                                            :
                                                            [
                                                                <span className="m-song-lrori">{line.lykelric || `&nbsp;`}</span>,
                                                                <span className="m-song-lrtra">{line.tlyric || `&nbsp;`}</span>
                                                            ]
                                                    }
                                                </p>
                                            ))
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            );
        }
    }
);