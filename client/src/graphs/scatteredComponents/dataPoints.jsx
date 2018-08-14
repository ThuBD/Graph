import React, { Component } from 'react';
import DataPoint from './dataPoint.jsx';
import moment from 'moment'

class DataPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <svg className="xs" width="700" height="300">
        {this.props.y.map((yVal, index) => {
          return (
            <DataPoint
              salary={Number(yVal.substring(1))}
              date={new Date(Number(this.props.x[index]))}
              company={this.props.name[index]}
              yMin={this.props.yMin}
              xMin={this.props.xMin}
              xMax={this.props.xMax}
              yRange={this.props.yRange}
              xRange={this.props.xRange}
              ind={index + 1}
              mainGraphComp={this.props.mainGraphComp}
            />
          );
        })}
      </svg>
    );
  }
}

export default DataPoints;