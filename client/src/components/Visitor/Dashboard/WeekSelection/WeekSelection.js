import React, { Component } from 'react';

import './WeekSelection.scss';

class WeekSelection extends Component {
    state = {}
    render() { 
        return (
            <div className="WeekSelection">
                <p className="WeekSelection__text">15 - 21 Fév 2020</p>
                <div className="WeekSelection__buttons">
                    <button className="WeekSelection__button WeekSelection__button--active">Semaine en cours</button>
                    <button className="WeekSelection__button">Semaine suivante</button>
                </div>
            </div>
        );
    }
}
 
export default WeekSelection;