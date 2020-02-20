import React, { Component } from 'react'
import Day from '../../Day/Day'

class Week extends Component {
    state = {
        allDay: ["Monday", "Thusday"],
    }
    render() {
        return (
            <div className="Week">
                {/* {this.state.allDay.map(days => <Day OneDay={days} />)} */}
            </div>
        );
    }
}

export default Week;