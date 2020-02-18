import React from 'react';
import './Input.scss'

function Input(props) {
    return ( 
    <input className="input" placeholder={props.placeholder}/> 
    );
}
 
export default Input;