import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import YAxis from './yAxis.jsx';
import XAxis from './xAxis.jsx';
import DataPoints from './dataPoints.jsx';
import Description from './description.jsx';
import BlankDescription from './blankDescription.jsx';

class HasOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies : [],
      datesApplied : [],
      datesHeard : [],
      salaries : [],
      yAxisValues : [],
      xAxisValues : [],
      trigger : false,
      yMin : null,
      xMin : null,
      xMax : null,
      yRange : null,
      xRange : null,
      showDescription : false,
      showCompany : null,
      showDate : null,
      showSalary : null,
      showMore : null
    }
  }

  produceYAxisArray () {
    let valuesInNumb = this.state.salaries.map((element) => {
      return Number(element.substring(1));
    });
    let minY = Math.min(...valuesInNumb);
    let maxY = Math.max(...valuesInNumb);
    let padding = (maxY - minY) * 0.24;
    minY = Math.round((minY - padding)/10000) * 10000;
    maxY = Math.round((maxY + padding)/10000) * 10000;

    let difference = maxY - minY;
    let yAxisSize = this.decideSizeOfYAxis();

    if (yAxisSize === 0) {
      this.renderYComponentsIfMetCondition();
      return [];
    } else {
      let interval = (maxY - minY) / yAxisSize;
      let output = [];
      for (let i = yAxisSize; i >= 0; i--) {
        output.push('$' + String(minY + i * interval));
      }
      return [output, Number(output[output.length - 1].substring(1)), (maxY - minY)];
    }
  }

  produceXAxisArray () {
    let output = [];
    let minX = this.state.datesHeard.reduce((accum, element) => {
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
      this.renderXComponentsIfMetCondition();
    }

    let numberOfTicks = this.decideSizeOfXAxis(dayRange);

    let msInterval = Math.round(dayRange / numberOfTicks) * 86400000;
    let ind = 0;
    let upperLimit = maxX.getTime() + msInterval / 3;

    while (output[ind].getTime() < upperLimit) {
      output.push(new Date(output[ind].getTime() + msInterval));
      ind++
    };
    output.unshift(new Date(output[0].getTime() - msInterval));

    output = output.map((element) => {
      return ((element.getMonth() + 1) + '/' + element.getDate() + '/' + element.getFullYear());
    });
    return [output, new Date(output[0]), dayRange, new Date(output[output.length - 1])];
  }

  decideSizeOfYAxis (difference) {
    if (difference === 0) {
      return 0;
    }
    if (difference > 0 && difference < 10000) {
      return 1;
    }
    if (difference >= 10000 && difference < 20000 ) {
      return 2;
    }
    if (difference >= 20000 && difference < 30000) {
      return 3;
    }
    if (difference >= 30000 && difference < 40000) {
      return 4;
    }
    return 5;
  }

  decideSizeOfXAxis (dayRange) {
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

  renderYComponentsIfMetCondition () {
    ReactDOM.render(
        <ErrorY
          values={this.state.yAxisValues}
        />
      , document.getElementById('errorHere'));
  }

  renderXComponentsIfMetCondition () {
    ReactDOM.render(
        <YAxis
          values={this.state.yAxisValues}
        />
      , document.getElementById('attachYAxis'));

      ReactDOM.render(
        <DataPoints 
          x={this.state.datesHeard}
          y={this.state.salaries}
          name={this.state.companies}
          yMin={this.state.yMin}
          xMin={this.state.xMin}
          xMax={this.state.xMax}
          yRange={this.state.yRange}
          xRange={this.state.xRange}
          mainGraphComp={this}
        />
      , document.getElementById('attachDataPoints'));

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
    let salaries = [];
    console.log(this.props.data);
    this.props.data.forEach((element) => {
      if (element.status === 'offer') {
        companies.push(element.company);
        datesApplied.push(element.dateApp);
        datesHeard.push(element.dateHeard);
        salaries.push(element.salary);
      };
    });
    this.setState({
      companies : companies,
      datesApplied : datesApplied,
      datesHeard : datesHeard,
      salaries : salaries
    });
  }

  componentDidUpdate () {
    // create values for yAxis based on range of salaries
    // also create values for xAxis based on range of dates
    // edge cases, multiple in only one day
      let yAxisValues = this.produceYAxisArray();
      let xAxisValues = this.produceXAxisArray();
    if (!this.state.trigger) {
      this.setState({ yAxisValues : yAxisValues[0], xAxisValues : xAxisValues[0], trigger : true, yMin : yAxisValues[1], yRange : yAxisValues[2], xMin : xAxisValues[1], xMax : xAxisValues[3], xRange : xAxisValues[2]});
    }
    if (this.state.showDescription) {
      ReactDOM.render(
        <Description
          company={this.state.showCompany}
          date={this.state.showDate}
          showMore={this.state.showMore}
          salary={this.state.showSalary}
        />
      , document.getElementById('attachDescription'));
    } else {
      ReactDOM.render(
        <BlankDescription
        />
      , document.getElementById('attachDescription'));
    }
  }

  // renders entire section with YAxis, DataPoints, XAxis, and Descriptions as subcomponents
  render () {
    return (
      <section id="scatteredComponent">
        <header className="graphsHead">
        Salary Offers
        </header>
        <div className="chartDiv">
          <div className="chartContainer">
            <div className="innerChartContainer">
              <div className="axes" id="errorHere">
                <div id="attachYAxis">Required to get offers on more than two separate days!</div>
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

export default HasOffers;