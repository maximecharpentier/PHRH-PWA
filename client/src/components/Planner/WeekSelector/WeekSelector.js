import React, { Component } from 'react';

import './WeekSelector.scss';

class WeekSelection extends Component {
    constructor(props) {
        super(props);
    }
    getFirstDay = () => {
        if (this.props.currentWeek.length) {
            return  this.props.isNextWeek ? this.props.nextWeek[0].replace(/2020-[0-1][0-9]-/g, '') : this.props.currentWeek[0].replace(/2020-[0-1][0-9]-/g, '')
        } else {
            return "00"
        }
    }
    getLastDay = () => {
        if (this.props.currentWeek.length) {
            return  this.props.isNextWeek ? this.props.nextWeek[4].replace(/2020-[0-1][0-9]-/g, '') : this.props.currentWeek[4].replace(/2020-[0-1][0-9]-/g, '')
        } else {
            return "00"
        }
    }
    getMonthFr = () => {
        const dates = this.props.isNextWeek ? this.props.nextWeek : this.props.currentWeek;
        if (dates.length) {
            const month = dates[0].match(/-[0-1][0-9]-/g)[0].replace(/-/g, '')
            
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
            <div className="WeekSelector">
                <button className={`WeekSelector__button ${!this.props.isNextWeek ? 'WeekSelector__button--disabled' : ''}`} onClick={() => this.props.getToCurrentWeek()}>
                    <svg viewBox="0 0 8 12">
                        <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" />
                    </svg>
                </button>
                <p className="WeekSelector__text">{this.getFirstDay()} - {this.getLastDay()} {this.getMonthFr()} 2020</p>
                <button className={`WeekSelector__button ${this.props.isNextWeek ? 'WeekSelector__button--disabled' : ''}`} onClick={() => this.props.getToNextWeek()}>
                    <svg viewBox="0 0 8 12">
                        <path d="M0.589966 10.59L5.16997 6L0.589966 1.41L1.99997 0L7.99997 6L1.99997 12L0.589966 10.59Z" />
                    </svg>
                </button>
            </div>
        );
    }
}
 
export default WeekSelection;