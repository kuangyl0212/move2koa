import React from 'react';
import config from './config';
import {Link} from 'react-router';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }
  clickHandler() {
    this.setState({
      show: !this.state.show,
    })
  }
  render() {
    let navView = config.data.map((item,i)=>{
          return (
            <li key={i} className="animate" onClick={this.clickHandler.bind(this)}>
              <Link className="link" activeClassName="active" to={item.link}>
                <span className="text">{item.name}</span>
              </Link>
            </li>
          )
        })
    // console.log(111)
    return (
      <dropdown className="dropdown" id="dropdown1">
        <input type="checkbox" ref="checkbox1" checked={this.state.show ? true : false}/>
        <label className="animate" htmlFor="dropdown1" onClick={this.clickHandler.bind(this)}>
          <i className={this.state.show ? "fa fa-close fa-2x icon" : "fa fa-navicon fa-2x icon"} aria-hidden="true" ref="icon"></i>
        </label>
        <ul className="animate" id="hide" ref="ul" >
          {navView}
        </ul>
      </dropdown>
    )
  }
}