import React, { Component } from 'react';
import GraphOptions from './graphOptions.jsx';
import ReactDOM from 'react-dom';
import faker from 'faker';
import $ from 'jquery';
import moment from 'moment';
import Line from './Line.jsx';
import Scattered from './Scattered.jsx';
import Pie from './Pie.jsx';
import Rate from './Rate.jsx';

class GraphSelector extends Component {
  constructor(props) {
    super(props);
    this.optionsHandler = this.optionsClick.bind(this);
    this.makeData = this.makeData.bind(this);
    this.state = {
      data : [],
      offerCount : 0,
      graphs : ['Line','Scattered','Rate','Pie'],
      selectedGraph : Line,
      components : {
        Line : Line,
        Scattered : Scattered, 
        Rate : Rate, 
        Pie : Pie
      },
      componentDisplay : Line,
      trigger : false
    }
  }

  componentDidMount () {
    let offerCount = 0;
    this.makeData(this.props.jobsArray);
  }

  componentDidUpdate () {
    // can set state of graphs list based on status of user's membership
    // should run this once user logs in / changes selected graph
    ReactDOM.render(
      React.createElement(this.state.componentDisplay, {data : this.state.data, offerCount : this.state.offerCount}), document.getElementById('graphDisplay'))
  }


  makeData (jobs) {
    let offerCount = 0;
    $.ajax({
      url: `http://localhost:2807/dataProcessing/getData`,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(jobs),
      success: (data) => {
        offerCount = data[1];
        data = data[0];
        data.forEach((element, index) => {
          element.dateApp = new Date(element.dateApp);
          element.dateHeard = new Date(element.dateHeard);
        })
        if (this.state.trigger === false) {
          this.setState({data : data, offerCount : offerCount, trigger : true});
        };
      },
      error: (error) => {
        console.log('Failed to access the data base : ', error);
      }
    })
  }

  optionsClick (e) {
    this.setState({ selectedGraph : e.target.value, componentDisplay : this.state.components[e.target.value] })
  }

  // renders entire earnings section with YAxis, DataPoints, XAxis, and Descriptions as subcomponents
  render () {
    return (
      <section id="graphSelector">
        <select onChange={this.optionsHandler}>
        {this.state.graphs.map((graph) => {
          return (
            <GraphOptions 
              selected={graph}
            />
          );
        })}
        </select>
        <div id="graphDisplay">
        </div>
      </section>
    ) 
  }
}

export default GraphSelector;