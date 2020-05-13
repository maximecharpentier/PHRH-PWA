import React from 'react';
import './Input.scss'

const Input = props => {

    return (
        <div className="input-container">
            <label htmlFor={props.name}>{props.label}</label>
            {
                props.type === "select" ?
                    <select disabled={props.firstInputValue ===  "" ? true : null} name={props.name} value={props.value} onChange={props.handleChange}  >
                        <option value="" disabled>Selectionner un visiteur</option>
                        {props.options.map((option, id) =>
                            props.team ? 
                          <option disabled={props.firstInputValue ===  option._id ? true : null} key={id} value={option._id}>{`${option.nom} / ${option.secteur}`}</option>
                          :
                          <option key={id} value={option.jourNombre}>{option.jour}</option>
                        )}
                    </select> :
                    <input type={props.type} id={props.name} placeholder={props.name} name={props.name} value={props.value} onChange={props.handleChange} />
            }
        </div>
    );
}

export default Input;