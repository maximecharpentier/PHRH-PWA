import React from 'react';
import './Button.scss'

function Button(props){
    return ( 
    <button className="button">{props.title}</button>
    // TODO : Animation du button
    );
}
 
export default Button;