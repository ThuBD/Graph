import React, { Component } from 'react';
import CirclePoint from './circlePoint.jsx';
import moment from 'moment'

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
      coordinates : [],
      firstDate : null,
      range : 0
    }
  }

  componentDidMount () {
    let lineString = 'M'
    let shadeString = `M0 300 L`;
    let X;
    let Y;
    let index;
    let coordinates = [];

    let firstDay = new Date(this.props.xAxisValues[0]);
    let lastDay = new Date(this.props.xAxisValues[this.props.xAxisValues.length - 1]);
    let firstMoment = moment([firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate()]);
    let lastMoment = moment([lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate()]);
    let range = lastMoment.diff(firstMoment, 'days');

    for (let i = 0; i < this.props.yValues.length; i++) {
      X = 700 * (i / range);
      Y = 300 - (300 * this.props.yValues[i] / this.props.yMax)
      lineString += `${700 * (i / range)} ${300 - (300 * this.props.yValues[i] / this.props.yMax) } `;
      coordinates.push({X : X, Y : Y});
    }
    for (let i = 0; i < this.props.yValues.length; i++) {
      shadeString += `${700 * (i / range)} ${300 - (300 * this.props.yValues[i] / this.props.yMax) } `;
      index = i;;
    }
    shadeString += `${700 * (index / range)} 300`;
    
    
    console.log(range);


    this.setState({line : lineString, shade : shadeString, circleX : X, circleY : Y, coordinates : coordinates, firstDate : new Date(this.props.mainGraphComp.state.xAxisValues[0]), range : range});

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
    let selectedDay = Math.round(this.state.range * (e.screenX - 57) / 630);

    if (selectedDay <= this.props.yValues.length - 1) {
      this.setState({circleX : this.state.coordinates[selectedDay].X, circleY : this.state.coordinates[selectedDay].Y});
    }

    let newDate = moment([this.state.firstDate.getFullYear(), this.state.firstDate.getMonth(), this.state.firstDate.getDate()]);
   
   newDate.add(selectedDay, 'days');
    this.props.mainGraphComp.setState({showWeeklySum : this.props.yValues[selectedDay], showDate : JSON.stringify(newDate)})
    // this.props.mainGraphComp.setState({showWeeklySum : this.props.yValues[selectDay], showDate : });
    // this.setState
  }

  trackerLeaveHandler(e) {
    document.getElementById('circleTrackerColor').style.width = '0px';
  }

}

  

export default Display;