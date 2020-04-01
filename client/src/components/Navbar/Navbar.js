import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.scss'

import Logo from '../../assets/logo'
import Profil from '../../assets/profil'
import Notification from '../../assets/notification'


const Navbar = () => {
  return (
    <section className="nav-container">
      <div>
        <Link to="/"><Logo /></Link>
        <nav className="nav">
          <ul className="nav-items">
            <li><NavLink activeClassName="active" exact to="/">Plannification</NavLink></li>
            <li><NavLink activeClassName="active" to="/manage">Gestion des ressources</NavLink></li>
            <li><Link to="/"><Notification /></Link></li>
            <li><Link to="/"><Profil /></Link></li>
          </ul>
        </nav>
      </div>
    </section>
  )
};

export default Navbar;
