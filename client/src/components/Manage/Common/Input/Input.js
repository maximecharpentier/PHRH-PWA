import React from 'react';
import './Input.scss'

const Input = props => {

    return (
        <div className={props.type === "textarea" ? "input-container textarea" : "input-container"}>
            <label htmlFor={props.name}>{props.label}</label>
            {
                props.type === "select" ?
                    <select disabled={props.firstInputValue && props.firstInputValue ===  null ? true : null} name={props.name} value={props.value} onChange={props.handleChange}  >
                        <option value="" disabled>Selectionner {props.title}</option>
                        {props.options.map((option, id) =>
                            props.users ? 
                          <option disabled={props.firstInputValue ===  option._id ? true : null} key={id} value={option._id}>{`${option.nom} / ${option.secteur}`}</option> :
                           props.secteur || props.timeSlots || props.fonction ?
                          <option key={id} value={option}>{option}</option> :
                          props.teamUrgency ? 
                            <option key={id} value={option._id}>{option.user_a_id}/ {option.user_b_id}</option>
                          :
                          <option key={id} value={option.jourNombre}>{option.jour}</option>
                        )}
                    </select> : props.type === "textarea" ?
                    <textarea rows="7" cols="43" type={props.type} id={props.name} placeholder={props.label} name={props.name} value={props.value} onChange={props.handleChange}></textarea> :
                    <input type={props.type} id={props.name} placeholder={props.label} name={props.name} value={props.value} onChange={props.handleChange} />
            }
            {props.children}
        </div>
    );
}

export default Input;