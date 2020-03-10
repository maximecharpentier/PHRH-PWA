import React, { Component } from 'react';
import ManageVisitor from './ManageVisitor/ManageVisitor'
import ManageHotels from './ManageHotels/ManageHotels'
import './Manage.scss';

class Manage extends Component {
    state = {
        showVisitor: true,
        showHotels: false,
        showUrgency: false,
        showTeam: false
    }
    showVisitor = () => {
        this.setState({ showVisitor: true, showHotels: false, showUrgency: false, showTeam: false})
    }
    showHotels = () => {
        this.setState({ showVisitor: false, showHotels: true })
    }
    showUrgency = () => {
        this.setState({ showVisitor: false, showHotels: true })
    }
    showTeam = () => {
        this.setState({ showVisitor: false, showHotels: true })
    }
    render() {
        const { showVisitor, showHotels } = this.state;
        return (
            <section>
                <header>
                    <h2>Gestions des <br/> ressources <span>.</span></h2>
                </header>
                <div>
                    <nav>
                        <ul>
                            <li className={showVisitor ? "active" : ""} onClick={this.showVisitor}>Visiteurs</li>
                            <li className={showHotels ? "active" : ""} onClick={this.showHotels}>Hôtels</li>
                            <li>Urgences</li>
                            <li>Équipes</li>
                        </ul>
                    </nav>
                    {showHotels ? <ManageHotels /> : <ManageVisitor />}
                </div>
            </section>
        );
    }
}

export default Manage;
