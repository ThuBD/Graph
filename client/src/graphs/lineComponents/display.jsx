import React, { Component } from 'react';
import CirclePoint from './circlePoint.jsx';

class Display extends Component {
  constructor(props) {
    super(props);
    this.enterHandler = this.enterHandler.bind(this);
    this.leaveHandler = this.leaveHandler.bind(this);
    this.trackerMoveHandler = this.trackerMoveHandler.bind(this);
    this.trackerLeaveHandler = this.trackerLeaveHandler.bind(this);
    this.state = {
      line : '',
      shade : '',
      trackerX : null,
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
      <div>
        <svg className="xs" width="700" height="300" onMouseMove={this.trackerMoveHandler}>
          <path id='deriveShade' opacity='0.7' stroke='white' fill='white' d={this.state.shade} onMouseEnter={this.enterHandler} onMouseLeave={this.leaveHandler} ></path>
          <path id='derivLine' stroke='#636363' fill='none' d={this.state.line}></path>
          <CirclePoint 
            x={this.state.circleX}
            y={this.state.circleY}
          />
        </svg>
        <div id="circleTracker"></div>
        <div id="circleTrackerColor"></div>
      </div>
    );
  }

  enterHandler(e) {
    document.getElementById('deriveShade').style.fill = '#63c9ff';
    document.getElementById('deriveShade').style.stroke = '#636363';
  }

  leaveHandler(e) {
    document.getElementById('deriveShade').style.fill = 'white';
    document.getElementById('deriveShade').style.stroke = 'white';
  }

  trackerMoveHandler(e) {
    this.setState({trackerX : e.screenX - 58});
    console.log(e.screenX - 58 * (704 / 632));
  }

  trackerLeaveHandler(e) {
  }

}

  

export default Display;