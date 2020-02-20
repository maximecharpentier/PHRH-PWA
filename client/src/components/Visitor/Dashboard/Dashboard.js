import React, { Component } from 'react';

import Week from './Week/Week';
import WeekSelection from './WeekSelection/WeekSelection';

import './Dashboard.scss';

class Dashboard extends Component {
    state = {}
    render() { 
        return (
            <section className="Dashboard">
                <WeekSelection />
                <Week />
            </section>
        );
    }
}
 
export default Dashboard;