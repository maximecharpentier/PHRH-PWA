import React, { Component } from 'react'
import './Day.scss';

class Day extends Component {

    state = {}
    
    render() {
        return ( 
            <div className="Day">
                <div className="Day__header">
                    <p className="Day__label">{this.props.label}</p>
                    <p className="Day__date">{this.props.date}</p>
                </div>
                <div className="Day__tasks">
                    <button className="Day__button" onClick={() => {window.location = '/planner'}}>
                        <span>Planifier le</span>
                        <span>{this.props.label} {this.props.date} {this.props.month}</span>
                    </button>
                </div>
            </div>
         );
    }
}
 
export default Day;