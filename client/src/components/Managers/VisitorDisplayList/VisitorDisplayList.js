import React from 'react';
import './VisitorDisplayList.scss'
import VisitorListItem from '../../Common/ListItem/VisitorListItem/VisitorListItem.js'

const DisplayList = props => {
    return ( 
    <table>
      <tr>
        <th>Nom / Prénom</th>
        <th>Adresse</th>
        <th>Secteur</th>
        <th>Binôme</th>
        <th>Plages horaires</th>
        <th>Journée de bureau</th>
        <th>Indisponibilité</th>
      </tr>
      { props.data.map((visitorData, i) => {
        return <VisitorListItem 
        key={i}
          visitor={visitorData}
        />
      })}
    </table>
    );
}
 
export default DisplayList;