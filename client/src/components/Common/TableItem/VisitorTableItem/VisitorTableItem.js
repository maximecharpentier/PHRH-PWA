import React from 'react';
import './VisitorTableItem.scss'

// SVG
import Graphic from '../../../../assets/graphic.js'
import Position from '../../../../assets/position.js'
import PC from '../../../../assets/pc.js'
import Edit from '../../../../assets/edit.js'
import Delete from '../../../../assets/delete.js'

const TableItem = props => {
    return ( 
    <div className="tableItem">
      <div className="tableItem__main">
        <div className="tableItem__main_inside">
    <p className="tableItem__main_inside_title">{props.visitor.nom} {props.visitor.prenom}</p>
          <p>{props.visitor.adresse} {props.visitor.cp}</p>
        </div>
        <div className="tableItem__main_buttons">
          <Delete />
          <Edit />
        </div>
      </div>
      <div className="tableItem__information">
        <Position />
        <div className="tableItem__information_inside">
          <p>{props.visitor.secteur}</p>
        </div>
        <PC />
        <div className="tableItem__information_inside">
          <p>{props.visitor.equipier_id ? props.visitor.equipier_id : "Aucun(e)"}</p>
        </div>
      </div>
      <div className="tableItem__information">
        <div className="tableItem__information_inside">
          <p className="tableItem__information_inside_title">Plage horaire</p>
          <p>{props.visitor.plage_h ? props.visitor.plage_h : "Aucune"}</p>
        </div>
      </div>
      <div className="tableItem__information">
        <div className="tableItem__information_inside">
          <p className="tableItem__information_inside_title">Journée de bureau</p>
          <p>{props.visitor.work_day ? props.visitor.work_day : "Lundi"}</p>
        </div>
      </div>
      <div className="tableItem__information">
        <div className="tableItem__information_inside">
          <p className="tableItem__information_inside_title">Indisponibilité</p>
          <p>{props.visitor.indisponibility ? props.visitor.indisponibility : "22/05/2020 → 30/05/2020"}</p>
        </div>
      </div>
    </div>
    );
}
 
export default TableItem;