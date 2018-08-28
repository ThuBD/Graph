import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import moment from 'moment'
import YAxis from './yAxis.jsx';
import XAxis from './xAxis.jsx';
import Display from './display.jsx';
import Description from './description.jsx';
// import DataPoints from './dataPoints.jsx';
// import Description from './description.jsx';
// import BlankDescription from './blankDescription.jsx';

class HasApplications extends Component {
  constructor(props) {
    super(props);
    this.produceYAxisArray = this.produceYAxisArray.bind(this);
    this.produceDerivative = this.produceDerivative.bind(this);
    this.state = {
      companies : [],
      datesApplied : [],
      datesHeard : [],
      yAxisValues : [],
      yValues : [],
      xAxisValues : [],
      lastDay : null, // in actual practice, this will be collected by getting current date on use. for now, last heard was arbitraily chosen. 
      dummy : [],
      xTrigger : false,
      yTrigger : false,
      yMin : null,
      yRange : null,
      xMin : null,
      xMax : null,
      xRange : null,
      showWeeklySum : null,
      showCompany : null,
      showDate : `${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`,
      appsPerDay : [],
      showCompanies : '',
      accumulated : 0,
      total : 0,
      appliedOnDay : 0,
      daysSinceFirst : 0
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
    let dummy;
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
    this.produceDerivative(eachAppDay);
    dummy = this.state.dummy;
    if (dummy.length > 0) {
      let yValues = dummy[0];
      let appsPerDay = dummy[1];
      let total = appsPerDay.reduce((accum, element) => {
        return (accum + element);
      });
      let yMax = yValues.reduce((accum, element) => {
        if (element > accum) { return element } else { return accum }
      });
      yMax = Math.floor(yMax * 1.25) + (4 - (Math.floor(yMax * 1.25)) % 4);
      let yInterval = yMax / 4;
      let yArray = [0, yInterval, 2 * yInterval, 3 * yInterval, 4 * yInterval];
      console.log('state updated ', this);
      return [yArray, yValues, total, appsPerDay]; 
    }
  }

  produceDerivative (eachApp) {
    // return a single calculated y value, which will be pushed to derivatives array
    // need Apps count from last 7 days
    $.ajax({
      url: `http://localhost:2807/dataProcessing/lineGraph/yAxis/derivative`,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(eachApp),
      success: (data) => {
        this.setState({dummy : data});
      },
      error: (error) => {
        console.log('Failed to access the data base : ', error);
      }
    }) 
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
          xAxisValues={this.state.xAxisValues}
          yMax={this.state.yAxisValues[0]}
          dayRange={this.state.xRange}
          mainGraphComp={this}
          appsPerDay={this.state.appsPerDay}
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
          this.setState({ yAxisValues : yAxisValuesReversed, yMin : yAxisValues[0][0], yRange : yAxisValues[0].length, yValues : yAxisValues[1], yTrigger : true, total : yAxisValues[2], appsPerDay : yAxisValues[3]});
        }
      
      }
      if (this.state.yRange > 0 && this.state.xRange > 0) {
        this.renderComponentsIfMetCondition();
      }
    };

      ReactDOM.render(
        <Description
          date={this.state.showDate}
          weeklySum={this.state.showWeeklySum}
          accumulated={this.state.accumulated}
          total={this.state.total}
          data={this.props.data}
          mainGraphComp={this}
          companies={this.state.showCompanies}
        />
      , document.getElementById('attachDescription'));
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