import React, { Component } from 'react';

class GraphOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }

  componentDidUpdate () {
    
  }

  // renders entire earnings section with YAxis, DataPoints, XAxis, and Descriptions as subcomponents
  render () {
    return (
      <option value={this.props.selected} className="graphSelector">
      {this.props.selected}
      </option>
    ) 
  }
}

export default GraphOptions;