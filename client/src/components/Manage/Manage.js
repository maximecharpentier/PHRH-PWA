import React, { Component } from 'react';
import ManagePlanificator from './ManagePlanificator/ManagePlanificator'
import ManageVisitor from './ManageVisitor/ManageVisitor'
import ManageHotels from './ManageHotels/ManageHotels'
import './Manage.scss';

class Manage extends Component {
    state = {
        showPlanificator: true,
        showVisitor: false,
        showHotels: false
    }
    showPlanificator = () => {
        this.setState({ showPlanificator: true, showVisitor: false, showHotels: false })
    }
    showVisitor = () => {
        this.setState({ showPlanificator: false, showVisitor: true, showHotels: false })
    }
    showHotels = () => {
        this.setState({ showPlanificator: false, showVisitor: false, showHotels: true })
    }
    render() {
        const { showPlanificator, showVisitor, showHotels } = this.state;
        return (
            <section>
                <header>
                    <h2>Gestions des <br/> ressources <span>.</span></h2>
                </header>
                <div>
                    <nav>
                        <ul>
                            <li className={showPlanificator ? "active" : ""} onClick={this.showPlanificator}>Plannificateurs</li>
                            <li className={showVisitor ? "active" : ""} onClick={this.showVisitor}>Visiteurs</li>
                            <li className={showHotels ? "active" : ""} onClick={this.showHotels}>Hôtels</li>
                            <li>Urgences</li>
                            <li>Équipes</li>
                        </ul>
                    </nav>
                    {showVisitor ? <ManageVisitor /> : showHotels ? <ManageHotels /> : <ManagePlanificator />}
                </div>
            </section>
        );
    }
}

export default Manage;
