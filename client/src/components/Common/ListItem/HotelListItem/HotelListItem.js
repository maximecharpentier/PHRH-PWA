import React from 'react';
import Truncate from 'react-truncate';
import ReactTooltip from 'react-tooltip'
import Tag from '../../Tag/Tag.js'
import './HotelListItem.scss'
import Edit from '../../../../assets/edit.js'
import Delete from '../../../../assets/delete.js'

const ListItem = props => {
    return ( 
    <tr className="listItem">
      <td>
        <Truncate data-tip={props.hotel.nom} width={100} ellipsis={<span>...</span>}>
          {props.hotel.nom}
        </Truncate>
      </td>
      <td>
        <Truncate data-tip={props.hotel.adresse} width={100} ellipsis={<span>...</span>}>
          {props.hotel.adresse}
        </Truncate>
      </td>
      <td>{props.hotel.cp}</td>
      <td>{props.hotel.nb_chambres_utilise}</td>
      <td>{props.hotel.nb_visites_periode ? props.hotel.nb_visites_periode : 0}</td>
      <td>{props.hotel.anomalie}</td>
      <td>{props.hotel.urgences ? <Tag name="Urgence" />: null}</td>
      <td>{props.hotel.urgences ? props.hotel.urgences[0].resume : "//"}</td>
      <td className="listItem__buttons"><Delete /><Edit /></td>
      <ReactTooltip effect="solid" />
    </tr>
    );
}
 
export default ListItem;