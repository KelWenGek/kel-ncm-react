import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GET_HOME_PLAYLIST, GET_HOME_NEWSONGS } from '@/constants/API'
import EmptyComp from '@/components/Empty'
import HomeRecoNewsgComp from '@/components/HomeRecoNewsg'
import HomeRecoPlaylistComp from '@/components/HomeRecoPlaylist'
import { definition as homeDefinition } from '@/store/home';
export default connect(
    ({ app: { home: { recoNewsg, recoPlaylist } } }) => ({ HomeRecoNewsg: recoNewsg, HomeRecoPlaylist: recoPlaylist }),
    {
        onNewsgAsync: homeDefinition.result.actionCreators.onRecoNewsgAsync,
        onPlaylistAsync: homeDefinition.result.actionCreators.onRecoPlaylistAsync
    }
)(
    class HomeRecoComp extends Component {

        componentDidMount() {
            let { HomeRecoNewsg, HomeRecoPlaylist, onNewsgAsync, onPlaylistAsync } = this.props;
            HomeRecoNewsg.loaded || onNewsgAsync();
            HomeRecoPlaylist.loaded || onPlaylistAsync();
        }
        render() {
            return (
                <div className="tabctitem">
                    <div className="m-homeremd">
                        <HomeRecoPlaylistComp />
                        <HomeRecoNewsgComp />
                    </div>
                </div>
            )
        }
    }
)
