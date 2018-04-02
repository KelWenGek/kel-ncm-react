import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SongPlayARMap from '@/store/songPlay'
import SongLyricARMap from '@/store/songLyric'
export default connect(
    ({ app: { SongPlay } }) => ({ SongPlay }),
    {
        onSetPlayingStatus: SongPlayARMap.actionCreators.onPlayingSet,
        onSetLyricIndex: SongLyricARMap.actionCreators.onSetLyricIndex
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
            let { SongPlay, onSetPlayingStatus, onResetLyricTimer, onSetTransformStyle } = this.props,
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
                onSetLyricIndex(0);
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