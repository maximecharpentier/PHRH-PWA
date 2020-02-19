import React, { Component } from 'react';
import { BrowserRouter as Route, Link, } from 'react-router-dom';
import './Planner.scss'
import Tag from '../../Common/Tag/Tag'

class Planner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visitsToPlan: [
				{ key: 1, nom: "Welcomo", adresse: "26 avenue...", cp: "93100", nb_chambres_utilise: 26, nb_visites_periode: "22/05/2019", anomalie: "29,1", urgence: "URGENCE", nature: "Moisissure" },
				{ key: 2, nom: "Ibis", adresse: "23 avenue...", cp: "92OOO", nb_chambres_utilise: 25, nb_visites_periode: "19/08/2019", anomalie: "15", urgence: "URGENCE", nature: "Chauffage" },
				{ key: 3, nom: "Ibis", adresse: "23 avenue...", cp: "92OOO", nb_chambres_utilise: 25, nb_visites_periode: "19/08/2019", anomalie: "15", urgence: "URGENCE", nature: "Chauffage" }
			],
			visitsOfTheDay: [],
			chambersToVisit: 0
		}
		this.createVisitOfDay = this.createVisitOfDay.bind(this);
		this.createVisitOfList = this.createVisitOfList.bind(this);
	}

	createVisitOfList(hotel) {
		return (
			<tr key={hotel.key}>
				<td>{hotel.nom}</td>
				<td>{hotel.adresse}</td>
				<td>{hotel.cp}</td>
				<td>{hotel.nb_chambres_utilise}</td>
				<td>{hotel.nb_visites_periode}</td>
				<td>{hotel.anomalie}</td>
				<td>{hotel.urgence ? <Tag name="Urgence" /> : null}</td>
				<td>{hotel.nature}</td>
				<td><span className="btnAddDelete" onClick={() => this.addToVisitOfTheDay(hotel.key)} >+</span></td>
			</tr>
		)
	}

	createVisitOfDay(hotel) {
		return (
			<div className="visits-of-the-day-hotel" key={hotel.key} >
				<p>{hotel.nom}</p> <span className="btnAddDelete" onClick={() => this.deleteVisitOfTheDay(hotel.key)}>-</span>
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
			chambersToVisit: this.state.chambersToVisit + visitsToPlanClicked.nb_chambres_utilise
		})
	}

	deleteVisitOfTheDay(key) {
		var visitsOfTheDayClicked = this.state.visitsOfTheDay.filter(visit => visit.key === key);
		visitsOfTheDayClicked = visitsOfTheDayClicked[0]
		var visitsOfTheDayfiltered = this.state.visitsOfTheDay.filter(visit => visit.key !== key)
		this.setState({
			visitsOfTheDay: visitsOfTheDayfiltered,
			visitsToPlan: this.state.visitsToPlan.concat(visitsOfTheDayClicked),
			chambersToVisit: this.state.chambersToVisit - visitsOfTheDayClicked.nb_chambres_utilise
		})
	}

	clearAllVisitsOfTheDay() {
		var visitsOfTheDay = this.state.visitsOfTheDay;
		this.setState({
			visitsOfTheDay: [],
			visitsToPlan: this.state.visitsToPlan.concat(visitsOfTheDay),
			chambersToVisit: 0
		})
	}

	render() {
		this.visitsToPlan = this.state.visitsToPlan.map(this.createVisitOfList);
		this.visitsOfTheDay = this.state.visitsOfTheDay.map(this.createVisitOfDay);
		const { chambersToVisit } = this.state;
		return (
			<section className="planner">
				<div className="planner-container">
					<div className="visits-of-the-day-container">
						<h1>Mardi 18 fevrier</h1>
						{/* {!this.state.visitsOfTheDay.length && <p>Vous n'avez pas de visite programmer</p>} */}
						<div className="visits-of-the-day-content">
							<div className="visits-of-the-day">
								{this.visitsOfTheDay}
							</div>
							<p>Vous avez <span className={chambersToVisit > 50 && chambersToVisit < 60 ? "orange" : chambersToVisit >= 60 ? "red" : ""}> {chambersToVisit}</span> chambres à visiter</p>
							{chambersToVisit > 60 && <p className="red">Vous avez atteint le nombre maximum de chambres à visiter</p>}
							<div className="btn-container">
								<Link to="/dashboard"><button onClick={() => this.clearAllVisitsOfTheDay()}>Annuler</button></Link>
								<Link to="/dashboard"><button>Valider</button></Link>
							</div>
						</div>
					</div>
					<div className="visits-to-plan-container">
						<table>
							<tbody>
								<tr className="labels">
									<td>Hôtel</td>
									<td>Adresse</td>
									<td>Secteur</td>
									<td>Chambres</td>
									<td>Nombre de visites par mois</td>
									<td>Taux d'anomalie</td>
									<td>Urgence</td>
									<td>Nature de l'urgence</td>
								</tr>
								{this.visitsToPlan}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		);
	}
}

export default Planner;