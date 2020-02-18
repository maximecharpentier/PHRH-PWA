import React, { Component } from 'react'

import Calendar from './Calendar/Calendar'
import Mode from './Mode/Mode'
import Week from './Week/Week'

class Dashboard extends Component {
    state = {  }
    render() { 
        return (
            <section>
                <Calendar />
                <Mode />
                <Week />
            </section>
        );
    }
}
 
export default Dashboard;