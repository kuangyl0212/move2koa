'use strict';
import React, {Component} from 'react';
import Loading from './Loading';
import $ from 'jquery';

var Link = require('react-router').Link;

class Article extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            article: {},
            user: {},
            comment_content: '',
            comments: [],
        }
    }
    static contextTypes = {
        router: React.PropTypes.object
    }
    _refresh() {
        let successFun = (json)=>{
            this.setState({
                    isFetching: false,
                    article: json,
                    comments: json.comments,
                    comment_content: '',
                })
        };
        $.ajax({
            url: '/article?id=' + this.props.params.id,
            success: successFun,
        })
    }
    componentWillMount () {
        this._refresh();
    }
    comment_change(e) {
        // console.log(e.target);
        let value = e.target.value;
        this.setState({
            comment_content: value,
        })
    }
    async comment_submit() {
        let checkPromise = new Promise((resolve,reject)=>{
            $.ajax({
            url: '/users/check',
            type: 'get',
            success: (json)=>{
                // console.log('json---',json);
                if (json.code != 1) {
                    alert('尚未登录 不能发表评论');
                    // hashHistory.push('/profile');
                    this.context.router.push('./profile');
                    resolve(false);
                } else {
                    this.setState({
                        user: json.user,
                    });
                    resolve(true);
                }
            }
        })
        });
        let login = await checkPromise;
        if (!login) return;
        if (this.state.comment_content == '') {
            alert('评论为空');
            return;
        }
        let comment = {
                content: this.state.comment_content,
                article_id: this.state.article._id,
            };
        $.ajax({
            url: '/comment',
            type: 'post',
            data: comment,
            success: (json)=>{
                console.log('this--->',this)
                if (json.msg == 'success') {
                    this._refresh();
                    alert('评论成功！');
                } else {
                    alert('评论失败！');
                }
            }
        });
    }
    render () {

        if (this.state.isFetching) {
            return <Loading />
        }
        let comments_view = this.state.comments.map((obj, i)=>{
            return (<li key={i} className="one-comment">
                    <img/>
                    <p className="by">{obj.by.user_name}:</p>
                    <p className="comment-content">{obj.content}</p>
                    <p className="comment-time">{obj.createTime.substr(0,10)}</p>
                </li>)
        })
        let createMarkup = (htmlStr) => { return {__html: htmlStr} };
        let time,author;
        try {
            time = this.state.article.createTime.substr(0,10);
            author = this.state.article.author;
        } catch (err) {}
        return (
            <div style={styles.container} className="home article">
                <h2>{this.state.article.title}</h2>
                <p>{time}</p>
                <div dangerouslySetInnerHTML={createMarkup(this.state.article.content)}></div>
                <div className="comment-form">
                    <label>评论:</label>
                    <textarea className="comment-editor" value={this.state.comment_content} onChange={this.comment_change.bind(this)}/>
                    <button className="submit comment" onClick={this.comment_submit.bind(this)}>提交</button>
                </div>
                <ul className="comment-list">
                    {comments_view}
                </ul>
            </div>
        )
    }
}

// module.exports = Home;

var styles = {
    container: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        overflow: 'hidden',
        background: '#fff',
    },
};

export default Article;