import React, { Component } from 'react';
import { EdtContext } from '../../../contexts/edt.context'

import Week from './Week/Week';

import './Dashboard.scss';

class Dashboard extends Component {
    state = {  }

    static contextType = EdtContext

    render() { 
        console.log(this.context.journees)
        return (
            <section className="Dashboard">
                <Week />
            </section>

        );
    }
}
 
export default Dashboard;