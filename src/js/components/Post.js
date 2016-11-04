'use strict';
var React = require('react');

// import UEditor from './UEditor';

import ReactMarkdown from 'react-markdown';
import COntentEditable from 'react-contenteditable';

var ReactQuill = require('react-quill');

import $ from 'jquery';

var Post = React.createClass({
    getInitialState: function () {
        return ({
            title: '',
            content: '',
            createTime:'',
        })
    },
    componentDidMount: function () {
    },
    titleChange: function (event) {
        // console.log('event---',event.target.value,this.state);
        let value = event.target.value;
        this.setState({
            title: value
        })
    },
    contentChange(value) {
        this.setState({
            content: value
        })
    },
    submit: function () {
        let title =this.state.title;
        let content = this.state.content;
        let successFun = (json)=>{
            console.log('json---',json);
            if (json == 'success') {
                alert('成功！跳转到首页')
                this.props.history.push('/home');
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
    },
    render: function () {
        console.log('state---',ReactQuill);
        // console.log('render-->Post',this.props)
        return (
            <div className="home">
                <label className="titleLabel">
                    标题：
                    <input className="titleInput" type="text" value={this.state.title} onChange={(event)=>this.titleChange(event)}/>
                </label>
                <ReactQuill
                    theme="snow"
                    className="editor"
                    onChange={this.contentChange}
                    >
                    <ReactQuill.Toolbar key="toolbar"
                        className="toolbar"
                        ref="toolbar"
                        items={ReactQuill.Toolbar.defaultItems} />
                    <div key="editor"
                        ref="editor"
                        className="quill-contents"
                        dangerouslySetInnerHTML={{__html:this.state.content}}/>
                </ReactQuill>
                <button className="submit" onClick={()=>this.submit()}>提交</button>
            </div>
        )
    }
});

module.exports = Post;