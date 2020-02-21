import React from 'react';
import './HotelDisplayList.scss'
import HotelListItem from '../../Common/ListItem/HotelListItem/HotelListItem.js'

const DisplayList = props => {
    return ( 
    <table>
      <tr>
        <th>Hôtel</th>
        <th>Adresse</th>
        <th>Code postal</th>
        <th>Chambres</th>
        <th>Nbre. de visites / mois</th>
        <th>Note</th>
        <th>Urgence</th>
        <th>Nature de l'urgence</th>
      </tr>
      { props.data.map(hotelData => {
        return <HotelListItem 
          hotel={hotelData}
        />
      })}
    </table>
    );
}
 
export default DisplayList;