import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GET_HOME_PLAYLIST, GET_HOME_NEWSONGS } from '@/constants/API'
import EmptyComp from '@/components/Empty'
import HomeRecoNewsgComp from '@/components/HomeRecoNewsg'
import HomeRecoNewsgARMap from '@/store/homeRecoNewsg'
import HomeRecoPlaylistComp from '@/components/HomeRecoPlaylist'
import HomeRecoPlaylistARMap from '@/store/homeRecoPlaylist'
export default connect(
    ({ HomeRecoNewsg, HomeRecoPlaylist }) => ({ HomeRecoNewsg, HomeRecoPlaylist }),
    {
        onNewsgAsync: HomeRecoNewsgARMap.actionCreators.onAsync,
        onPlaylistAsync: HomeRecoPlaylistARMap.actionCreators.onAsync
    }
)(
    class HomeRecoComp extends Component {

        componentDidMount() {
            let { HomeRecoNewsg, HomeRecoPlaylist, onNewsgAsync, onPlaylistAsync } = this.props;
            HomeRecoNewsg.loaded || onNewsgAsync({
                url: GET_HOME_NEWSONGS
            });
            HomeRecoPlaylist.loaded || onPlaylistAsync({
                url: GET_HOME_PLAYLIST
            });
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
