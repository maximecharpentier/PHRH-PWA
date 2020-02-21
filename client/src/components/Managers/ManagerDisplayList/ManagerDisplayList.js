import React from 'react';
import './ManagerDisplayList.scss'
import ManagerListItem from '../../Common/ListItem/ManagerListItem/ManagerListItem.js'

const DisplayList = props => {
    return ( 
    <table>
      <tr>
        <th>Nom / Prénom</th>
        <th>Adresse</th>
      </tr>
      { props.data.map(managerData => {
        return <ManagerListItem 
          manager={managerData}
        />
      })}
    </table>
    );
}
 
export default DisplayList;