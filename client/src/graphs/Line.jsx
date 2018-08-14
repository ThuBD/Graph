import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HasApplications from './lineComponents/hasApplications.jsx';

// Line graphs to show 
// number of total applications (left)
// number of heard back and currently in process (right, goes up and down)
// number of total offers (right)
// 

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }

  componentDidMount () {
    if (this.props.data.length > 1) {
      ReactDOM.render(
        React.createElement(HasApplications, { data: this.props.data}), 
      document.getElementById('hasApplications'));
    }
  }

  // renders entire earnings section with YAxis, DataPoints, XAxis, and Descriptions as subcomponents
  render () {
    return (
      <div id='hasApplications'>
      Required to have more than one application!
      </div>
    ) 
  }
}

export default Line;