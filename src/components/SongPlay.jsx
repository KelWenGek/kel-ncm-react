import React, { Component } from 'react'
export default class SongPlay extends Component {
    createAudio() {
        let { src, autoPlay, onPlay, onPause, onEnded, onError, onTimeupdate } = this.props,
            audio = this.el = new Audio(src);
        //音乐播放
        audio.onplay = onPlay;
        //音乐暂停
        audio.onpause = onPause;
        //音乐结束
        audio.onended = onEnded;
        audio.onerror = onError;
        audio.ontimeupdate = onTimeupdate;
        audio.autoplay = autoPlay;
        this.setSource(src);
    }
    setSource(src) {
        this.el.src = src;
    }
    componentWillReceiveProps(nextProps) {
        this.props.src !== nextProps.src && this.setSource(nextProps.src);
    }
    componentDidMount() {
        this.createAudio();
    }
    componentWillUnmount() {
        let oldEl = this.el;
        if (oldEl) {
            oldEl.pause();
            oldEl.onplay = oldEl.onpause = oldEl.onended = oldEl.ontimeupdate = null;
            oldEl = null;
        }
    }
    render() {
        return null;
    }
}
