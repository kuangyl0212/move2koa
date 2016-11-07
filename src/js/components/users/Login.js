import React, {
    Component
} from 'react';

import md5 from 'md5';
import $ from 'jquery';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            email_msg:'',
            pass_msg:'',
            login_msg: '',
        };
    }
    static contextTypes = {
        router: React.PropTypes.object
    }
    _changeHandler (event) {
        let name = event.target.placeholder;
        let value = event.target.value;
        switch(name) {
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
        }
    }
    _submit(event){
        let successFun = (json) => {
            if (json.msg) {
                switch (json.msg) {
                    case "success":
                        // 这是注册成功的路径
                        // 登录成功存入token（mongodb自动生成的_id） 下次验证 或者 获取用户信息的时候用
                        // localStorage.setItem('token',json.token);
                        // setTimeout(()=>{this.props.history.push('/home')},1000);
                        setTimeout(()=>{this.context.router.goBack()},1000);
                        this.setState({
                            login_msg: '登录成功，跳转到之前的页面！'
                        });
                        break;
                    case "not_exist":
                        this.setState({
                            email_msg: "邮箱未注册！"
                        });
                        break;
                    // 密码错误
                    case "pass_err":
                        this.setState({
                            pass_msg: "密码错了！"
                        })
                }
            } else {
                this.setState({
                login_msg: '登录失败！'
                })
            };
        }
        if (this.state.login_msg != '') this.setState({
            login_msg:'',
            email_msg:'',
            pass_msg:'',
        });
        let {email, password} = this.state;
        if (email && password) {
            if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)){
                 this.setState({
                    email_msg: '似乎不是邮箱！',
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
                email: email,
                password: md5(password),
            };
            $.ajax({
                url: '/users/login',
                type: 'post',
                data: user,
                success: successFun,
            })
            // let postData = {
            //     credential: "include",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     method: "POST",
            //     body: JSON.stringify(user),
            // };
            // fetch('/users/login',postData).then(function (res) {
            //     // console.log('res---',res);
            //     return res.json();
            // }).then((json)=>{
            //     // console.log('json---',json);
            //     switch (json.msg) {
            //         case "success":
            //             // 这是注册成功的路径
            //             // 登录成功存入token（mongodb自动生成的_id） 下次验证 或者 获取用户信息的时候用
            //             localStorage.setItem('token',json.token);
            //             setTimeout(()=>{this.props.history.push('/home')},1000);
            //             this.setState({
            //                 login_msg: '登录成功，跳到首页！'
            //             });
            //             break;
            //         case "not_exist":
            //             this.setState({
            //                 email_msg: "邮箱未注册！"
            //             });
            //             break;
            //         // 密码错误
            //         case "pass_err":
            //             this.setState({
            //                 pass_msg: "密码错了！"
            //             })
            //     }
            // }).catch((err)=>{this.setState({
            //     login_msg: '登录失败！'
            // })});
        } else {
            // 填写不完全
            email            == '' && this.setState({email_msg: '请填写邮箱！'});
            password         == '' && this.setState({pass_msg: '请填写密码！'});
        }
    }
    render() {
        // console.log('context---',this.context);
        return (
            <div className="login-form">
                <legend>登录</legend>
                <input className="input" type="text" placeholder="E-mail"
                value={this.state.email}
                onChange={this._changeHandler.bind(this)}/>
                <div className="msg">{this.state.email_msg}</div>
                <input className="input" type="password" placeholder="Password"
                value={this.state.password}
                onChange={this._changeHandler.bind(this)}/>
                <div className="msg">{this.state.pass_msg}</div>
                <button className="submit login" onClick={this._submit.bind(this)}>登录</button>
                <div className="msg">{this.state.login_msg}</div>
            </div>
        )
    }
}
