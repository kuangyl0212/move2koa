import React from 'react';
import config from './config';
import {Link} from 'react-router';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      label: '',
    }
  }
  clickHandler() {
    this.setState({
      show: !this.state.show,
    })
  }
  itemClick(label){
    this.setState({
      show: !this.state.show,
      active: label,
    })
  }
  pathToTitle(path) {
    switch(path) {
      case '/':
      case '/home':
        return '首页';
      case '/post':
        return '发表';
      case '/profile':
        return '用户中心';
    }
  }
  render() {
    let navView = config.data.map((item,i)=>{
          return (
            <Link key={i} className="link" activeClassName="active" to={item.link}>
              <li className="animate" onClick={()=>{this.itemClick(item.name).bind(this)}}  style={{width: this.props.width ? this.props.width : "750px"}}>
                <i className={"fa fa-"+config.getIconName(item.link)+" fa-lg icon"} aria-hidden="true"></i>
                <span className="text">{item.name}</span>
              </li>
            </Link>
          )
        })
    // console.log(111)
    return (
      <dropdown className="dropdown" id="dropdown1" style={{width: this.props.width ? this.props.width : "750px"}}>
        <input type="checkbox" ref="checkbox1" checked={this.state.show ? true : false}/>
        <label className="animate label" htmlFor="dropdown1" onClick={this.clickHandler.bind(this)}>
          <i className={this.state.show ? "fa fa-close fa-lg icon" : "fa fa-navicon fa-lg icon"} aria-hidden="true" ref="icon"></i>
          <h2 className="title">{this.pathToTitle(this.props.path)}</h2>
        </label>
        <ul className="animate" id="hide" ref="ul" >
          {navView}
        </ul>
      </dropdown>
    )
  }
}