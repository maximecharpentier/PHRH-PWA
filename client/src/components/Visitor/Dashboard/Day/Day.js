import React, { Component } from 'react'

import Week from './../Week/Week'
import './Day.scss';

class Day extends Component {

    state = {}
    
    render() {
        return ( 
            <div className="Day">
                <div className="Day__header">
                    <ul className="Day__label">{this.props.label}</ul>
                </div>
            </div>
         );
    }
}
 
export default Day;