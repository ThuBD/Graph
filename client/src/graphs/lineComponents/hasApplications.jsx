import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import YAxis from './yAxis.jsx';
import XAxis from './xAxis.jsx';
// import DataPoints from './dataPoints.jsx';
// import Description from './description.jsx';
// import BlankDescription from './blankDescription.jsx';

class HasApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies : [],
      datesApplied : [],
      datesHeard : [],
      yAxisValues : [],
      xAxisValues : [],
      lastDay : null,
      trigger : false,
      yMin : null,
      yRange : null,
      xMin : null,
      xMax : null,
      xRange : null,
      showRate : true,
      showInProc : false,
      showAccept : false,
      showDescription : false,
      showCompany : null,
      showDate : null,
      showSalary : null,
      showMore : null
    }
  }

  produceYAxisArray () {
    // make [] that goes into yAxisValues
    // and yMin and yRange
    // for each element array, loop and get min dateApp and max dateApp
    // use produceDerivate to get array of points
    // minY will be 0
    // maxY will be highest value in points + 20%
    // use decideSizeOfYAxis and produce YAxis with correct interval
    let currentAvg = 0;
    let currentDay = null;
    let currentMoment = null;
    let derivatives;
    let firstDay = new Date(this.state.xAxisValues[0]);
    let lastDay = this.state.lastDay;
    let firstMoment = moment([firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate()]);
    let lastMoment = moment([lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate()]);
    let dayRange = lastMoment.diff(firstMoment, 'days');
    let eachAppDay = this.state.datesApplied.map((element, index) => {
      currentMoment = moment([element.getFullYear(), element.getMonth(), element.getDate()]);
      return currentMoment.diff(firstMoment, 'days');
    }).sort((a, b) => {return a - b})
    console.log(dayRange);
    console.log(eachAppDay);
    for (let i = 0; i <= dayRange; i++) {
      this.produceDerivative();
    }
  }

  produceDerivative () {
    // return a single calculated y value, which will be pushed to derivatives array
    // need Apps count from last 7 days


    // return derivatives
  }

  weeklyAverage () {

  }


  produceXAxisArray () {
    // make [] that goes into xAxisValues
    // and xMin, xMax, xRange
    let output = [];
    let minX = this.state.datesApplied.reduce((accum, element) => {
      if (element.getTime() < accum.getTime()) {
        return element;
      }
      return accum;
    });
    output.push(minX);
    
    let maxX = this.state.datesHeard.reduce((accum, element) => {
      if (element.getTime() > accum.getTime()) {
        return element;
      }
      return accum;
    });
    let minMoment = moment([minX.getFullYear(), minX.getMonth(), minX.getDate()]);
    let maxMoment = moment([maxX.getFullYear(), maxX.getMonth(), maxX.getDate()]);
    let dayRange = maxMoment.diff(minMoment, 'days');

    // make sure data are more than a day apart
    if (dayRange > 1) {
      this.renderComponentsIfMetCondition();
    }

    let numberOfTicks = this.decideSizeOfXAxis(dayRange);

    let msInterval = Math.round(dayRange / numberOfTicks) * 86400000;
    let ind = 0;
    let upperLimit = maxX.getTime() + msInterval / 3;

    while (output[ind].getTime() < upperLimit) {
      output.push(new Date(output[ind].getTime() + msInterval));
      ind++
    };

    output = output.map((element) => {
      return ((element.getMonth() + 1) + '/' + element.getDate() + '/' + element.getFullYear());
    });
    return [output, new Date(output[0]), dayRange, new Date(output[output.length - 1]), maxX];
  }


  decideSizeOfYAxis (difference) {
    // use this set of rules in produceLYAxisArray

  }

  decideSizeOfXAxis (dayRange) {
   // use this set of rules in produceXAxisArray
   if (dayRange === 1) {
      return 2;
    }
    if (dayRange === 2) {
      return 3;
    }
    if (dayRange === 3) {
      return 4;
    }
    if (dayRange === 4) {
      return 5;
    }
    if (dayRange === 5) {
      return 6;
    }
    return 5;
  }

  renderErrorIfNotMetCondition () {
    // should be triggered if day range in 0 (must be separated by at least a day)

    ReactDOM.render(
        <ErrorY
          values={this.state.yAxisValues}
        />
      , document.getElementById('errorHere'));
  }

  renderComponentsIfMetCondition () {
    // based on the this.state.showAccum and others, render graph and pass the booleans down.
    ReactDOM.render(
        <XAxis
          values={this.state.xAxisValues}
        />
      , document.getElementById('attachXAxis'));
  }

  componentDidMount () {
    let companies = [];
    let datesApplied = [];
    let datesHeard = [];
    this.props.data.forEach((element) => {
        companies.push(element.company);
        datesApplied.push(element.dateApp);
        datesHeard.push(element.dateHeard);
    });
    this.setState({
      companies : companies,
      datesApplied : datesApplied,
      datesHeard : datesHeard
    });
  }

  componentDidUpdate () {
    let xAxisValues = this.produceXAxisArray();
    if (!this.state.trigger) {
      this.setState({ xAxisValues : xAxisValues[0], trigger : true, xMin : xAxisValues[1], xMax : xAxisValues[3], xRange : xAxisValues[2], lastDay : xAxisValues[4]});
    }
    if (this.state.lastDay !== null) {
      this.produceXAxisArray();
      this.produceYAxisArray();
    };
  }

  // renders entire section with YAxis, DataPoints, XAxis, and Descriptions as subcomponents
  render () {
    return (
      <section id="lineComponent">
        <header className="graphsHead">
        Number of Applications
        </header>
        <div className="chartDiv">
          <div className="chartContainer">
            <div className="innerChartContainer">
              <div className="axes" id="errorHere">
                <div id="attachYAxis">Required to applications on more than two separate days!</div>
                <div id="attachDataPoints"></div>
                <div id="attachXAxis"></div>
              </div>
            </div>
          </div>
        </div>
        <div id="attachDescription"></div> 
      </section>
    ) 
  }
}

export default HasApplications;