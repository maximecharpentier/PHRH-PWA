import React from 'react';
import './Burger.scss'

function Burger(){
    return ( 
    <div className="burger" onClick={props.handleClick}>
      <div className="burger__item" />
      <div className="burger__item" />
      <div className="burger__item" />
    </div> 
    // TODO : Animation du burger
    );
}
 
export default Burger;