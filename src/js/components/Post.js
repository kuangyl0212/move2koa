var React = require('react');

// import UEditor from './UEditor';

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
    submit: function () {
        let title =this.state.title;
        let content = this.refs.ueditor.getContent();
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
            // let postData = {
            //     credential: "include",
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     method: "POST",
            //     body: JSON.stringify(post)
            // };
            // fetch('/post',postData).then(function (res) {
            //     // console.log('res---',res);
            //     return res.json();
            // }).then((json)=>{
            //     // console.log('json---',json);
            // })
            //     .catch((err)=>{console.log('error',err)});
        } else {
            // todo 写一个弹窗组件替代alert
            alert('标题或正文为空，请完善后提交！');
        }
    },
    render: function () {
        // console.log('render-->Post',this.props);
        return (
            <div style={styles.contentBox}>
                <label>
                    标题：
                    <input type="text" value={this.state.title} onChange={(event)=>this.titleChange(event)}/>
                </label>
                // <UEditor ref="ueditor"/>
                <button onClick={()=>this.submit()}>确认</button>
            </div>
        )
    }
});

var styles = {
  editor: {
      padding: '1.5rem',
      borderRadius: '1rem',
      background: '#eee',
      width: '80%',
      margin: '0 auto'
  }
};

module.exports = Post;