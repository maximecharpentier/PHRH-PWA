import React, { Component } from 'react';
import { EdtContext } from '../../../contexts/edt.context'

import Week from './Week/Week';
import WeekSelection from './WeekSelection/WeekSelection';

import './Dashboard.scss';

class Dashboard extends Component {
    state = {
        currentWeek: [],
        nextWeek: [],
        currentVisits: [],
        isNextWeek: false
    }
    static contextType = EdtContext


    // componentDidMount(){
    //     this.setState({
    //         currentVisits: this.context.journees
    //     })
    // }
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
    getToCurrentWeek = () => {
        this.setState({
            isNextWeek: false
        })
    }
    getToNextWeek = () => {
        this.setState({
            isNextWeek: true
        })
    }
    
    render() { 
        return (
            
            <section className="Dashboard">
                <WeekSelection
                    currentWeek={this.state.currentWeek}
                    nextWeek={this.state.nextWeek}
                    getToCurrentWeek={this.getToCurrentWeek}
                    getToNextWeek={this.getToNextWeek}
                    isNextWeek={this.state.isNextWeek}
                />
                <Week 
                    currentWeek={this.state.currentWeek}
                    nextWeek={this.state.nextWeek}
                    isNextWeek={this.state.isNextWeek}
                />
            </section>

        );
    }
}
 
export default Dashboard;