import React, { Component } from 'react';

class XAxisTick extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById("x-" + this.props.ind).style.width = "48px";
    document.getElementById("x-" + this.props.ind).style.position = "absolute";
    document.getElementById("x-" + this.props.ind).style.left = `${this.props.factor * 800}px`;
    document.getElementById("x-" + this.props.ind).style.zIndex = "1";
  }
  
  render () {
    return (
      <span id={"x-" + this.props.ind}>
        <div className={"x" + this.props.ind}>
          {this.props.xValue}
        </div>
      </span>
    );
  }
}

export default XAxisTick;