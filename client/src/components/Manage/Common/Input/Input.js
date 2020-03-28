import React from 'react';
import './Input.scss'

const Input = props => {
    return (
        <div className="input-container">
            <label htmlFor={props.name}>{props.name}</label>
            <input type={props.type} id={props.name} placeholder={props.name} name={props.name} value={props.value} onChange={props.handleChange} />
        </div>
    );
}

export default Input;