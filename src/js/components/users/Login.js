import React, {
    Component
} from 'react';

import md5 from 'md5';

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
            let postData = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(user),
            };
            fetch('/users/login',postData).then(function (res) {
                // console.log('res---',res);
                return res.json();
            }).then((json)=>{
                // console.log('json---',json);
                switch (json.msg) {
                    case "success":
                        // 这是注册成功的路径
                        // 登录成功存入token（mongodb自动生成的_id） 下次验证 或者 获取用户信息的时候用
                        localStorage.setItem('token',json.token);
                        setTimeout(()=>{this.props.history.push('/home')},1000);
                        this.setState({
                            login_msg: '登录成功，跳到首页！'
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
            }).catch((err)=>{this.setState({
                login_msg: '登录失败！'
            })});
        } else {
            // 填写不完全
            email            == '' && this.setState({email_msg: '请填写邮箱！'});
            password         == '' && this.setState({pass_msg: '请填写密码！'});
        }
    }
    render() {
        return (
            <div style={styles.mask}>
                <div style={styles.modal}>
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
                    <button onClick={this._submit.bind(this)}>登录</button>
                    <div style={styles.msg}>{this.state.login_msg}</div>
                </div>
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