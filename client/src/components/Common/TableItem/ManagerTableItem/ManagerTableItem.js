import React from 'react';
import Tag from '../../Tag/Tag.js'
import './ManagerTableItem.scss'

// SVG
import Calendar from '../../../../assets/calendar.js'
import Graphic from '../../../../assets/graphic.js'
import Edit from '../../../../assets/edit.js'
import Delete from '../../../../assets/delete.js'

const TableItem = props => {
    return ( 
    <div className="tableItem">
      <div className="tableItem__main">
        <div className="tableItem__main_inside">
          <p className="tableItem__main_inside_title">{props.hotel.nom}</p>
          <p>{props.hotel.adresse} {props.hotel.cp}</p>
        </div>
        <div className="tableItem__main_buttons">
          <Delete />
          <Edit />
        </div>
      </div>
      <div className="tableItem__information">
        <Calendar />
        <div className="tableItem__information_inside">
          <p className="tableItem__information_inside_title">Nombre de visites par mois</p>
          <p>{props.hotel.nb_visites_periode}</p>
        </div>
      </div>
      <div className="tableItem__information">
        <Graphic />
        <div className="tableItem__information_inside">
          <p className="tableItem__information_inside_title">Note</p>
          <p>{props.hotel.anomalie}</p>
        </div>
      </div>
      {props.hotel.urgence ? <Tag name={'Urgence → ' + props.hotel.nature} />: null}
    </div>
    );
}
 
export default TableItem;