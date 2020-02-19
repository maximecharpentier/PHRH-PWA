import React, { Component } from 'react';

import Calendar from './Calendar/Calendar';
import Mode from './Mode/Mode';
import Week from './Week/Week';

import './Dashboard.scss';

class Dashboard extends Component {
    state = {  }
    render() { 
        return (
            <section className="Dashboard">
                <div className="Dashboard__container">
                    <Calendar />
                    <Mode />
                </div>
                <Week />
            </section>
        );
    }
}
 
export default Dashboard;