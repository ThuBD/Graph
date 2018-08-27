import React, { Component } from 'react';

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
  }

  componentDidUpdate () {
  }
  // renders entire earnings section with YAxis, DataPoints, XAxis, and Descriptions as subcomponents
  render () {
    return (
      <div>
        <div>Date : {`${new Date(this.props.date.substring(0, 11)).getMonth() + 1}/${new Date(this.props.date.substring(0, 11)).getDate()}/${new Date(this.props.date.substring(0, 11)).getFullYear()}`}</div>
        <div>WeeklySum : {this.props.weeklySum}</div>
        <div>{`${this.props.accumulated} of ${this.props.total} applications`}</div>
        <div>Features to be added : </div>
        <div>Companies recently applied on {`${new Date(this.props.date.substring(0, 11)).getMonth() + 1}/${new Date(this.props.date.substring(0, 11)).getDate()}/${new Date(this.props.date.substring(0, 11)).getFullYear()}`}</div>
      </div>
      
    ) 
  }
}

export default Description;