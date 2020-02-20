import React from 'react';
import { StyledNavbar, RedCircle, StyledAccount, MenuContainer, MenuItems, MenuItem } from './StyledNavbar';
import { Link } from 'react-router-dom';
import './Navbar.scss'

const Navbar = () => (
    <StyledNavbar>
      <RedCircle />
      <MenuContainer>
        <MenuItems>
          <MenuItem><Link to="/hotels-management">Gestion<br />des hôtels</Link></MenuItem>
          <MenuItem><Link to="/managers-management">Gestion<br />des superviseurs</Link></MenuItem>
          <MenuItem><Link to="/visitors-management">Gestion<br />des visiteurs</Link></MenuItem>
        </MenuItems>
        <StyledAccount>
          MH
        </StyledAccount>
      </MenuContainer>
    </StyledNavbar>
);

export default Navbar;
