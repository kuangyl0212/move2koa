var React = require('react');
// import React from 'react';
var ReactDOM = require('react-dom');

var { Router, Route, hashHistory, IndexRoute } = require('react-router');
var Navi = require('./components/Navi');
// var Home = require('./components/Home');

import Home from './components/Home';

import Reg from './components/users/Reg';

import Login from './components/users/Login';

var Post = require('./components/Post');

import Article from './components/Article';

var App = React.createClass({
    componentWillMount(){
        // 不做验证
        // fetch('/users/check',{
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     method: "GET"
        //    })
        //     .then((res)=>{
        //         return res.json();
        //     })
        //     .then((result)=>{console.log('result---',result)})
        //     .catch((err)=>{console.log('error',err)})

    },
    render(){
        return (
            <div>
                <Navi/>
                 {this.props.children}
            </div>
        )
    }
});

// Render the main component into the dom
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path='(home)' component={Home}/>
            <Route path='post' components={Post}/>
            <Route path='reg' component={Reg}/>
            <Route path='login' component={Login}/>
            <Route path="article/:id" component={Article}/>
        </Route>
    </Router>
), document.getElementById('app'));
