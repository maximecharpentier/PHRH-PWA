import React, { Component } from 'react'
import Day from '../Day/Day'
import './Week.scss';

class Week extends Component {

    state = [
        {
            label: 'Lundi',
            date: '17',
            month: 'Février'
        },
        {
            label: 'Mardi',
            date: '18',
            month: 'Février'
        },
        {
            label: 'Mercredi',
            date: '19',
            month: 'Février'
        },
        {
            label: 'Jeudi',
            date: '20',
            month: 'Février'
        },
        {
            label: 'Vendredi',
            date: '21',
            month: 'Février'
        }
    ]

    renderDays = () => {
        const days = this.state;
        return days.map((item, id) =>
            <Day
                key={id}
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