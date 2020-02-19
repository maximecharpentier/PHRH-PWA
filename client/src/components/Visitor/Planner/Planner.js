import React, { Component } from 'react';
import './Planner.scss'

class Planner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visitsToPlan: [
				{ key: 1, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 2, name: "Ibis", address: "23 avenue...", department: "92OOO", chambers: 25, lastVisit: "19/08/2019", mark: "15", urgency: "URGENCE", natureOfTheUrgency: "Chauffage" },
				{ key: 3, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 4, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 5, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 6, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 7, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 8, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 9, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 10, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 11, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 12, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },
				{ key: 13, name: "Welcomo", address: "26 avenue...", department: "93100", chambers: 26, lastVisit: "22/05/2019", mark: "29,1", urgency: "URGENCE", natureOfTheUrgency: "Moisissure" },

			],
			visitsOfTheDay: [],
			chambersToVisit: 0
		}
		this.createVisitOfDay = this.createVisitOfDay.bind(this);
		this.createVisitOfList = this.createVisitOfList.bind(this);
	}

	createVisitOfList(hotel) {
		return (
			<ul className="visits-to-plan" key={hotel.key} >
				<li>{hotel.name}</li>
				<li>{hotel.address}</li>
				<li>{hotel.department}</li>
				<li>{hotel.chambers}</li>
				<li>{hotel.lastVisit}</li>
				<li>{hotel.mark}</li>
				<li>{hotel.urgency}</li>
				<li>{hotel.natureOfTheUrgency}</li>
				<span className="btnAddDelete" onClick={() => this.addToVisitOfTheDay(hotel.key)} >+</span>
			</ul>
		)
	}

	createVisitOfDay(hotel) {
		return (
			<div className="visits-of-the-day__hotel" key={hotel.key} >
				<p>{hotel.name}</p> <span className="btnAddDelete" onClick={() => this.deleteVisitOfTheDay(hotel.key)}>-</span>
			</div>
		)
	}

	addToVisitOfTheDay(key) {
		var visitsToPlanClicked = this.state.visitsToPlan.filter(visit => visit.key === key);
		visitsToPlanClicked = visitsToPlanClicked[0];
		var visitsToPlanfiltered = this.state.visitsToPlan.filter(visit => visit.key !== key);
		this.setState({
			visitsOfTheDay: this.state.visitsOfTheDay.concat(visitsToPlanClicked),
			visitsToPlan: visitsToPlanfiltered,
			chambersToVisit: this.state.chambersToVisit + visitsToPlanClicked.chambers
		})
	}

	deleteVisitOfTheDay(key) {
		var visitsOfTheDayClicked = this.state.visitsOfTheDay.filter(visit => visit.key === key);
		visitsOfTheDayClicked = visitsOfTheDayClicked[0]
		var visitsOfTheDayfiltered = this.state.visitsOfTheDay.filter(visit => visit.key !== key)
		this.setState({
			visitsOfTheDay: visitsOfTheDayfiltered,
			visitsToPlan: this.state.visitsToPlan.concat(visitsOfTheDayClicked),
			chambersToVisit: this.state.chambersToVisit - visitsOfTheDayClicked.chambers
		})
	}

	render() {
		this.visitsToPlan = this.state.visitsToPlan.map(this.createVisitOfList)
		this.visitsOfTheDay = this.state.visitsOfTheDay.map(this.createVisitOfDay)
		return (
			<section className="planner">
				<div className="planner-container">
					<div className="visits-of-the-day-container">
						<h1>Mardi 18 fevrier</h1>
						<div className="visits-of-the-day-content">
							<div className="visits-of-the-day">
								{this.visitsOfTheDay}
							</div>
							<div>
								<p>Vous avez <span className={this.state.chambersToVisit > 50 ? "red" : ""}> {this.state.chambersToVisit}</span> chambres à visiter</p>
								{this.state.chambersToVisit > 50 && <p className="red">TU VAS PAS AVOIR LE TEMPS DE TOUT VISITER MON GARS</p>}
							</div>
						</div>
					</div>
					<div className="visits-to-plan-container">
						<ul className="visits-labels">
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
				</div>
			</section>
		);
	}
}

export default Planner;