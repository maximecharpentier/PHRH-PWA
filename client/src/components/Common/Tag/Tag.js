import React from 'react';
import './Tag.scss'

function Tag(props){
    return ( 
    <div className="tag">
        <p className="tag__name">{props.name}</p>
    </div> 
    );
}
 
export default Tag;