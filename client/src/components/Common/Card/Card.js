import React from 'react';
import './Card.scss'

function Card(props){
    return ( 
    <div className="card">
        <div className="card__name">{props.name}</div>
        <section className="card__block">
            <div className="card__block_inside">{props.descriptionLeft}</div>
            <div className="card__block_inside">{props.descriptionRight}</div>
        </section>
    </div> 
    );
}
 
export default Card;