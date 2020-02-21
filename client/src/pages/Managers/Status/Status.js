import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SubHeader from '../../../components/Common/SubHeader/SubHeader.js'
import './Status.scss';

class Status extends Component {
    state = {
        name: 'Nicolas'
    }
    render() {
        return (
            <section className="container">
                <div className="container__inside">
                    <SubHeader title={"Bonjour, " + this.state.name} overtitle="Votre tableau de bord" />
                    <div className="menu__container">
                        <Link to="/hotels-management" className="menu__item">
                            <p className="menu__item_title">Gestion<br />des<br />hôtels.</p>
                            <p className="menu__item_arrow">→</p>
                        </Link>
                        <Link to="/visitors-management"  className="menu__item">
                            <p className="menu__item_title">Gestion<br />des<br />visiteurs.</p>
                            <p className="menu__item_arrow">→</p>
                        </Link>
                        <Link to="/managers-management"  className="menu__item">
                            <p className="menu__item_title">Gestion<br />des<br />superviseurs.</p>
                            <p className="menu__item_arrow">→</p>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default Status;
