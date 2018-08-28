import React, { Component } from 'react';

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {

  }

  componentDidUpdate () {
    // console.log(this.props);
    // let companies = '';
    // this.props.data.forEach((element, index) => {
    //   let date = element.dateApp;
    //   let clickedDate = new Date(this.props.date.substring(1, 11));
    //   if (date.toString().substring(0, 15) == clickedDate.toString().substring(0, 15)) {
    //     console.log('Yes!')
    //     companies += `${element.company}, \n`;
    //   }
    // });
    // if (companies.length > 0) {
    //   this.props.mainGraphComp.setState({showCompanies : companies}) 
    // }


    // <div>Companies recently applied on {`${new Date(this.props.date.substring(0, 11)).getMonth() + 1}/${new Date(this.props.date.substring(0, 11)).getDate()}/${new Date(this.props.date.substring(0, 11)).getFullYear()}`} : </div>
    //     <div>{this.props.companies}</div>
  }
  // renders entire earnings section with YAxis, DataPoints, XAxis, and Descriptions as subcomponents
  render () {
    return (
      <div>
        <div>Date : {`${new Date(this.props.date.substring(0, 11)).getMonth() + 1}/${new Date(this.props.date.substring(0, 11)).getDate()}/${new Date(this.props.date.substring(0, 11)).getFullYear()}`}</div>
        <div>WeeklySum : {this.props.weeklySum}</div>
        <div>{`${this.props.accumulated} of ${this.props.total} applications`}</div>
        
      </div>
      
    ) 
  }
}

export default Description;