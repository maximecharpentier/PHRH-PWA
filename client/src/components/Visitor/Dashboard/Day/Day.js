import React, { Component } from 'react';
import { BrowserRouter as Route, Link, } from 'react-router-dom';
import './Day.scss';

class Day extends Component {
    state = {}
    createVisitOfDay(hotel) {
		return (
			<div className="visits-of-the-day-hotel" key={hotel.hotel}>
				<p>{hotel.nom}</p> - <p>{hotel.adresse}</p>
			</div>
		)
	}
    render() {
        return ( 
            <div className="Day">
                <div className="Day__header">
                    <p className="Day__label">{this.props.label}</p>
                    <p className="Day__date">{this.props.date}</p>
                </div>
                <div className="Day__tasks">
                    { this.props.visits === null || this.props.visits[0].visites.length === 0 ? <Link to="/planner"><button className="Day__button"><span>Planifier le</span><span>{this.props.label} {this.props.date} {this.props.month}</span></button></Link> : this.props.visits[0].visites[0].map(visit => this.createVisitOfDay(visit))}
                </div>
            </div>
         );
    }
}
 
export default Day;