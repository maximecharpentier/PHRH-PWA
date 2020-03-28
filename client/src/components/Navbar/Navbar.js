import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'

import Logo from '../../assets/logo'
import Profil from '../../assets/profil'
import Notification from '../../assets/notification'


const Navbar = () => {
  const [activeTab, setActiveTab] = useState("plannification");
  return (
    <section className="nav-container">
      <div>
        <Link to="/"><Logo /></Link>
        <nav className="nav">
          <ul className="nav-items">
            <li><Link className={activeTab === "plannification" ? "active" : ""} onClick={() => setActiveTab("plannification")} to="/">Plannification</Link></li>
            <li><Link className={activeTab === "manage" ? "active" : ""} onClick={() => setActiveTab("manage")} to="/manage">Gestion des ressources</Link></li>
            <li><Link to="/"><Notification /></Link></li>
            <li><Link to="/"><Profil /></Link></li>
          </ul>
        </nav>
      </div>
    </section>
  )
};

export default Navbar;
