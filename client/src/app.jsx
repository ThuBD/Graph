import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Userinput from './userinput.jsx'
import Dropdown from './select.jsx'
import GraphSelect from './graphs/graphSelector.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.chooseFakeData = this.chooseFakeData.bind(this);
    this.fetchFakeUserData = this.fetchFakeUserData.bind(this);
    this.fetchFakeJobsData = this.fetchFakeJobsData.bind(this);
    this.state = {
      user_obj : {},
      jobs_array : [],
      loaded_jobs : false
    }
  }

  componentDidMount () {
    let user_id = this.chooseFakeData ();
    this.fetchFakeUserData(user_id);
    this.fetchFakeJobsData(user_id);

  }

  componentDidUpdate () {
    if (this.state.loaded_jobs) {
      ReactDOM.render(
        React.createElement(GraphSelect, {userObj : this.state.user_obj, jobsArray : this.state.jobs_array}), document.getElementById('graphsService'))
    }
  }

  render () {
    return (
      <div id="graphsService">
      </div> 
    )
  }

  chooseFakeData () {
    let user_id;
    user_id = prompt("enter user id to test!");
    user_id = Number(user_id);
    while (user_id === undefined || isNaN(user_id) || user_id < 1 || user_id > 200000) {
      user_id = prompt(`Invalid input ${user_id}. Input must be a number between 1 to 200000! enter user id to test!`);
      user_id = Number(user_id);
      console.log(user_id, typeof user_id);
    }
      return user_id;
  }

  fetchFakeUserData (user_id) {
    $.ajax({
      url: `http://localhost:2807/users/${user_id}`,
      type: 'GET',
      contentType: 'application/json',
      success: (data) => {
        console.log(this.state)
        this.setState({
          user_obj : data
        });
      },
      error: (error) => {
        console.log('Failed to access the data base : ', error);
      }
    })
  }

  fetchFakeJobsData (user_id) {
    $.ajax({
      url: `http://localhost:2807/jobs/${user_id}`,
      type: 'GET',
      contentType: 'application/json',
      success: (data) => {
        this.setState({
          jobs_array : data,
          loaded_jobs : true
        });
      },
      error: (error) => {
        console.log('Failed to access the data base : ', error);
      }
    })
  }

}



ReactDOM.render(<App />, document.getElementById('app'));

//           <select onChange = {this.handleSelect.bind(this)} >
//           {this.state.lines.map(value =>{
//            return <Eachline line = {value} handleSelect = {this.handleSelect.bind(this)}/>
//           })}
//           </select>