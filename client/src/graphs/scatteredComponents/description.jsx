import React, { Component } from 'react';

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
    document.getElementById('salaryDeviation').style.color = `${this.props.salaryColor}`;
  }

  // renders entire earnings section with YAxis, DataPoints, XAxis, and Descriptions as subcomponents
  render () {
    return (
      <div>
        <div>
        Company : {this.props.company}
        </div>
        <div>
        Offered Salary : {'$' + this.props.salary}
        </div>
        <div>
        Deviation from Expected : <strong><i id='salaryDeviation'>{`${this.props.salaryDifference} (${this.props.salaryPercentage})`}</i></strong>
        </div>
        <div>
        Offer Date : {(this.props.date.getMonth() + 1) + '/' + this.props.date.getDate() + '/' + this.props.date.getFullYear()}
        </div>
        <div>
        {this.props.showMore}
        </div>
      </div>
    ) 
  }
}

export default Description;