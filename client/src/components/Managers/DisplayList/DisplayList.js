import React from 'react';
import './DisplayList.scss'
import ListItem from '../../Common/ListItem/ListItem.js'

function DisplayList(props){
    return ( 
    <table>
      <tr>
        <th>Hôtel</th>
        <th>Adresse</th>
        <th>Secteur</th>
        <th>Chambres</th>
        <th>Nombre de visites par mois</th>
        <th>Taux d'anomalie</th>
        <th>Urgence</th>
        <th>Nature de l'urgence</th>
      </tr>
      { props.data.map(hotelData => {
        return <ListItem 
          hotel={hotelData}
        />
      })}
    </table>
    );
}
 
export default DisplayList;