import React, {
    Component
} from 'react';

import md5 from 'md5';
import $ from 'jquery';

export default class Reg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            email: '',
            password: '',
            confirm_password: '',
            user_msg:'',
            email_msg:'',
            pass_msg:'',
            con_msg:'',
            reg_msg: '',
        };
    }
    _changeHandler (event) {
        let name = event.target.placeholder;
        let value = event.target.value;
        switch(name) {
            case 'user name':
                this.state.user_msg != '' && this.setState({
                    user_msg: '',
                });
                this.setState({
                    user_name: value,
                });
                break;
            case 'email':
                this.state.email_msg != '' && this.setState({
                    email_msg: '',
                });
                this.setState({
                    email: value,
                });
                break;
            case 'password':
                this.state.pass_msg != '' && this.setState({
                    pass_msg: '',
                });
                this.setState({
                    password: value,
                });
                break;
            case 'confirm password':
                this.state.con_msg != '' && this.setState({
                    con_msg: '',
                });
                this.setState({
                    confirm_password: value,
                });
                break;
        }
    }
    _submit(event){
        let successFun = (json)=>{
            if (json.msg) {
                switch (json.msg) {
                    case "success":
                        // 这是注册成功的路径
                        setTimeout(()=>{
                            this.props.history.push('/login');
                        },1000);
                        this.setState({
                            reg_msg: '注册成功，即将跳至登录页！'
                        });
                        break;
                    case "exist":
                        this.setState({
                            user_msg: "用户名已存在！"
                        });
                        break;
                    case "email_exist":
                        this.setState({
                            email_msg: "邮箱已注册！"
                        });
                        break;
                } 
            } else {
                this.setState({
                    reg_msg: '注册失败！'
                });
            }
        }
        // 清空消息
        if (this.state.reg_msg != '') this.setState({
            reg_msg:'',
            user_msg:'',
            email_msg:'',
            pass_msg:'',
            con_msg:'',
        });
        let {user_name, email, password, confirm_password} = this.state;
        if (user_name && email && password && confirm_password) {
            if (user_name.length < 6) {
                this.setState({
                    user_msg: '太短了！',
                });
                return;
            }
            if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)){
                 this.setState({
                    email_msg: '似乎不是邮箱！',
                });
                return;
            }
            if (password != confirm_password) {
                this.setState({
                    con_msg: '再确认一下？',
                });
                return;
            }
            if (password.length < 6) {
                this.setState({
                    password_msg: '太短了！',
                });
                return;
            }
            let user = {
                user_name: user_name,
                email: email,
                password: md5(password),
            };
            $.ajax({
                url: '/users/reg',
                type: 'post',
                data: user,
                success: successFun
            })
            // console.log('user---',user);
            // let postData = {
            //     credential: "include",
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     method: "POST",
            //     body: JSON.stringify(user),
            // };
            // fetch('/users/reg',postData).then(function (res) {
            //     // console.log('res---',res);
            //     return res.json();
            // }).then((json)=>{
            //     // console.log('json---',json);
            //     switch (json.msg) {
            //         case "success":
            //             // 这是注册成功的路径
            //             setTimeout(()=>{
            //                 this.props.history.push('/login');
            //             },1000);
            //             this.setState({
            //                 reg_msg: '注册成功，即将跳至登录页！'
            //             });
            //             break;
            //         case "exist":
            //             this.setState({
            //                 user_msg: "用户名已存在！"
            //             });
            //             break;
            //         case "email_exist":
            //             this.setState({
            //                 email_msg: "邮箱已注册！"
            //             });
            //             break;
            //     }
            // }).catch((err)=>{this.setState({
            //     reg_msg: '注册失败！'
            // })});
        } else {
            // 填写不完全
            user_name        == '' && this.setState({user_msg: '请设置用户名！'});
            email            == '' && this.setState({email_msg: '请填写邮箱！'});
            password         == '' && this.setState({pass_msg: '请设置密码！'});
            confirm_password == '' && this.setState({con_msg: '请确认密码！'});
        }
    }

    render() {
        return (
                <div style={styles.modal}>
                    <label style={styles.labels}>
                        <div style={styles.tag}>用户名：</div>
                        <input type="text" placeholder="user name"
                        value={this.state.user_name}
                        onChange={this._changeHandler.bind(this)}/>
                        <div style={styles.msg}>{this.state.user_msg}</div>
                    </label>
                    <label style={styles.labels}>
                        <div style={styles.tag}>邮箱：</div>
                        <input type="text" placeholder="email"
                        value={this.state.email}
                        onChange={this._changeHandler.bind(this)}/>
                        <div style={styles.msg}>{this.state.email_msg}</div>
                    </label>
                    <label style={styles.labels}>
                        <div style={styles.tag}>密码：</div>
                        <input type="password" placeholder="password"
                        value={this.state.password}
                        onChange={this._changeHandler.bind(this)}/>
                        <div style={styles.msg}>{this.state.pass_msg}</div>
                    </label>
                    <label style={styles.labels}>
                        <div style={styles.tag}>确认密码：</div>
                        <input type="password" placeholder="confirm password"
                        value={this.state.confirm_password}
                        onChange={this._changeHandler.bind(this)}/>
                        <div style={styles.msg}>{this.state.con_msg}</div>
                    </label>
                    <button onClick={this._submit.bind(this)}>注册</button>
                    <div style={styles.msg}>{this.state.reg_msg}</div>
                </div>
        )

    }
}

var styles = {
    mask: {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '30rem',
        height: '18rem',
        backgroundColor: '#fff',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    labels: {
        display: 'flex',
        width: '80%',
        marginBottom: '1rem',
        justifyContent: 'space-between',
    },
    tag:{
        width: '30%',
    },
    msg: {
        width: '30%',
        marginLeft: '0.1rem',
        fontSize: '0.8rem',
        color: '#f00',
    }
};
