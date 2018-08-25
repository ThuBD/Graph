import React, { Component } from 'react';

class BlankTooltip extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
   
  }

  render () {
    return (
      <div id="tooltip">
        <svg width="24" height="20" viewBox="0 0 24 20" id="tooltipArrow">
        </svg>
      </div>
    )
  }
}

export default BlankTooltip;