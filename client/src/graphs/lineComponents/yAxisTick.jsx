import React, { Component } from 'react';

class YAxisTick extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    document.getElementById("y-" + this.props.ind).style.position = "absolute";
    document.getElementById("y-" + this.props.ind).style.top = `${this.props.factor * (300 * (1 + this.props.factorTwo))}px`;
    document.getElementById("y-" + this.props.ind).style.right = "-100%";
    document.getElementById("y-" + this.props.ind).style.zIndex = "1";
    document.getElementById("y-" + this.props.ind).style.paddingTop = "25px";

    document.getElementById("y" + this.props.ind).style.position = "absolute";
  }

  render () {
    return (
      <span id={"y-" + this.props.ind}>
        <div id={"y" + this.props.ind}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.yValue}</div>
      </span>
    );
  }
}

export default YAxisTick;