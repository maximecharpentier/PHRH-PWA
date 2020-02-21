import React from 'react';
import './SubHeader.scss'
import { Link } from 'react-router-dom'
import Button from '../Button/Button.js'

const SubHeader = props => {
    return ( 
    <div className="subheader">
      <div className="subheader__inside">
    <p className="subheader__overtitle">{props.overtitle}</p>
        <h2 className="subheader__title">{props.title}<span>.</span></h2>
      </div>
      { (props.button ? (props.href ? <Link to={props.href}><Button title={props.button} /></Link> : <Button title={props.button} />) : null) }
    </div>
    );
}
 
export default SubHeader;