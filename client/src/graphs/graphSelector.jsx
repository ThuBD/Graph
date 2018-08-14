import React, { Component } from 'react';
import GraphOptions from './graphOptions.jsx';
import ReactDOM from 'react-dom';
import faker from 'faker';
import moment from 'moment';
import Line from './Line.jsx';
import Scattered from './Scattered.jsx';
import Pie from './Pie.jsx';
import Rate from './Rate.jsx';

class GraphSelector extends Component {
  constructor(props) {
    super(props);
    this.optionsHandler = this.optionsClick.bind(this);
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
      componentDisplay : Line
    }
  }

  componentDidMount () {
    let randomNumb;

    let offerCount = 0;
    let numbApplied = 30 + Math.ceil(300 * Math.random());
    let data = []
    for (var i = 0; i < numbApplied; i++) {
      randomNumb =  Math.random();
      data[i] = {};
      data[i].dateApp = faker.date.between('2018-09-01', '2019-01-14');
      data[i].dateHeard = faker.date.future(0.1, data[i].dateApp);
      // Get date difference to give weight to higher chance of higher salary over time
      let a = moment([2018, 8, 1]);
      let b = moment([data[i].dateHeard.getFullYear(), data[i].dateHeard.getMonth(), data[i].dateHeard.getDate()])
      // let b = moment([]);
      let daysSinceFirstApp = b.diff(a, 'days');
      data[i].company = faker.company.companyName();
      if (randomNumb > 0.97) {
        data[i].status = 'accepted';
        let lowerLimit = 55000 + daysSinceFirstApp * 20000 / (daysSinceFirstApp + 50);
        let upperLimit = 105000 + daysSinceFirstApp * 40000 / (daysSinceFirstApp + 50);
        data[i].salary = faker.commerce.price(lowerLimit, upperLimit, 2, "$");
        offerCount++;
      } else {
        data[i].status = 'rejected';
        data[i].salary = null;
      }
    }
    this.setState({data : data, offerCount : offerCount});
  }

  componentDidUpdate () {
    // can set state of graphs list based on status of user's membership
    // should run this once user logs in / changes selected graph
    ReactDOM.render(
      React.createElement(this.state.componentDisplay, {data : this.state.data, offerCount : this.state.offerCount}), document.getElementById('graphDisplay'))
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