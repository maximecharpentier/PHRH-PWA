import React from 'react';
import Truncate from 'react-truncate';
import ReactTooltip from 'react-tooltip'
import Tag from '../../Tag/Tag.js'
import './VisitorListItem.scss'
import Edit from '../../../../assets/edit.js'
import Delete from '../../../../assets/delete.js'

const ListItem = props => {
    return ( 
    <tr className="listItem">
      <td>
        <Truncate data-tip={props.visitor.nom + ' ' + props.visitor.prenom} width={100} ellipsis={<span>...</span>}>
          {props.visitor.nom} {props.visitor.prenom}
        </Truncate>
      </td>
      <td>{props.visitor.adresse} {props.visitor.cp}</td>
      <td>{props.visitor.secteur}</td>
      <td>{props.visitor.equipier_id ? props.visitor.equipier_id : "Aucun(e)"}</td>
      <td>{props.visitor.plage_h ? props.visitor.plage_h : "Aucune"}</td>
      <td>{props.visitor.journee}</td>
      <td>{props.visitor.indisponibilite}</td>
      <td className="listItem__buttons"><Delete /><Edit /></td>
      <ReactTooltip effect="solid" />
    </tr>
    );
}
 
export default ListItem;