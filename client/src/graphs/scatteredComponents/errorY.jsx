import React, { Component } from 'react';

class ErrorY extends Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div id='errorMessage'>
        Not enough salary difference to produce a graph
      </div>
    );
  }
}

export default ErrorY;