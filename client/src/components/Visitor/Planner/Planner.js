import React, { Component } from 'react';
import './Planner.scss'

class Planner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visitsToPlan: [
				{ key: 1, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: "19", lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 2, name: "Ibis", address: "23 avenue...", department: "92OOO", chambers: "25", lastVisit: "19/08/2019", mark: "15", urgency: "URGENCE", natureOfTheUrgency: "Chauffage" }
			],
			visitsOfTheDay: [],
		}
		this.createVisitOfDay = this.createVisitOfDay.bind(this);
		this.createVisitOfList = this.createVisitOfList.bind(this);
	}




	createVisitOfList(hotel) {
		return (
			<ul className="list-item" key={hotel.key} >
				<li>{hotel.name}</li>
				<li>{hotel.address}</li>
				<li>{hotel.department}</li>
				<li>{hotel.chambers}</li>
				<li>{hotel.lastVisit}</li>
				<li>{hotel.mark}</li>
				<li>{hotel.urgency}</li>
				<li>{hotel.natureOfTheUrgency}</li>
				<span onClick={() => this.addToVisitOfTheDay(hotel.key)} >+</span>
			</ul>
		)
	}

	createVisitOfDay(hotel) {
		return (
			<div className="list-item" key={hotel.key} >
				<p>{hotel.name}</p> <span onClick={() => this.deleteVisitOfTheDay(hotel.key)}>-</span>
			</div>
		)
	}

	addToVisitOfTheDay(key) {
		var visitsToPlanClicked = this.state.visitsToPlan.filter(visit => visit.key === key);
		var visitsToPlanfiltered = this.state.visitsToPlan.filter(visit => visit.key !== key)
		this.setState({
			visitsOfTheDay: this.state.visitsOfTheDay.concat(visitsToPlanClicked[0]),
			visitsToPlan: visitsToPlanfiltered
		})
	}

	deleteVisitOfTheDay(key) {
		var visitsOfTheDayClicked = this.state.visitsOfTheDay.filter(visit => visit.key === key);
		var visitsOfTheDayfiltered = this.state.visitsOfTheDay.filter(visit => visit.key !== key)
		this.setState({
			visitsOfTheDay: visitsOfTheDayfiltered,
			visitsToPlan: this.state.visitsToPlan.concat(visitsOfTheDayClicked[0]),
		})
	}

	render() {
		this.visitsToPlan = this.state.visitsToPlan.map(this.createVisitOfList)
		this.visitsOfTheDay = this.state.visitsOfTheDay.map(this.createVisitOfDay)
		return (
			<section className="planner">
				<div className="day">
					<h1>Mardi 18 fevrier</h1>
					<div className="visits-of-the-day">
						{this.visitsOfTheDay}
					</div>
				</div>
				<div className="visits-to-plan">
					<ul className="list-labels">
						<li>Hôtel</li>
						<li>Adresse</li>
						<li>Secteur</li>
						<li>Chambres</li>
						<li>Date de dernière visite</li>
						<li>Taux d’anomalie</li>
						<li>Urgence</li>
						<li>Nature de l’urgence</li>
					</ul>
					{this.visitsToPlan}
				</div>
			</section>
		);
	}
}

export default Planner;