import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { definition as songDefinition } from '@/store/song'

export default connect(
    ({ app: { song: { songPlay } } }) => ({ SongPlay: songPlay }),
    {
        onSetPlayingStatus: songDefinition.result.actionCreators.onSetPlayingStatus,
        onSetLyricCurrentIndex: songDefinition.result.actionCreators.onSetLyricCurrentIndex
    },
    null,
    {
        withRef: true
    }
)(
    class SongPlay extends Component {
        static contextTypes = {
            parent: PropTypes.object
        }
        createAudio() {
            let { SongPlay, onSetPlayingStatus, onResetLyricTimer, onSetTransformStyle, onEnd } = this.props,
                self = this,
                autoPlay = SongPlay.data.playing,
                src = SongPlay.data.url,
                audio = this.el = new Audio(src);
            // refs = this.context.parent,
            // infoWrapper = refs.infoComp.getWrappedInstance(),
            // lycWrapper = refs.lyricComp.getWrappedInstance();
            //音乐播放
            audio.onplay = function () {
                onResetLyricTimer.call(self, true)
                // lycWrapper.setLrcScrollerTimer();
            };
            //音乐暂停
            audio.onpause = function () {
                onResetLyricTimer.call(self, false)
                // lycWrapper.removeLrcScrollerTimer();
            };
            //音乐结束
            audio.onended = function () {
                //设置旋转动画
                onSetTransformStyle.call(self);
                onSetPlayingStatus(false);
                //设置歌词滚动序号
                onEnd();
                //删除歌词滚动timer
                // lycWrapper.removeLrcScrollerTimer();
                onResetLyricTimer.call(self, false)

            }
            audio.autoplay = autoPlay;
            autoPlay && audio.play();
        }
        render() {
            this.props.SongPlay.data.playing && this.el.play();
            return null;
        }
        componentDidMount() {
            this.createAudio();

        }
        componentWillUnmount() {
            let oldEl = this.el;
            if (oldEl) {
                oldEl.pause();
                oldEl.onplay = oldEl.onpause = oldEl.onended = null;
                oldEl = null;
            }
        }
    }
)