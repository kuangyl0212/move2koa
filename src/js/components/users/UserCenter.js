import React, {
  Component
} from 'react';
import $ from 'jquery';

export default class UserCenter extends Component {
  constructor(props){
    super(props);
  }
  _clickHandler(){
    console.log('props---',this.props,this)
    let _logout = this.props.logout;
    $.ajax({
      url: 'users/logout',
      type: 'get',
      success: _logout
    })
  }
  render() {
    return (
      <div>
        <div>用户名： {this.props.user.user_name} </div>
        <button onClick={this._clickHandler.bind(this)}>注销</button>
      </div>
    )
  }
}