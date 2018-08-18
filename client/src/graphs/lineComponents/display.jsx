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
      circleY : null,
      coordinates : []
    }
  }

  componentDidMount () {
    let lineString = 'M'
    let shadeString = `M0 300 L`;
    let X;
    let Y;
    let index;
    let coordinates = [];
    for (let i = 0; i < this.props.yValues.length; i++) {
      X = 700 * (i / this.props.dayRange);
      Y = 300 - (300 * this.props.yValues[i] / this.props.yMax)
      lineString += `${700 * (i / this.props.dayRange)} ${300 - (300 * this.props.yValues[i] / this.props.yMax) } `;
      coordinates.push({X : X, Y : Y});
    }
    for (let i = 0; i < this.props.yValues.length; i++) {
      shadeString += `${700 * (i / this.props.dayRange)} ${300 - (300 * this.props.yValues[i] / this.props.yMax) } `;
      index = i;;
    }
    shadeString += `${700 * (index / this.props.dayRange)} 300`;
    this.setState({line : lineString, shade : shadeString, circleX : X, circleY : Y, coordinates : coordinates});

  }

  componenetDidUpdate () {
  }

  render () {
    return (
      <div>
        <svg className="xs" width="700" height="300" onMouseMove={this.trackerMoveHandler} onMouseLeave={this.trackerLeaveHandler}>
          <path id='deriveShade' opacity='0' stroke='white' fill='white' d={this.state.shade} onMouseEnter={this.enterHandler} onMouseLeave={this.leaveHandler} ></path>
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
    document.getElementById('deriveShade').style.stroke = 'black';
    document.getElementById('deriveShade').style.opacity = '0.7';
  }

  leaveHandler(e) {
    document.getElementById('deriveShade').style.fill = 'white';
    document.getElementById('deriveShade').style.stroke = 'white';
    document.getElementById('deriveShade').style.opacity = '0';
  }

  trackerMoveHandler(e) {
    // this.setState((e.screenX - 57) * (704 / 630));
    document.getElementById('circleTrackerColor').style.width = `${(e.screenX - 57) * (704 / 630)}px`;
    let selectedDay = Math.round(this.props.dayRange * (e.screenX - 57) / 630);

    if (selectedDay <= this.props.yValues.length - 1) {
      this.setState({circleX : this.state.coordinates[selectedDay].X, circleY : this.state.coordinates[selectedDay].Y});
    }

   

    // this.setState
  }

  trackerLeaveHandler(e) {
    document.getElementById('circleTrackerColor').style.width = '0px';
  }

}

  

export default Display;