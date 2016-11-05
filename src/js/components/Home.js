import React, {Component} from 'react';
import Loading from './Loading';
// import ajax from '../common/ajax';
import $ from 'jquery'

var Link = require('react-router').Link;

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            posts: [],
        }
    }
    componentDidMount () {
        // 改ajax试试
        let successFun = (json)=>{
            // console.log('json---',json)
            this.setState({
                posts: json,
                isFetching: false
            })
        }
        $.ajax({url: '/home',
            success: successFun,
        })
    }
    render () {
        // console.log('state---',this.state.posts);
        // let createMarkup = (htmlStr) => { return {__html: htmlStr}; };
        let articles = this.state.posts.map((obj)=>{
            // console.log('obj---',obj);
            let time,author;
            try {
                time = obj.createTime.substr(0,10);
                author = obj.author;
            } catch (err) {}
            return (
                <li key={obj._id} className="listItem article">
                    <Link to={'/article/'+obj._id} >
                        <h3 className="link title">{obj.title}</h3>
                        <span className="link create-time">{time}</span>
                        <span className="link author">{author}</span>
                    </Link>
                </li>
            );
        });
        // console.log('render-->Home',this.props);
        if (this.state.isFetching) {
            return <Loading />
        }
        return (
            <div className="home article-list" >
                <ul className="list">
                    {articles}
                </ul>
            </div>
        )
    }
}

export default Home;
