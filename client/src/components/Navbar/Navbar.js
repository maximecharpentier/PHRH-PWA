import React from 'react';
import { StyledNavbar, StyledNavbarTitle, StyledAccount } from './StyledNavbar';
import { BrowserRouter as Route, Switch } from 'react-router-dom';

const Navbar = () => (
    <StyledNavbar>
      <StyledNavbarTitle>
        PHRH
      </StyledNavbarTitle>
      <StyledAccount>
        MH
      </StyledAccount>
    </StyledNavbar>
);

export default Navbar;
