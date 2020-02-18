import styled from 'styled-components';

export const StyledNavbar = styled.div`
    padding: 0 5%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #EDF1F7;
    background-color: #fff;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const StyledNavbarTitle = styled.p`
    font-weight: bold;
    font-size: 28px;
`

export const StyledAccount = styled.div`
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #22204d;
    display: flex;
    align-items: center;
    justify-content: center;
`