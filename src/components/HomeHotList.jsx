import React, { Component } from 'react'
import { connect } from 'react-redux'
import cn from 'classnames';
import { pad } from '@/utils';
import { GET_HOME_TOP } from '@/constants/API';
import Empty from '@/components/Empty'
import HomeHotListARMap from '@/store/homeHotList'
export default connect(
    ({ app: { HomeHotListLoading, HomeHotList } }) => ({ HomeHotListLoading, HomeHotList }),
    { onHotListAsync: HomeHotListARMap.actionCreators.onAsync }
)(class HomeHotList extends Component {

    componentDidMount() {
        let { onHotListAsync, HomeHotList } = this.props;
        HomeHotList.loaded || onHotListAsync({
            url: GET_HOME_TOP,
            params: {
                idx: 1
            }
        });
    }
    render() {
        let { HomeHotList, HomeHotListLoading } = this.props;
        let hasItem = HomeHotList.data.length > 0;
        return (
            <div className="m-hmhot">
                {
                    HomeHotListLoading
                        ? <div className="u-spin"></div>
                        : <div>
                            <div className="hotcont">
                                <div className="m-sglst">
                                    {hasItem ? HomeHotList.data.slice(0, 20).map(({ id, name, ar, al, alia, cd }, index) => (
                                        <a className="m-sgitem" key={id} href={`/m/song/${id}`}>
                                            <div className={cn('sgfl', index <= 2 ? 'sgfl-cred' : '')} > {pad(index + 1)}</div>
                                            <div className="sgfr f-bd f-bd-btm">
                                                <div className="sgchfl">
                                                    <div className="f-thide sgtl">{`${name}`}
                                                        {
                                                            alia.length ?
                                                                <span className="sgalia">
                                                                    {`(${alia.join(' ')})`}
                                                                </span> : null
                                                        }
                                                    </div>
                                                    <div className="f-thide sginfo">
                                                        {
                                                            cd ? <i className="u-hmsprt sghot"></i> : null
                                                        }
                                                        {ar.map(a => a.name).join(' / ')} - {al.name}
                                                    </div>
                                                </div>
                                                <div className="sgchfr">
                                                    <span className="u-hmsprt sgchply"></span>
                                                </div>
                                            </div>
                                        </a>
                                    )) : <Empty />}
                                </div>
                            </div>
                            {
                                hasItem && <div className="hotdn" >
                                    <span className="hotview">查看完整榜单</span>
                                </div>
                            }
                        </div>
                }
            </div>
        )
    }
})
