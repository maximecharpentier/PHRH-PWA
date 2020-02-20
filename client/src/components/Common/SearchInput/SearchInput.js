import React from 'react';
import './SearchInput.scss'

const Input = props => {
    return ( 
    <input className="input" placeholder={props.placeholder}/> 
    );
}
 
export default Input;