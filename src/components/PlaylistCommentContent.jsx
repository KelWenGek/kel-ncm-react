import React, { Component, createElement as h } from 'react';
import cn from 'classnames';
import convert from '@/shared/convert';
export default class PlaylistCommentContent extends Component {
    render() {
        let { content, beReplied, isRepliedCnt } = this.props,
            cnt = convert.parseContent(content).map((c, index) => {
                if (c.type === 'text') {
                    return (
                        <span key={c.type + index} className={cn({
                            'cmt_text': !(beReplied && beReplied.length)
                        })}>
                            {c.content}
                        </span>
                    );
                } else if (c.type === 'image') {
                    return (
                        <img key={c.type + index} className="cmt_emoji" src={c.content} alt="" style={{
                            width: '21px',
                            height: '21px'
                        }} />
                    );
                }
            });
        return (
            isRepliedCnt
                ?
                <span className="cmt_replied_cnt">
                    {cnt}
                </span>
                :
                <div className="cmt_content">
                    {
                        beReplied && beReplied.length
                            ?
                            <span>
                                回复<a className="at" href={beReplied[0].user.nicknameUrl}>{`@${beReplied[0].user.nickname}`}</a>：{cnt}
                            </span>
                            : cnt
                    }
                </div>
        );
    }
}