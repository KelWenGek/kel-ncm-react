import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeTabCurIdxARMap from '@/store/homeTabCurIdx';
import cn from 'classnames'
export default connect(
    ({ HomeTabCurIdx }) => ({ HomeTabCurIdx }),
    { onTabChange: HomeTabCurIdxARMap.actionCreators.onChange }
)(
    class HomeNav extends Component {
        static selections = ['推荐歌曲', '热歌榜', '搜索'];
        render() {
            let { HomeTabCurIdx, onTabChange } = this.props;
            return (
                <nav className="f-bd f-bd-btm u-tab">
                    {
                        HomeNav.selections.map((txt, index) => (
                            <li
                                key={index}
                                className={cn('tabtitle', [HomeTabCurIdx === index ? 'z-selected' : ''])}
                                onClick={() => HomeTabCurIdx !== index && onTabChange(index)}
                            >
                                <div className="tabtxt">
                                    <span>{txt}</span>
                                </div>
                            </li>
                        ))
                    }
                </nav>
            );
        }
    })