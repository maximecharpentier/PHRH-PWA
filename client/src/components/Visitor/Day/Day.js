import React, { Component } from 'react';

class Day extends Component {
    state = {
        day: "",
        visitsOfTheDay: []
    }
    render(){
        return(
        <h1>{this.props.OneDay}</h1>
        )
    }
}
 
export default Day;