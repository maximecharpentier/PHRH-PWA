import React, { Component } from 'react';

import './WeekSelection.scss';

class WeekSelection extends Component {
    state = {
        currentWeek: [],
        nextWeek: []
    }

    getCurrentWeek = () => {
        let currentDay = new Date()
        let currentWeek = []

        for (let i = 1; i <= 7; i++) {
            let firstDayOfTheWeek = currentDay.getDate() - currentDay.getDay() + i
            let newDay = new Date(currentDay.setDate(firstDayOfTheWeek)).toISOString().slice(0, 10)
            currentWeek.push(newDay)
        }
        this.setState({
            currentWeek
        }, () => console.log(this.state))
    }

    render() { 
        
        return (
            <div className="WeekSelection">
                <p className="WeekSelection__text">15 - 21 Fév 2020</p>
                <div className="WeekSelection__buttons">
                    <button className="WeekSelection__button WeekSelection__button--active" onClick={this.getCurrentWeek}>Semaine en cours</button>
                    <button className="WeekSelection__button">Semaine suivante</button>
                </div>
            </div>
        );
    }
}
 
export default WeekSelection;