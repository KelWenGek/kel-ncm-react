import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlaylistCommentItem from './PlaylistCommentItem'
export default connect(
    ({ playlist: { playlistComment, playlistCommentLoading } }) => ({ PlaylistComment: playlistComment, PlaylistCommentLoading: playlistCommentLoading })
)(
    class PlaylistComment extends Component {
        render() {
            let { PlaylistComment, PlaylistCommentLoading } = this.props, hotComments, comments, total, more, hasComment = !!PlaylistComment.data;
            if (hasComment) {
                ({ hotComments, comments, total, more } = PlaylistComment.data);
            }
            return (
                <div className="m-talk">
                    {
                        PlaylistCommentLoading
                            ? <span className="u-spin"></span>
                            : hasComment && <div>
                                <PlaylistCommentItem key={hotComments[0].commentId} title={'精彩评论'} comments={hotComments} />
                                <PlaylistCommentItem key={comments[0].commentId} title={`最新评论(${total})`} comments={comments} />
                                {
                                    more
                                        ?
                                        <div className="cmt_more f-bd f-bd-top">
                                            <span className="box">
                                                {`查看全部${total}条评论`}
                                                <i></i>
                                            </span>
                                        </div>
                                        : ''
                                }
                            </div>
                    }
                </div>

            )
        }
    }
)