import React, { Component } from 'react';
import moment from 'moment';

class CirclePoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 700 px x 300 px
      x : -100,
      y : -100
    }
  }

  componentDidMount () {
   
  }

  render () {
    return (
      <g transform={"translate(" + this.props.x + ", " + this.props.y + ")"}>
        <circle r="4.5" fill="#636363" className={"circlePoint" + this.props.ind + ', estCircle'} />
      </g>
    )
  }
}

export default CirclePoint;