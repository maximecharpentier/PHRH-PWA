import React, { Component } from 'react'

import Day from './../Day/Day'

class Week extends Component {

    state = [
        {
            label: 'Lundi',
            date: '17'
        },
        {
            label: 'Mardi',
            date: '18'
        },
        {
            label: 'Mercredi',
            date: '19'
        },
        {
            label: 'Jeudi',
            date: '20'
        },
        {
            label: 'Vendredi',
            date: '21'
        }
    ]

    renderDays = () => {
        const days = this.state;
        return days.map((item, id) =>
            <Day
                key={id}
                label={item.label}
                date={item.date}
            />
        );
    }

    render() {
        return (
            <div className="Week">
                {this.renderDays()}
            </div>
        );
    }
}

export default Week;