import React, { Component } from 'react';
import { BrowserRouter as Route, Link, } from 'react-router-dom';
import Card from '../../Common/Card/Card'
import './Status.scss';

class Status extends Component {
    state = {
        name: 'Antoine',
        binomial: { name: 'Votre binome', descriptionBottom: '01/02/2020->05/02/2020', descriptionTop: 'Clementine Baillard' },
        timeSlots: { name: 'Plage Horaire', descriptionBottom: '9h-16h30', descriptionTop: 'Matin' },
        car: { name: 'Véhicule', descriptionBottom: 'AA123A', descriptionTop: 'peugeot 205' },
        unavailability: { name: 'Vos indisponibilités', descriptionBottom: '01/01/2020->05/01/2020', descriptionTop: 'Arret maladie' },
    }
    render() {
        return (
            <section className="status">
                <div className="status__intro">
                    <div className="status__intro_container">
                        <p className="status__intro_description">Vos informations de la semaine</p>
                        <p className="status__intro_title">Bonjour, {this.state.name}</p>
                    </div>
                    <Link className="status__intro_btn" to="/planner">CREER UN PLANNING</Link>
                </div>
                <div className="status__card-container">
                    <div className="status__card-container_flex">
                        <Card descriptionBottom={this.state.binomial.descriptionBottom} descriptionTop={this.state.binomial.descriptionTop} name={this.state.binomial.name} />
                        <Card descriptionBottom={this.state.timeSlots.descriptionBottom} descriptionTop={this.state.timeSlots.descriptionTop} name={this.state.timeSlots.name} />
                    </div>
                    <div className="status__card-container_flex">
                        <Card descriptionBottom={this.state.car.descriptionBottom} descriptionTop={this.state.car.descriptionTop} name={this.state.car.name} />
                        <Card descriptionBottom={this.state.unavailability.descriptionBottom} descriptionTop={this.state.unavailability.descriptionTop} name={this.state.unavailability.name} />
                    </div>
                </div>
            </section>
        );
    }
}

export default Status;
