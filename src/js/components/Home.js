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
        // fetch('/home',{
        //     credential: "include",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     method: 'get'
        // })
        //     .then((res)=>{return res.json()})
        //     .then((json)=>{
        //         // console.log('json---',json);
        //         this.setState({
        //             isFetching: false,
        //             posts: json,
        //         })
        //     })
        //     .catch((err)=>{console.log('error',err)});
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
                <li key={obj._id} className="listItem">
                    <Link to={'/article/'+obj._id} >
                        <h3>{obj.title}</h3>
                        <span>{time}</span>
                        <span>{author}</span>
                    </Link>
                </li>
            );
        });
        // console.log('render-->Home',this.props);
        if (this.state.isFetching) {
            return <Loading />
        }
        return (
            <div className="home" >
                <ul className="list">
                    {articles}
                </ul>
            </div>
        )
    }
}

// module.exports = Home;
// 样式已经分离出去了
// var styles = {
//     container: {
//         paddingLeft: '1rem',
//         paddingRight: '1rem',
//     },
//     list: {
//         margin: 0,
//         padding: 0,
//     },
//     listItem: {
//         height: '5rem',
//         listStyle: 'none',
//         borderBottom: '1px solid #BBB8AA'
//     }
// };

export default Home;
