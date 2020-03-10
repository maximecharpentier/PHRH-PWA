import React, { Component } from 'react'
import Day from '../Day/Day'
import './Week.scss';
import { EdtContext } from '../../../../contexts/edt.context'


class Week extends Component {
    constructor(props) {
        super(props);
    }
    state = [
        {
            id: 1,
            label: 'Lundi',
            date: '',
            month: ''
        },
        {
            id: 2,
            label: 'Mardi',
            date: '',
            month: ''
        },
        {
            id: 3,
            label: 'Mercredi',
            date: '',
            month: ''
        },
        {
            id: 4,
            label: 'Jeudi',
            date: '',
            month: ''
        },
        {
            id: 5,
            label: 'Vendredi',
            date: '',
            month: ''
        }
    ]
    static contextType = EdtContext

    componentDidUpdate(){
        this.state.map((item, id) =>
            console.log(this.props.currentWeek[id].number)
        );
        // console.log(this.props.currentWeek[])
    }

    getDay = (dateString) => {
        const dates = this.props.isNextWeek.number ? this.props.nextWeek.number : this.props.currentWeek.number;
        if (dates.length) {
            return dateString.replace(/2020-[0-1][0-9]-/g, '')
        } else {
            return "00"
        }
    } 
    getMonthFr = () => {
        const dates = this.props.isNextWeek ? this.props.nextWeek : this.props.currentWeek;
        if (dates.length) {
            const month = dates[0].number.match(/-[0-1][0-9]-/g)[0].replace(/-/g, '')
            
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
        days.map((item, id) =>
            <Day
                id={item.id}
                key={id}
                label={item.label}
                date={this.getDay(this.props.isNextWeek.number ? this.props.nextWeek[id].number : this.props.currentWeek[id].number)}
                month={this.getMonthFr()}
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