import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import YAxis from './yAxis.jsx';
import XAxis from './xAxis.jsx';
import Display from './display.jsx';
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
      yValues : [],
      xAxisValues : [],
      lastDay : null, // in actual practice, this will be collected by getting current date on use. for now, last heard was arbitraily chosen. 
      xTrigger : false,
      yTrigger : false,
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
    let derivatives = [];
    let firstDay = new Date(this.state.xAxisValues[0]);
    let lastDay = this.state.lastDay;
    let firstMoment = moment([firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate()]);
    let lastMoment = moment([lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate()]);
    let dayRange = lastMoment.diff(firstMoment, 'days');
    let eachAppDay = this.state.datesApplied.map((element, index) => {
      currentMoment = moment([element.getFullYear(), element.getMonth(), element.getDate()]);
      return currentMoment.diff(firstMoment, 'days');
    }).sort((a, b) => {return a - b});
    let yValues = this.produceDerivative(eachAppDay);
    let yMax = yValues.reduce((accum, element) => {
      if (element > accum) { return element } else { return accum }
    });
    yMax = Math.floor(yMax * 1.25) + (4 - (Math.floor(yMax * 1.25)) % 4);
    let yInterval = yMax / 4;
    let yArray = [0, yInterval, 2 * yInterval, 3 * yInterval, 4 * yInterval];
    return [yArray, yValues];
  }

  produceDerivative (eachApp) {
    // return a single calculated y value, which will be pushed to derivatives array
    // need Apps count from last 7 days
    let current = 0;
    let count = 0;
    let output1 = [];
    let output2 = [];
    eachApp.forEach((element, index) => {
      if (current === element) {
        count++;
      } else if (element - current === 1) {
        output1.push(count);
        count = 1;
        current = element;
      } else {
        output1.push(0);
        current = element;
      }
    });
    output1.push(count);
    let n;
    for (let i = 0; i < output1.length; i++) {
      n = 6;
      while (i - n < 0) {
        n--;
      }
      // console.log(output1.slice(i - n, i + 1))
      output2.push(output1.slice(i - n, i + 1).reduce((accum, elem) => {
        return (accum + elem)
      }));
    };
    n = 6;
    let last = output1.length;
    while (last - n < last) {
      output2.push(output1.slice(last - n, last).reduce((accum, elem) => {
        return (accum + elem)
      }));
      // console.log(output1.slice(last - n, last));
      n--;
    };
    return output2;
    // return derivatives
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
    let numberOfTicks = this.decideSizeOfXAxis(dayRange);

    let msInterval = Math.round(dayRange / numberOfTicks) * 86400000;
    let ind = 0;
    let upperLimit = maxX.getTime() + msInterval / 10;

    while (output[ind].getTime() < upperLimit) {
      output.push(new Date(output[ind].getTime() + msInterval));
      ind++
    };

    output = output.map((element) => {
      return ((element.getMonth() + 1) + '/' + element.getDate() + '/' + element.getFullYear());
    });
    return [output, new Date(output[0]), dayRange, new Date(output[output.length - 1]), maxX];

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
        <YAxis
          values={this.state.yAxisValues}
        />
      , document.getElementById('attachYAxis'));

     ReactDOM.render(
        <Display 
          yValues={this.state.yValues}
          yMax={this.state.yAxisValues[0]}
          dayRange={this.state.xRange}
        />
      , document.getElementById('attachDisplay'));

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
    if (!this.state.xTrigger) {
      this.setState({ xAxisValues : xAxisValues[0], xTrigger : true, xMin : xAxisValues[1], xMax : xAxisValues[3], xRange : xAxisValues[2], lastDay : xAxisValues[4]});
    }
    
    if (this.state.lastDay !== null) {
      if (!this.state.yTrigger) {
      this.produceXAxisArray();
      let yAxisValues = this.produceYAxisArray();
        if (yAxisValues !== undefined) {
          let yAxisValuesReversed = yAxisValues[0].reverse();
          this.setState({ yAxisValues : yAxisValuesReversed, yMin : yAxisValues[0][0], yRange : yAxisValues[0].length, yValues : yAxisValues[1], yTrigger : true });
        }
      
      }
      if (this.state.yRange > 0 && this.state.xRange > 0) {
        this.renderComponentsIfMetCondition();
      }
    };
  }

  // renders entire section with YAxis, DataPoints, XAxis, and Descriptions as subcomponents
  render () {
    return (
      <section id="lineComponent">
        <header className="graphsHead">
        Performance Chart
        </header>
        <div className="chartDiv">
          <div className="chartContainer">
            <div className="innerChartContainer">
              <div className="axes" id="errorHere">
                <div id="attachYAxis">Required to have applications on more than two separate days!</div>
                <div id="attachDisplay"></div>
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