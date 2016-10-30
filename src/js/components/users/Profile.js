import React, {
    Component,
} from 'react';

import Login from './Login';
import Reg from './Reg';
import UserCenter from './UserCenter';
import $ from 'jquery';
import Loading from '../Loading';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ifLogin: false,
            isFetching: true,
            user: {}
        }
    }
    componentWillMount(){
        let successFun = (json)=> {
            // console.log('check')
            if (json.code && json.code == 1) {
                this.setState({
                    ifLogin: true,
                    user: json.user
                })
            }
            this.setState({
                isFetching: false
            })
        }
        $.ajax({
            url: '/users/check',
            success: successFun,
        })
    }
    _logoutHandler() {
        this.setState({
            ifLogin: false,
        })
    }
    render() {
        let sView;
        let history = this.props.history;
        if (this.state.isFetching) return sView = <Loading />;
        if (this.state.ifLogin) {
            // 如果已经登录显示用户中心
            sView = <UserCenter user={this.state.user} logout={this._logoutHandler.bind(this)}/>
        } else {
            sView = (
            <div>
                <Login history={history}/>
                <Reg history={history}/>
            </div>
            )
        }
        return (
            <div>
                {sView}
            </div>
            )
    }
}