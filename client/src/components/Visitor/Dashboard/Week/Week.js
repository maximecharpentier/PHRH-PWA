import React, { Component } from 'react'
import Day from '../Day/Day'
import './Week.scss';

class Week extends Component {
    constructor(props) {
        super(props);
    }
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
    getDay = (dateString) => {
        const dates = this.props.isNextWeek ? this.props.nextWeek : this.props.currentWeek;
        if (dates.length) {
            console.log('duh')
            return dateString.replace(/2020-[0-1][0-9]-/g, '')
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
    renderDays = () => {
        const days = this.state;
        return days.map((item, id) =>
            <Day
                key={id}
                label={item.label}
                date={this.getDay(this.props.isNextWeek ? this.props.nextWeek[id] : this.props.currentWeek[id])}
                month={this.getMonthFr()}
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