import React from 'react';

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
    console.log(111)
    return (
      <dropdown className="dropdown" id="dropdown1">
        <input type="checkbox" ref="checkbox1" checked={this.state.show ? true : false}/>
        <label className="animate" htmlFor="dropdown1" onClick={this.clickHandler.bind(this)}>
          <i className={this.state.show ? "fa fa-close fa-2x icon" : "fa fa-navicon fa-2x icon"} aria-hidden="true" ref="icon"></i>
        </label>
        <ul className="animate" id="hide" ref="ul" >
          <li className="animate" >菜单项</li>
          <li className="animate" >菜单项</li>
          <li className="animate" >菜单项</li>
        </ul>
      </dropdown>
    )
  }
}