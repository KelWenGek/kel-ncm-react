import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import findIndex from 'lodash/findIndex'
import { definition as songDefinition } from '@/store/song'
import lyricConverter from '@/shared/lyric'
import { getTransform } from '@/shared/util'

export default connect(
    ({ song: { song, songLyric } }) => ({ Song: song, SongLyric: songLyric }),
    {
        onSetLyricOtherData: songDefinition.result.actionCreators.onSetLyricOtherData,
        onSongLyricAsync: songDefinition.result.actionCreators.onSongLyricAsync,
    }
)(
    class SongLyric extends Component {

        static getDerivedStateFromProps(nextProps, nextState) {
            let { SongLyric, index } = nextProps,
                SongLyricData = SongLyric.data;
            let current = 0, scrollerTransform,
                transformKey = getTransform(),
                heights = SongLyric.data && SongLyric.data._other.heights;
            if (heights) {
                for (var i = 0, len = heights.length; i < len; i++) {
                    if (i < index - 1) {
                        current += heights[i];
                    } else {
                        break;
                    }
                }
                scrollerTransform = {
                    [transformKey]: `translateY(-${current}px)`
                };
            } else {
                scrollerTransform = {
                    [transformKey]: `translateY(0px)`
                }
            }
            return {
                lrcTransCls: cn({
                    'm-song-scroll': true,
                    'm-song-lrtrans': SongLyricData && SongLyricData.hasTrans
                }),
                lrcScrollerStyle: SongLyricData && SongLyricData._other.outerHeight
                    ? {
                        height: SongLyricData._other.outerHeight + 'px'
                    }
                    : {},
                scrollerTransform
            }
        }
        state = {}

        componentDidMount() {
            let { Song, onSongLyricAsync } = this.props;
            // this.addHighlightToCurrentLine();
            onSongLyricAsync(Song.data.id);
            window.addEventListener('resize', debounce(this.resize, 700).bind(this), false);
        }
        componentDidUpdate(prevProps, prevState) {
            prevProps.SongLyric.loaded || this.resize();
            this.addHighlightToCurrentLine();
        }
        addHighlightToCurrentLine() {
            let scrollerEl = this.lycScl, LyricIndex = this.props.index;
            if (LyricIndex > 0) {
                scrollerEl.childNodes[LyricIndex - 1].style.color = ``;
            }
            scrollerEl.childNodes[LyricIndex].style.color = `rgba(255,255,255,1)`;
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
                                <div
                                    className={lrcTransCls}
                                    style={lrcScrollerStyle}
                                >
                                    <div className="m-song-iner"
                                        ref={lycScl => this.lycScl = lycScl}
                                        style={scrollerTransform}
                                    >
                                        {
                                            SongLyricData.lines.map((line, i) => (
                                                <p
                                                    key={`lyricm_${i}`}
                                                    className="m-song-lritem j-lritem" >
                                                    {
                                                        !SongLyricData.hasTrans
                                                            ? line.lyric || `&nbsp;`
                                                            :
                                                            [
                                                                <span
                                                                    className="m-song-lrori"
                                                                >
                                                                    {line.lykelric || `&nbsp;`}
                                                                </span>,
                                                                <span
                                                                    className="m-song-lrtra"
                                                                >
                                                                    {line.tlyric || `&nbsp;`}
                                                                </span>
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