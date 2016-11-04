'use strict';
import React from 'react';
import { Link } from 'react-router';

import Dropdown from './Dropdown';
import config from './config';

/* 
 * 这是导航栏组件 
 * 窄屏幕下只显示图标不显示文字 宽屏显示文字
 * 点击左侧菜单键弹出下拉菜单
 * 点击右侧用户图标显示用户中心
*/
export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth
    }
  }
  handleResize(e) {
    this.setState({windowWidth: window.innerWidth});
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  render() {
    let navView;
    if (this.state.windowWidth < 750) {
      navView = <Dropdown width={this.state.windowWidth + 'px'} path={this.props.path}/>
    } else {
      navView = config.data.map((item,i)=>{
          return (
            <div key={i} className="navItem" >
              <Link className="link" activeClassName="active" to={item.link}>
                <i className={"fa fa-"+config.getIconName(item.link)+" fa-lg icon"} aria-hidden="true"></i>
                <span className="text">{item.name}</span>
              </Link>
            </div>
          )
        });
    }
    return (
      <div className="placeHolder">
        <nav className="navContainer">
          {navView}
        </nav>
      </div>
    )
  }
}
