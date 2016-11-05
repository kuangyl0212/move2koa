import React, {Component} from 'react';
import Loading from './Loading';
import $ from 'jquery';
import ContentEditable from 'react-contenteditable';

var Link = require('react-router').Link;

class Article extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            article: {}
        }
    }
    componentWillMount () {
        let successFun = (json)=>{
            this.setState({
                    isFetching: false,
                    article: json,
                })
        };
        $.ajax({
            url: '/article?id=' + this.props.params.id,
            success: successFun,
        })
        // console.log('props---',this.props);
        // fetch('/article?id=' + this.props.params.id,{
        //     credential: "include",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     method: 'get',
        // })
        //     .then((res)=>{return res.json()})
        //     .then((json)=>{
        //         // console.log('json---',json);
        //         this.setState({
        //             isFetching: false,
        //             article: json,
        //         })
        //     })
        //     .catch((err)=>{console.log('error',err)});
    }
    render () {
        // console.log('props---',props);
        // console.log('state---',this.state.posts);
        // let createMarkup = (htmlStr) => { return {__html: htmlStr}; };
        // let articles = this.state.posts.map((obj)=>{
        //     console.log('obj---',obj);
        //     return (
        //         <li key={obj._id} style={styles.listItem}>
        //             <Link to={'/article/:'+obj._id} >
        //                 <h3>{obj.title}</h3>
        //                 <span>{obj.createTime.substr(0,10)}</span>
        //             </Link>
        //         </li>
        //     );
        //     {/*<div dangerouslySetInnerHTML={createMarkup(obj.content)}></div>*/}
        // });
        // console.log('render-->Home',this.props);

        if (this.state.isFetching) {
            return <Loading />
        }
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
                <p>{author}</p>
                <div dangerouslySetInnerHTML={createMarkup(this.state.article.content)}></div>
                <div className="comment-form">
                    <label>评论:</label>
                    <ContentEditable className="comment-editor"/>
                    <button className="submit comment">提交</button>
                </div>
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