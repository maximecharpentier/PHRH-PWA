import React from 'react';
import Tag from '../../Tag/Tag.js'
import './ManagerListItem.scss'
import Edit from '../../../../assets/edit.js'
import Delete from '../../../../assets/delete.js'

const ListItem = props => {
    return ( 
    <tr className="listItem">
      <td>{props.manager.nom}</td>
      <td>{props.manager.adresse}, {props.manager.cp}</td>
      <td className="listItem__buttons"><Delete /><Edit /></td>
    </tr>
    );
}
 
export default ListItem;