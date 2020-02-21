import React, { Component } from 'react'
import Day from '../Day/Day'
import './Week.scss';

class Week extends Component {
    state = [
        {
            id: 1,
            label: 'Lundi',
            date: '17',
            month: 'Février'
        },
        {
            id: 2,
            label: 'Mardi',
            date: '18',
            month: 'Février'
        },
        {
            id: 3,
            label: 'Mercredi',
            date: '19',
            month: 'Février'
        },
        {
            id: 4,
            label: 'Jeudi',
            date: '20',
            month: 'Février'
        },
        {
            id: 5,
            label: 'Vendredi',
            date: '21',
            month: 'Février'
        }
    ]

    renderDays = () => {
        const days = this.state;
        return days.map((item, ok) =>
            <Day
                id={item.id}
                key={ok}
                label={item.label}
                date={item.date}
                month={item.month}
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