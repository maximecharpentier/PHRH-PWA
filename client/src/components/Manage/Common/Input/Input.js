import React from 'react';
import './Input.scss'

const Input = props => {
    return (
        <div className="input-container">
            <label htmlFor={props.name}>{props.name}</label>
            {
                props.type === "select" ?
                    <select name={props.name} value={props.value} onChange={props.handleChange}  >
                        {props.options.map((option, id) => <option key={id} value={option.value}>{option.label}</option>)}
                    </select> :
                    <input type={props.type} id={props.name} placeholder={props.name} name={props.name} value={props.value} onChange={props.handleChange} />
            }
        </div>
    );
}

export default Input;