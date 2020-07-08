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
    <nav className="Nav">
      <div className="Nav__brand">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="Nav__container">
        <ul className="Nav__items">
          <li className="Nav__item">
            <NavLink activeClassName="active" exact to="/">Plannification</NavLink>
          </li>
          <li className="Nav__item">
            <NavLink activeClassName="active" to="/manage">Gestion des ressourcesssss</NavLink>
          </li>
        </ul>
        <button className="Nav__button">
          <Notification />
        </button>
        <button className="Nav__button" onClick={() => setProfile(!profile)}>
          <Profil />
        </button>
        {profile && <ProfilModal setProfile={setProfile} />}
      </div>
    </nav>
  )
};

export default Navbar;
