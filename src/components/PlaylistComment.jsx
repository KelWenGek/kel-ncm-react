import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlaylistCommentItem from './PlaylistCommentItem'
export default connect(
    ({ app: { Playlist } }) => ({ Playlist })
)(
    class PlaylistComment extends Component {
        render() {
            let hotComments, comments, total, more;
            let { Playlist } = this.props;
            if (Playlist.cmt) {
                ({ hotComments, comments, total, more } = Playlist.cmt);
            }
            return (
                <div className="m-talk">
                    {
                        !Playlist.cmt
                            ? <span className="u-spin"></span>
                            : [
                                <PlaylistCommentItem key={hotComments[0].commentId} title={'精彩评论'} comments={hotComments} />,
                                <PlaylistCommentItem key={comments[0].commentId} title={`最新评论(${total})`} comments={comments} />
                            ]


                    }
                    {/* {
                        more
                            ? <div className="cmt_more f-bd f-bd-top">
                                <span className="box">
                                    {`查看全部${total}条评论`}
                                    <i></i>
                                </span>
                            </div>
                            : ''
                    } */}

                </div>

            )
        }
    }
)