import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import findIndex from 'lodash/findIndex'
import debounce from 'lodash/debounce'
import lyricConverter from '@/shared/lyric'
import { definition as songDefinition } from '@/store/song'
import SongInfoComp from './SongInfo'
import SongLyricComp from './SongLyric'
@connect(
    ({
        song:
        {
            song,
            songLyric,
            songPlay,
        }
    }) => ({
        Song: song,
        SongLyric: songLyric,
        SongPlay: songPlay,
    }),
    {
        onSongSuccess: songDefinition.result.actionCreators.onSongSuccess,
        onSongDetailAsync: songDefinition.result.actionCreators.onSongDetailAsync,
        onSongPlayAsync: songDefinition.result.actionCreators.onSongPlayAsync,
        onSongLyricAsync: songDefinition.result.actionCreators.onSongLyricAsync,
        onSetPlayingStatus: songDefinition.result.actionCreators.onSetPlayingStatus
    }
)
export default class SongDetail extends Component {

    state = {
        lyricIndex: 0
    }

    onSetLyricIndex = (curIndex) => {
        this.setState({
            lyricIndex: curIndex
        });
    }
    componentDidMount() {
        let { match: { params: { id } },
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
                // onSongLyricAsync(id)
            ]
        ).then((res) => {
            //歌曲信息和链接都获取成功之后
            onSongSuccess(Object.assign({}, {
                data: {
                    loaded: true
                }
            }));
        });
    }
    render() {
        let { Song, SongLyric, SongPlay, onSetPlayingStatus } = this.props,
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
                                            ref={infoComp => this.infoComp = infoComp}
                                            onSetIndex={this.onSetLyricIndex}
                                            Song={Song}
                                            SongLyric={SongLyric}
                                            SongPlay={SongPlay}
                                            onSetPlayingStatus={onSetPlayingStatus}
                                        />
                                        <SongLyricComp
                                            index={lyricIndex}
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
