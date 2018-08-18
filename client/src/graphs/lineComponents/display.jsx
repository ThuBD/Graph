import React, { Component } from 'react';
import CirclePoint from './circlePoint.jsx';

class Display extends Component {
  constructor(props) {
    super(props);
    this.enterHandler = this.enterHandler.bind(this);
    this.leaveHandler = this.leaveHandler.bind(this);
    this.state = {
      line : '',
      shade : '',
      circleX : null,
      circleY : null
    }
  }

  componentDidMount () {
    let lineString = 'M'
    let shadeString = `M0 300 L`;
    let X;
    let Y;
    let index;
    for (let i = 0; i < this.props.yValues.length; i++) {
      X = 700 * (i / this.props.dayRange);
      Y = 300 - (300 * this.props.yValues[i] / this.props.yMax)
      lineString += `${700 * (i / this.props.dayRange)} ${300 - (300 * this.props.yValues[i] / this.props.yMax) } `;
    }
    for (let i = 0; i < this.props.yValues.length; i++) {
      shadeString += `${700 * (i / this.props.dayRange)} ${300 - (300 * this.props.yValues[i] / this.props.yMax) } `;
      index = i;;
    }
    shadeString += `${700 * (index / this.props.dayRange)} 300`;
    this.setState({line : lineString, shade : shadeString, circleX : X, circleY : Y});

  }

  componenetDidUpdate () {
  }

  render () {
    return (
      <svg className="xs" width="700" height="300">
        <path id='deriveShade' stroke='white' fill='white' d={this.state.shade} onMouseEnter={this.enterHandler} onMouseLeave={this.leaveHandler} ></path>
        <path id='derivLine' stroke='#636363' fill='none' d={this.state.line}></path>
        <CirclePoint 
          x={this.state.circleX}
          y={this.state.circleY}
        />
      </svg>
    );
  }

  enterHandler(e) {
    document.getElementById('deriveShade').style.fill = '#63c9ff';
    document.getElementById('deriveShade').style.stroke = '#636363';
    console.log('in');
  }

  leaveHandler(e) {
    document.getElementById('deriveShade').style.fill = 'white';
    document.getElementById('deriveShade').style.stroke = 'white';
    console.log('out');
  }

}

  

export default Display;