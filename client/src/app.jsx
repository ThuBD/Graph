import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Userinput from './userinput.jsx'
import Dropdown from './select.jsx'
import GraphSelect from './graphs/graphSelector.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    
  }

  render () {
    return (
      <div id="graphsService">
      <GraphSelect />
      </div> 
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

//           <select onChange = {this.handleSelect.bind(this)} >
//           {this.state.lines.map(value =>{
//            return <Eachline line = {value} handleSelect = {this.handleSelect.bind(this)}/>
//           })}
//           </select>