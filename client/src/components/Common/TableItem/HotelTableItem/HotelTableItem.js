import React from 'react';
import Tag from '../../Tag/Tag.js'
import './HotelTableItem.scss'

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
          <p>{props.hotel.nb_visites_periode ? props.hotel.nb_visites_periode : 0}</p>
        </div>
      </div>
      <div className="tableItem__information">
        <Graphic />
        <div className="tableItem__information_inside">
          <p className="tableItem__information_inside_title">Note</p>
          <p>{props.hotel.anomalie}</p>
        </div>
      </div>
      {props.hotel.urgences ? <Tag name={'Urgence → ' + props.hotel.urgences[0].resume} /> : null}
    </div>
    );
}
 
export default TableItem;