import React, { Component } from 'react';
import ManageVisitors from './ManageVisitors/ManageVisitors';
import ManageHotels from './ManageHotels/ManageHotels';
import ManageEmergencies from './ManageEmergencies/ManageEmergencies';
import ManageTeams from './ManageTeams/ManageTeams';
import './Manage.scss';

class Manage extends Component {
    state = {
        showVisitors: true,
        showHotels: false,
        showEmergencies: false,
        showTeams: false
    }

    showVisitors = () => {
        this.setState({ showVisitors: true, showHotels: false, showEmergencies: false, showTeams: false })
    }
    showHotels = () => {
        this.setState({ showVisitors: false, showHotels: true, showEmergencies: false, showTeams: false })
    }
    showEmergencies = () => {
        this.setState({ showVisitors: false, showHotels: false, showEmergencies: true, showTeams: false })
    }
    showTeams = () => {
        this.setState({ showVisitors: false, showHotels: false, showEmergencies: false, showTeams: true })
    }

    render() {
        const { showVisitors, showHotels, showEmergencies, showTeams } = this.state;
        return (
            <section className="manage">
                <header className="manage-header">
                    <h2>Gestions des <br /> ressources <span>.</span></h2>
                </header>
                <div className="manage-container">
                    <nav className="manage-nav">
                        <ul>
                            <li className={showVisitors ? "active" : ""} onClick={this.showVisitors}>Visiteurs</li>
                            <li className={showHotels ? "active" : ""} onClick={this.showHotels}>Hôtels</li>
                            <li className={showEmergencies ? "active" : ""} onClick={this.showEmergencies}>Urgences</li>
                            <li className={showTeams ? "active" : ""} onClick={this.showTeams}>Équipes</li>
                        </ul>
                    </nav>
                    {showHotels ? <ManageHotels /> : showEmergencies ? <ManageEmergencies /> : showTeams ? <ManageTeams /> : <ManageVisitors />}
                </div>
            </section>
        );
    }
}

export default Manage;
