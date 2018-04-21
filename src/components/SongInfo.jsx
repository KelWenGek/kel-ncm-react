import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import SongPlayComp from './SongPlay'
import lyricConverter from '@/shared/lyric'
import { getTransform } from '@/shared/util'

export default class SongInfo extends Component {

    static getDerivedStateFromProps(nextProps, prevState) {
        let playing = nextProps.SongPlay.data.playing;
        return {
            circlingCls: cn({
                'a-circling': playing
            }),
            isPause: !playing
        }
    }
    state = {
        transformStyle: {}
    }
    //设置音乐海报旋转的transform
    setTransformStyle() {
        let songImg = this.roll,
            songWrap = this.turn,
            transformKey = getTransform(),
            songImgTransform = getComputedStyle(songImg, null)[transformKey],
            songWrapTransform = getComputedStyle(songWrap, null)[transformKey];
        let transform = songWrapTransform === 'none'
            ? songImgTransform
            : songImgTransform.concat(' ', songWrapTransform);
        this.setState(prevState => {
            return {
                transformStyle: {
                    [transformKey]: transform
                }
            }
        })
    }
    changePlayStatus = () => {
        let { SongPlay } = this.props,
            currentStatus = SongPlay.data.playing;
        !currentStatus ? this.audio.el.play() : this.audio.el.pause();
    }
    //音乐切换到播放状态
    onPlay = () => {
        let { onSetPlayingStatus } = this.props;
        onSetPlayingStatus(true);
    }
    //音乐播放中
    onTimeupdate = () => {
        //找到当前歌词序号
        let { SongLyric } = this.props,
            slapedTime = this.audio.el.currentTime,
            lines;
        if (!SongLyric.data) return;
        lines = SongLyric.data.lines;
        let curIndex = lyricConverter.findLyricByTime(slapedTime, lines, this.curIndex);
        "number" == typeof curIndex && (this.props.onSetIndex(curIndex), this.curIndex = curIndex);
    }
    //音乐切换到暂停状态
    onPause = () => {
        let { onSetPlayingStatus } = this.props;
        this.setTransformStyle();
        onSetPlayingStatus(false);
    }
    //音乐播放完毕
    onEnded = () => {
        this.setTransformStyle();
        this.props.onSetPlayingStatus(false);
        this.props.onSetIndex(this.curIndex = 0);
    }
    //音乐播放出错
    onError = () => {

    }
    render() {
        let { Song, SongPlay } = this.props,
            SongData = Song.data;
        let { transformStyle, circlingCls, isPause } = this.state;

        return (
            <div className="m-song-wrap" >
                <div className="m-song-disc">
                    <div className="m-song-turn">
                        <div className="m-song-rollwrap" ref={turn => this.turn = turn} style={transformStyle}>
                            <div className="m-song-img" className={circlingCls} ref={roll => this.roll = roll}>
                                <img className="u-img" src={SongData.al.picUrl} />
                            </div>
                        </div>
                        <div className="m-song-lgour" style={transformStyle}>
                            <div className="m-song-light" className={circlingCls}></div>
                        </div >
                    </div >
                    {isPause && <span className="m-song-plybtn"></span>}
                </div >
                <div className="m-song-clickarea" onClick={this.changePlayStatus} ></div >
                <SongPlayComp
                    ref={audio => this.audio = audio}
                    src={SongPlay.data.url}
                    autoPlay={SongPlay.data.playing}
                    onPlay={this.onPlay}
                    onTimeupdate={this.onTimeupdate}
                    onPause={this.onPause}
                    onEnded={this.onEnded}
                    onError={this.onError}
                />
            </div >
        );
    }
}