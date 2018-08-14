import React, { Component } from 'react';
import moment from 'moment';

class DataPoint extends Component {
  constructor(props) {
    super(props);
    this.enterHandler = this.enterHandler.bind(this);
    this.leaveHandler = this.leaveHandler.bind(this);
    this.state = {
      // 700 px x 300 px
      x : -100,
      y : -100
    }
  }

  enterHandler(e) {
    this.props.mainGraphComp.setState({showDescription : true, showCompany : this.props.company, showDate : this.props.date, showMore : 'This feature to be improved!! =)', showSalary : this.props.salary});
  }

  leaveHandler(e) {
    this.props.mainGraphComp.setState({showDescription : false, showCompany : null, showDate : null, showMore : null, showSalary : null});
  }

  componentDidMount () {
    let currX = this.props.date;
    let minX = this.props.xMin;
    let maxX = this.props.xMax;

    let minMoment = moment([minX.getFullYear(), minX.getMonth(), minX.getDate()]);
    let currMoment = moment([currX.getFullYear(), currX.getMonth(), currX.getDate()]);
    let maxMoment = moment([maxX.getFullYear(), maxX.getMonth(), maxX.getDate()]);
    let dayDiff = currMoment.diff(minMoment, 'days');
    let totDiff = maxMoment.diff(minMoment, 'days');
    let yMultiplier = (this.props.salary - this.props.yMin) / this.props.yRange;
    let xMultiplier = dayDiff/totDiff;
    this.setState({x : 700 * xMultiplier, y : 300 * (1 - yMultiplier)});
  }

  render () {
    return (
      <g onMouseEnter={this.enterHandler} onMouseLeave={this.leaveHandler} transform={"translate(" + (this.state.x) + ", " + (this.state.y) + ")"}>
        <circle r="9" fill="#DC8C8C" className={"dataPoint" + this.props.ind + ', estCircle'} />
      </g>
    )
  }
}

export default DataPoint;