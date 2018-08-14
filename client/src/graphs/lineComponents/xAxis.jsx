import React, { Component } from 'react';
import XAxisTick from './xAxisTick.jsx';

class XAxis extends Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div className="xlabel">
        {this.props.values.map((date, index) => {
          return (
            <XAxisTick 
              xValue={date}
              ind={index + 1}
              factor={index / this.props.values.length}
            />
          );
        })}
      </div>
    )
  }
}

export default XAxis;