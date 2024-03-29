import React, { Component } from "react";

import TeamSelector from "./TeamSelector/TeamSelector";
import TimeRange from "./TimeRange/TimeRange";
import WeekSelector from "./WeekSelector/WeekSelector";
import Week from "./Week/Week";
import HotelList from "./HotelsList/HotelsList"

import { CurrentTeamContextProvider } from "../../contexts/CurrentTeamContext";

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import "./Planner.scss";

class Planner extends Component {
    state = {
        currentWeek: [],
        nextWeek: [],
        currentVisits: [],
        isNextWeek: false
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
        })
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
        })
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
            <DndProvider backend={HTML5Backend}>
                <CurrentTeamContextProvider>
                    <section className="Planner">

                        <div className="Planner__header">
                            <h2 className="Planner__title">Visites à<br />plannifier</h2>

                            <TeamSelector />
                            <TimeRange />
                            <WeekSelector
                                currentWeek={this.state.currentWeek}
                                nextWeek={this.state.nextWeek}
                                getToCurrentWeek={this.getToCurrentWeek}
                                getToNextWeek={this.getToNextWeek}
                                isNextWeek={this.state.isNextWeek}
                            />
                        </div>

                        <div className="Planner__container">
                            <HotelList />
                            <Week
                                currentWeek={this.state.currentWeek}
                                nextWeek={this.state.nextWeek}
                                isNextWeek={this.state.isNextWeek}
                            />
                        </div>

                    </section>
                </CurrentTeamContextProvider>
            </DndProvider>
        );
    }
}

export default Planner;