import React from 'react';
import Tag from '../Tag/Tag.js'
import './ListItem.scss'

const ListItem = props => {
    return ( 
    <tr className="listItem">
      <td>{props.hotel.nom}</td>
      <td>{props.hotel.adresse}</td>
      <td>{props.hotel.cp}</td>
      <td>{props.hotel.nb_chambres_utilise}</td>
      <td>{props.hotel.nb_visites_periode}</td>
      <td>{props.hotel.anomalie}</td>
      <td>{props.hotel.urgence ? <Tag name="Urgence" />: null}</td>
      <td>{props.hotel.nature}</td>
    </tr>
    );
}
 
export default ListItem;