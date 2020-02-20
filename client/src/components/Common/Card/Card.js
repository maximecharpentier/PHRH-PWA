import React from 'react';
import './Card.scss'

const Card = props => {
	return ( 
	<div className="card">
		<h1 className="card__name">{props.name}</h1>
		<section className="card__block">
			<p className="card__block_inside"><span className="red-point"></span>{props.descriptionTop}</p>
			<p className="card__block_inside">{props.descriptionBottom}</p>
		</section>
	</div> 
	);
}
 
export default Card;