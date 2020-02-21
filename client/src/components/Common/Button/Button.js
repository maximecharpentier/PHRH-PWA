import React from 'react';
import './Button.scss'
import { Link } from 'react-router-dom'

const Button = props => {
    return (
    <div>
        { props.href ? <Link to={props.href}><button className="button">{props.title}</button></Link> : <button className="button">{props.title}</button> }
    </div>
    );
}
 
export default Button;