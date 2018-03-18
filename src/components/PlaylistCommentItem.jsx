import React, { Component } from 'react'
import convert from '@/shared/convert'
import PlaylistCommentContent from './PlaylistCommentContent'
export default class PlaylistCommentItem extends Component {
    render() {
        let { title, comments } = this.props;
        let finalComments = comments.map(cmt => {
            cmt.user.nicknameUrl = `/user/home?nickname=${encodeURIComponent(cmt.user.nickname)}`
            cmt.parsedTime = convert.parseTime(cmt.time);
            if (cmt.beReplied.length) {
                cmt.beReplied[0].user.nicknameUrl = `/user/home?nickname=${encodeURIComponent(cmt.beReplied[0].user.nickname)}`
            }
            return cmt;
        });
        return (
            comments && comments.length
                ? <div className="m-comments">
                    <h4 className="cmt_title">
                        {title}
                    </h4>
                    <div className="cmt_list">
                        {
                            finalComments.map((item, index) => (
                                <div key={item.commentId} className="cmt_item" >
                                    <div className="cmt_head">
                                        <a href={item.user.nicknameUrl} className="userphoto">
                                            <img src={item.user.avatarUrl} alt="" />
                                        </a>
                                    </div>
                                    <div className="cmt_wrap f-bd f-bd-btm">
                                        <div className="cmt_header">
                                            <div className="cmt_meta">
                                                <span className="cmt_user">
                                                    <a href={item.user.nicknameUrl} className="nickname">
                                                        {item.user.nickname}
                                                    </a>
                                                </span>
                                                <div className="cmt_time">
                                                    <span>{item.parsedTime}</span>
                                                </div>
                                            </div>
                                            <div className="cmt_like">
                                                <span className="cmt_likearea">
                                                    {item.likedCount || ''}
                                                    <i className="cmt_likeicn">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                                                            <path fill="#999" d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836">
                                                            </path>
                                                        </svg>
                                                    </i>
                                                </span>
                                            </div>
                                        </div>
                                        <PlaylistCommentContent content={item.content} beReplied={item.beReplied} isRepliedCnt={false} />
                                        {
                                            item.beReplied.length > 0 &&
                                            <div className="cmt_replied f-bd f-bd-full">
                                                <span className="cmt_replied_user">{`@${item.beReplied[0].user.nickname}：`}</span>
                                                <PlaylistCommentContent content={item.beReplied[0].content} isRepliedCnt={true} />
                                            </div>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div >
                : null
        );
    }
}