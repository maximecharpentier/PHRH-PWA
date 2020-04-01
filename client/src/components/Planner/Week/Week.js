import React, { Component } from "react"
import Day from "../Day/Day"
import "./Week.scss";

class Week extends Component {
    constructor(props) {
        super(props);
    }
    state = [
        {
            id: 1,
            label: 'Lun.',
            date: ''
        },
        {
            id: 2,
            label: 'Mar.',
            date: ''
        },
        {
            id: 3,
            label: 'Mer.',
            date: ''
        },
        {
            id: 4,
            label: 'Jeu.',
            date: ''
        },
        {
            id: 5,
            label: 'Ven.',
            date: ''
        }
    ]

    getDay = (dateString) => {
        const dates = this.props.isNextWeek ? this.props.nextWeek : this.props.currentWeek;
        if (dates.length) {
            return dateString.replace(/2020-[0-1][0-9]-/g, '')
        } else {
            return "00"
        }
    }
    
    renderDays = () => {
        const days = this.state;
        return days.map((item, id) =>
            <Day
                key={id}
                id={item.id}
                label={item.label}
                date={this.getDay(this.props.isNextWeek ? this.props.nextWeek[id] : this.props.currentWeek[id])}
                visits={ id === 1 ? this.context.journees : null}
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