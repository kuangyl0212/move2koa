'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navigator from './components/navigator';

// import Button from 'antd/lib/button';
// import $ from 'jquery';
// var Navi = require('./components/Navi');


// var Home = require('./components/Home');

import Home from './components/Home';

// import Reg from './components/users/Reg';

// import Login from './components/users/Login';
import Profile from './components/users/Profile';

// var Post = require('./components/Post');
import Post from './components/Post';

import Article from './components/Article';

import injectTapEventPlugin from 'react-tap-event-plugin';


var App = React.createClass({
    componentWillMount(){

    },
    render(){
        return (
            <div>
                <Navigator path={this.props.location.pathname}/>
                {this.props.children}
            </div>
        )
    }
});

//Needed for onTouchTap
injectTapEventPlugin();

// Render the main component into the dom
ReactDOM.render((
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path='(home)' component={Home}/>
                <Route path='post' component={Post} />
                <Route path='profile' component={Profile} />
                <Route path="article/:id" component={Article}/>
            </Route>
        </Router>
    </MuiThemeProvider>
), document.getElementById('app'));
