import React, { Component } from 'react';

class YAxisTick extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    document.getElementById("y-" + this.props.ind).style.position = "absolute";
    document.getElementById("y-" + this.props.ind).style.top = `${this.props.factor * 355}px`;
    document.getElementById("y-" + this.props.ind).style.right = "-100%";
    document.getElementById("y-" + this.props.ind).style.zIndex = "1";
    document.getElementById("y-" + this.props.ind).style.paddingTop = "25px";

    document.getElementById("y" + this.props.ind).style.position = "absolute";
  }

  render () {
    return (
      <span id={"y-" + this.props.ind}>
        <div id={"y" + this.props.ind}>{this.props.yValue}</div>
      </span>
    );
  }
}

export default YAxisTick;