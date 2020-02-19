import React from 'react';
import './SubHeader.scss'
import Button from '../Button/Button.js'

const SubHeader = props => {
    return ( 
    <div className="subheader">
      <div className="subheader__inside">
    <p className="subheader__overtitle">{props.overtitle}</p>
        <h2 className="subheader__title">{props.title}<span>.</span></h2>
      </div>
      <Button title={props.button} />
    </div>
    );
}
 
export default SubHeader;