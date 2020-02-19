import React from 'react';
import './Button.scss'

const Button = props => {
    return ( 
    <button className="button">{props.title}</button>
    // TODO : Animation du button
    );
}
 
export default Button;