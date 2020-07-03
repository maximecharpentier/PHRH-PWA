import React, {useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.scss'

import Logo from '../../assets/logo'
import Profil from '../../assets/profil'
import Notification from '../../assets/notification'

import ProfilModal from "../Profile/ProfileModal"


const Navbar = () => {
  const [profile, setProfile] = useState(false)
  return (
    <section className="nav-container">
      <div>
        <Link to="/"><Logo /></Link>
        <nav className="nav">
          <ul className="nav-items">
            <li><NavLink activeClassName="active" exact to="/">Plannification</NavLink></li>
            <li><NavLink activeClassName="active" to="/manage">Gestion des ressources</NavLink></li>
            <li><Link to="/"><Notification /></Link></li>
            <li onClick={() => setProfile(!profile)}><Profil /></li>
          </ul>
        </nav>
      </div>
      {profile && <ProfilModal setProfile={setProfile} />}
    </section>
    
  )
};

export default Navbar;
