import React, {Component} from 'react';
import Loading from './Loading';
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
        console.log('props---',this.props);
        fetch('/article?id=' + this.props.params.id,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'get',
        })
            .then((res)=>{return res.json()})
            .then((json)=>{
                // console.log('json---',json);
                this.setState({
                    isFetching: false,
                    article: json,
                })
            })
            .catch((err)=>{console.log('error',err)});
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
            <div style={styles.container}>
                <h2>{this.state.article.title}</h2>
                <p>{time}</p>
                <p>{author}</p>
                <div dangerouslySetInnerHTML={createMarkup(this.state.article.content)}></div>
            </div>
        )
    }
}

// module.exports = Home;

var styles = {
    container: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
    },
};

export default Article;