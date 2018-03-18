import React, { Component } from 'react'
import { connect } from 'react-redux'
import EmptyComp from '@/components/Empty'
import HomeRecoComp from '@/components/HomeReco'
import HomeHotListComp from '@/components/HomeHotList'
import SearchComp from '@/components/Search'

export default connect(
    ({ app: { HomeTabCurIdx } }) => ({ HomeTabCurIdx })
)(
    class HomeNavContentComp extends Component {

        render() {
            let Content, { HomeTabCurIdx } = this.props;
            switch (HomeTabCurIdx) {
                case 0: Content = HomeRecoComp; break;
                case 1: Content = HomeHotListComp; break;
                case 2: Content = SearchComp; break;
                default: Content = EmptyComp;
            }
            return (
                <div className="m-tabct">
                    <Content />
                </div>
            );
        }
    })