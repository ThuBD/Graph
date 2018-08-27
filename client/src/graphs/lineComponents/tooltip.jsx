import React, { Component } from 'react';

class Tooltip extends Component {
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
      <div id="tooltip">{`${this.props.accumulated} of ${this.props.total} total Apps`}
        <svg width="24" height="20" viewBox="0 0 24 20" id="tooltipArrow">
          <g>
            <path  d="M6.66133815e-15,6.89249489e-14 L24,1.30957403e-12 L3.34939321,18.8768262 L3.34939321,18.8768262 C2.5341158,19.6220755 1.26905894,19.5653065 0.523809649,18.750029 C0.186851616,18.3814084 2.34087955e-13,17.9000574 2.26929586e-13,17.4006358 L6.66133815e-15,6.89249489e-14 Z"></path>
          </g>
        </svg>
      </div>
    )
  }
}

export default Tooltip;