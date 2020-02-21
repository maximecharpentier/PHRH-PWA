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

    getNextWeek = () => {
        var currentDay = new Date();
        currentDay.setDate(currentDay.getDate() + 7);
        let nextWeek = []
        
        for (let i = 1; i <= 7; i++) {
            let firstDayOfTheWeek = currentDay.getDate() - currentDay.getDay() + i
            let newDay = new Date(currentDay.setDate(firstDayOfTheWeek)).toISOString().slice(0, 10)
            nextWeek.push(newDay)
        }
        this.setState({
            nextWeek
        }, () => console.log(this.state))
    }

    componentDidMount() {
        this.getCurrentWeek();
        this.getNextWeek();
    }
    getFirstDay = () => {
        if (this.state.currentWeek.length) {
            return  this.state.currentWeek[0].replace(/2020-[0-1][0-9]-/g, '')
        } else {
            return "00"
        }
    }
    getLastDay = () => {
        if (this.state.currentWeek.length) {
            return  this.state.currentWeek[4].replace(/2020-[0-1][0-9]-/g, '')
        } else {
            return "00"
        }
    }
    getMonthFr = () => {
        if (this.state.currentWeek.length) {
            const month = this.state.currentWeek[0].match(/-[0-1][0-9]-/g)[0].replace(/-/g, '')
            
            switch (month) {
                case '01':
                    return 'Janvier'
                case '02':
                    return 'Février'
            
                case '03':
                    return 'Mars'
            
                case '04':
                    return 'Avril'
                
                case '05':
                    return 'Mai'

                case '06':
                    return 'Juin'
                
                case '07':
                    return 'Juillet'
                
                case '08':
                    return 'Août'
                
                case '09':
                    return 'Septembre'
                    
                case '10':
                    return 'Octobre'
                        
                case '11':
                    return 'Novembre'

                case '12':
                    return 'Décembre'
                            

                default:
                    break;
            }
        }
    }
    render() { 
        
        return (
            <div className="WeekSelection">
                <p className="WeekSelection__text">{this.getFirstDay()} - {this.getLastDay()} {this.getMonthFr()} 2020</p>
                <div className="WeekSelection__buttons">
                    <button className="WeekSelection__button WeekSelection__button--active">Semaine en cours</button>
                    <button className="WeekSelection__button">Semaine suivante</button>
                </div>
            </div>
        );
    }
}
 
export default WeekSelection;