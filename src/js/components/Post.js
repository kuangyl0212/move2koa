'use strict';
// var React = require('react');
import React from 'react';

import UEditor from './UEditor';

// import ReactMarkdown from 'react-markdown';
// import COntentEditable from 'react-contenteditable';

// var ReactQuill = require('react-quill');

import $ from 'jquery';

const mobileWidth = require('../common/config').mobileWidth;

export default class Post extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
             title: '',
            content: '',
            createTime:'',
            windowWidth: window.innerWidth,
            user: {},
            isSaved: false,
        }
    }
    
    // 需要定义context类型才能使用
    static contextTypes = {
        router: React.PropTypes.object
    }
    //  mixins: [ Lifecycle ],
    // // 离开前确认
    // routerWillLeave(nextLocation) {
    //     if (!this.state.isSaved && this.state.windowWidth > mobileWidth)
    //     return 'Your work is not saved! Are you sure you want to leave?'
    // },
    componentWillMount() {
        // console.log('context---1-',this.context);
    }
    handleResize(e) {
        this.setState({windowWidth: window.innerWidth});
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
        $.ajax({
            url: '/users/check',
            type: 'get',
            success: (json)=>{
                // console.log('json---',json);
                if (json.code != 1) {
                    alert('尚未登录？');
                    this.setState({
                        isSaved: true,
                    });
                    // hashHistory.push('/profile');
                    this.context.router.push('/profile');
                } else {
                    this.setState({
                        user: json.user,
                    });
                }
            }
        })
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }
    titleChange(event) {
        // console.log('event---',event.target.value,this.state);
        let value = event.target.value;
        this.setState({
            title: value
        })
    }
    contentChange(value) {
        this.setState({
            content: value
        })
    }
    loginCheck() {

    }
    async submit(){
        let checkPromise = new Promise((resolve,reject)=>{
            $.ajax({
            url: '/users/check',
            type: 'get',
            success: (json)=>{
                // console.log('json---',json);
                if (json.code != 1) {
                    alert('尚未登录？');
                    this.setState({
                        isSaved: true,
                    });
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
        let title =this.state.title;
        // let content = this.state.content;
        let content = this.refs.editor.getContent();
        let successFun = (json)=>{
            // console.log('json---',json);
            if (json == 'success') {
                alert('成功！跳转到首页')
                this.setState({
                    isSaved: true,
                })
                // this.props.history.push('/home');
                this.context.router.goBack();
            }
            if (json == 'title_exist') {
                alert('标题已经存在，换一个试试？')
            }
            if (json == 'err') {
                alert('出错了-_-||')
            }
        }
        if (title != '' & content != '') {
            let post = {
                title: title,
                content: content,
                author: this.state.user.user_name,
                createTime: new Date(),
            };
            $.ajax({
                url: '/post',
                type: 'post',
                data: post,
                success: successFun
            })
        } else {
            // todo 写一个弹窗组件替代alert
            alert('标题或正文为空，请完善后提交！');
        }
    }
    /* 代码备份 */
    // <ReactQuill
    //     theme="snow"
    //     className="editor"
    //     onChange={this.contentChange}
    //     >
    //     <ReactQuill.Toolbar key="toolbar"
    //         className="toolbar"
    //         ref="toolbar"
    //         items={ReactQuill.Toolbar.defaultItems} />
    //     <div key="editor"
    //         ref="editor"
    //         className="quill-contents"
    //         dangerouslySetInnerHTML={{__html:this.state.content}}/>
    // </ReactQuill>
    render () {
        // console.log('state---',this.refs);
        // console.log('render-->Post',this.props);
        console.log('contex---',this.context);
        if (this.state.windowWidth > mobileWidth) {
            return (
            <div className="home post">
                <label className="titleLabel" htmlFor="title">标题:</label>
                <input className="titleInput" id="title" type="text" value={this.state.title} onChange={(event)=>this.titleChange(event)}/>
                <UEditor className="ueditor" ref="editor"/>
                <button className="submit" onClick={()=>this.submit()}>提交</button>
            </div>
        )
        } else {
            console.log('mobile---');
            return (
                <div className="home">
                    <p>编辑功能需要更宽的屏幕</p>
                </div>
            )
        }
    }
};