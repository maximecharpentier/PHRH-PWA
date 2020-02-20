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
    justify-content: flex-end;
    align-items: center;
`

export const RedCircle = styled.div`
    position: absolute;
    bottom: 0;
    left: -75px;
    width: 200px;
    height: 200px;
    background: #ED254E;
    border-radius: 100%;
`

export const StyledAccount = styled.div`
    color: white;
    width: 50px;
    height: 50px;
    font-size: 18px;
    border-radius: 100%;
    background-color: #22204d;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const MenuItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 100px;
`

export const MenuItem = styled.p`
    margin-right: 50px;
`