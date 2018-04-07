import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
import findIndex from 'lodash/findIndex'
import { definition as songDefinition } from '@/store/song'
import lyricConverter from '@/shared/lyric'


export default class SongLyric extends Component {
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
    getScrollerTransform({ index, SongLyric }) {
        let current = 0,
            transformKey = this.context.transform,
            heights = SongLyric.data && SongLyric.data._other.heights;
        if (heights) {
            for (var i = 0, len = heights.length; i < len; i++) {
                if (i < index - 1) {
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

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => {
            return {
                lrcTransCls: this.getLrcTransCls(nextProps),
                lrcScrollerStyle: this.getLrcScrollerStyle(nextProps),
                scrollerTransform: this.getScrollerTransform(nextProps)
            }
        })
    }

    addHighlightToCurrentLine() {
        let scrollerEl = this.lycScl, LyricIndex = this.props.index;
        if (LyricIndex > 0) {
            scrollerEl.childNodes[LyricIndex - 1].style.color = ``;
        }
        scrollerEl.childNodes[LyricIndex].style.color = `rgba(255,255,255,1)`;
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