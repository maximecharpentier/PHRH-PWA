import React from 'react';
import { StyledNavbar, StyledAccount, MenuContainer, MenuItems, MenuItem } from './StyledNavbar';
import { Link } from 'react-router-dom';
import './Navbar.scss'

import Logo from '../../assets/logo'

const Navbar = () => (
  <StyledNavbar>
    <Link to="/"><Logo /></Link>
    <MenuContainer>
      <MenuItems>
        <MenuItem><Link to="/">Plannification</Link></MenuItem>
        <MenuItem><Link to="/manage">Gestion<br />des ressources</Link></MenuItem>
      </MenuItems>
      <StyledAccount>
        MH
        </StyledAccount>
    </MenuContainer>
  </StyledNavbar>
);

export default Navbar;
