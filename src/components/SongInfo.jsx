import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
import SongPlayARMap from '@/store/songPlay'
export default connect(
    ({ app: { Song, SongPlay } }) => ({ Song, SongPlay }),
    { onSetPlayingStatus: SongPlayARMap.actionCreators.onPlayingSet },
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
        state = {
            transformStyle: {}
        }
        setTransformStyle() {
            let songImg = this.roll,
                songWrap = this.turn,
                transformKey = this.context.transform,
                songImgTransform = getComputedStyle(songImg, null)[transformKey],
                songWrapTransform = getComputedStyle(songWrap, null)[transformKey];
            let transform = songWrapTransform === 'none' ? songImgTransform : songImgTransform.concat(' ', songWrapTransform);
            this.setState(prevState => {
                return {
                    [transformKey]: transform
                }
            })
        }
        changePlayStatus = () => {
            let { SongPlay, onSetPlayingStatus } = this.props,
                currentStatus = !SongPlay.data.playing,
                playWrapper = this.context.parent.playComp.getWrappedInstance();
            if (!currentStatus && !playWrapper.el.ended) {
                this.setTransformStyle();
                onSetPlayingStatus(false);
                playWrapper.el.pause();
            } else {
                onSetPlayingStatus(true);
                playWrapper.el.play();
            }
        }
        render() {
            let { Song, SongPlay } = this.props,
                SongData = Song.data;
            let { transformStyle } = this.state,
                isPause = !SongPlay.data.playing,
                circlingCls = cn({
                    'a-circling': !isPause
                });
            console.log('isPause:', isPause);
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