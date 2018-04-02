import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
import SongPlayARMap from '@/store/songPlay'
export default connect(
    ({ app: { Song, SongPlay } }) => ({ Song, SongPlay }),
    {
        onSetPlayingStatus: SongPlayARMap.actionCreators.onPlayingSet
    },
    null,
    {
        withRef: true
    }
)(
    class SongInfo extends Component {
        static contextTypes = {
            transform: PropTypes.string,
            parent: PropTypes.object
        }
        state = (function () {
            let playing = this.props.SongPlay.data.playing;
            return {
                isPause: !playing,
                circlingCls: cn({
                    'a-circling': playing
                }),
                transformStyle: {}
            }
        }).call(this)
        setTransformStyle() {
            let songImg = this.roll,
                songWrap = this.turn,
                transformKey = this.context.transform,
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
            //父组件传入控制SongPlay状态的方法属性 onChangePlayStatus
            let { SongPlay, onSetPlayingStatus, onChangePlayStatus } = this.props,
                currentStatus = this.state.isPause;
            // playWrapper = this.context.parent.playComp.getWrappedInstance();
            // && !playWrapper.el.ended
            if (!currentStatus) {
                this.setTransformStyle();
                onSetPlayingStatus(false);
                onChangePlayStatus('pause');
                // playWrapper.el.pause();
            } else {
                onSetPlayingStatus(true);
                onChangePlayStatus('play');
                // playWrapper.el.play();
            }
        }
        render() {
            let { Song, SongPlay } = this.props,
                SongData = Song.data;
            let { transformStyle, isPause, circlingCls } = this.state;
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
                </div >
            );
        }
    }
)