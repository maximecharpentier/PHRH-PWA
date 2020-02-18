import React from 'react';
import { StyledNavbar, RedCircle, StyledAccount, MenuContainer, MenuItems, MenuItem } from './StyledNavbar';
import { BrowserRouter as Route, Switch } from 'react-router-dom';

const Navbar = () => (
    <StyledNavbar>
      <RedCircle />
      <MenuContainer>
        <MenuItems>
          <MenuItem>Gestion<br />des planificateurs</MenuItem>
          <MenuItem>Gestion<br />des superviseurs</MenuItem>
          <MenuItem>Gestion<br />des visiteurs</MenuItem>
        </MenuItems>
        <StyledAccount>
          MH
        </StyledAccount>
      </MenuContainer>
    </StyledNavbar>
);

export default Navbar;
