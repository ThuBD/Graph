import React, { Component } from 'react';

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
  }

  // renders entire earnings section with YAxis, DataPoints, XAxis, and Descriptions as subcomponents
  render () {
    return (
      <div>
        <div>Date : {this.props.date}</div>
        <div>WeeklySum : {this.props.weeklySum}</div>
      </div>
      
    ) 
  }
}

export default Description;