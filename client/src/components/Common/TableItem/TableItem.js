import React from 'react';
import Tag from '../Tag/Tag.js'
import './TableItem.scss'

const ListItem = props => {
    return ( 
    <div className="tableItem">
      <div className="tableItem__main">
        <p>{props.hotel.nom}</p>
        <p>{props.hotel.adresse} {props.hotel.cp}</p>
      </div>
      <p>Nombre de visites par mois</p>
      <p>{props.hotel.nb_chambres_utilise}</p>
      <p>{props.hotel.nb_visites_periode}</p>
      <p>{props.hotel.anomalie}</p>
      <p>{props.hotel.urgence ? <Tag name="Urgence" />: null}</p>
      <p>{props.hotel.nature}</p>
    </div>
    );
}
 
export default ListItem;