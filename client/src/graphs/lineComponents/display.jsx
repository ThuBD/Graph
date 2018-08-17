import React, { Component } from 'react';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line : ''
    }
  }

  componentDidMount () {
    console.log(this.props);
    let lineString = 'M'

    for (let i = 0; i < this.props.yValues.length; i++) {
      lineString += `${700 * (i / this.props.dayRange)} ${300 - (300 * this.props.yValues[i] / this.props.yMax) } `
    }
    console.log(lineString);
    this.setState({line : lineString});
  }

  componenetDidUpdate () {
  }

  render () {
    return (
      <svg className="xs" width="700" height="300">
        <path stroke='#63c9ff' fill='none' d={this.state.line}></path>
      </svg>
    );
  }
}

export default Display;