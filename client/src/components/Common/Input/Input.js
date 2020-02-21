import React from 'react';
import Select from 'react-select'
import './Input.scss'

const Input = props => {
    return (
    <div className="input__container">
        <label className="input__label">{props.label}</label>
        {
            props.type === "select" ? 
            <Select closeMenuOnSelect={props.closeMenuOnSelect} isMulti={props.isMulti} className="input__select" options={props.options} /> :
            <input type={props.type ? props.type : "text"} min={props.min} max={props.max} className="input" placeholder={props.placeholder}/>
        }
    </div>
    );
}
 
export default Input;