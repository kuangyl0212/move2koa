var React = require('react');
// import React from 'react';
var ReactDOM = require('react-dom');

var { Router, Route, hashHistory, IndexRoute } = require('react-router');
var Navi = require('./components/Navi');
// var Home = require('./components/Home');

import Home from './components/Home';

// import Reg from './components/users/Reg';

// import Login from './components/users/Login';
import Profile from './components/users/Profile';

var Post = require('./components/Post');

import Article from './components/Article';

var App = React.createClass({
    componentWillMount(){

        // 自适应布局？ 似乎不需要 反正我直接用rem
        // (function (doc, win) {
        //     var docEl = doc.documentElement,
        //         resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
        //         recalc = function () {
        //             var clientWidth = docEl.clientWidth;
        //             if (!clientWidth) return;
        //             if(clientWidth>=750){
        //                 docEl.style.fontSize = '100px';
        //             }else{
        //                 docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        //             }
        //         };

        //     if (!doc.addEventListener) return;
        //     win.addEventListener(resizeEvt, recalc, false);
        //     doc.addEventListener('DOMContentLoaded', recalc, false);
        // })(document, window);

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
            <Route path='post' component={Post} />
            <Route path='profile' component={Profile} />
            <Route path="article/:id" component={Article}/>
        </Route>
    </Router>
), document.getElementById('app'));
