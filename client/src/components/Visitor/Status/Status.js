import React, { Component } from 'react';
import { BrowserRouter as Route, Link, } from 'react-router-dom';
import Card from '../../Common/Card/Card'
import './Status.scss';

class Status extends Component {
    state = {
        binomial: { name: "Votre binome", descriptionLeft: "01/02/2020->05/02/2020", descriptionRight: "Clementine Baillard" },
        timeSlots: { name: "Plage Horaire", descriptionLeft: "9h-16h30", descriptionRight: "Matin" },
        car: { name: "Véhicule", descriptionLeft: "AA123A", descriptionRight: "peugeot 205" },
        unavailability: { name: "Vos indisponibilités", descriptionLeft: "01/01/2020->05/01/2020", descriptionRight: "Arret maladie" },
    }
    render() {
        return (
            <section className="status">
                <div className="status__intro">
                    <p>Vos infos de la semaine</p>
                    <Link to="/planner">CREER UN PLANNING</Link>
                </div>
                <div className="status__card-container">
                    <Card descriptionLeft={this.state.binomial.descriptionLeft} descriptionRight={this.state.binomial.descriptionRight} name={this.state.binomial.name} />
                    <Card descriptionLeft={this.state.timeSlots.descriptionLeft} descriptionRight={this.state.timeSlots.descriptionRight} name={this.state.timeSlots.name} />
                    <Card descriptionLeft={this.state.car.descriptionLeft} descriptionRight={this.state.car.descriptionRight} name={this.state.car.name} />
                    <Card descriptionLeft={this.state.unavailability.descriptionLeft} descriptionRight={this.state.unavailability.descriptionRight} name={this.state.unavailability.name} />
                </div>
            </section>
        );
    }
}

export default Status;
