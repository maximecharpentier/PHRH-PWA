import React, { Component } from 'react';

import Week from './Week/Week';

import './Dashboard.scss';

class Dashboard extends Component {
    state = {  }
    render() { 
        return (
            <section className="Dashboard">
                <Week />
            </section>
        );
    }
}
 
export default Dashboard;