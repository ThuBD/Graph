import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import moment from 'moment';
import HasOffers from './scatteredComponents/hasOffers.jsx';

class Scattered extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount () {
    if (this.props.offerCount > 1) {
      ReactDOM.render(
        React.createElement(HasOffers, { data: this.props.data, offerCount : this.props.offerCount}), 
      document.getElementById('hasOffers'));
    }
  }

  // renders entire earnings section with YAxis, DataPoints, XAxis, and Descriptions as subcomponents
  render () {
    return (
      <div id='hasOffers'>
      You Don't Have More Than Two or More Offers Yet!
      </div>
    ) 
  }
}

export default Scattered;