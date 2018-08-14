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
        <div>
        Company : {this.props.company}
        </div>
        <div>
        Salary : {'$' + this.props.salary}
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