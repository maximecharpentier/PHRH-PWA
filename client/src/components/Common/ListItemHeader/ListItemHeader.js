import React from 'react';
import Burger from '../Burger/Burger.js'
import Input from '../Input/Input.js'
import './ListItemHeader.scss'

function ListItemHeader(props) {
    return ( 
    <div className="listItemHeader">
      <Burger 
        handleClick={() => alert()}
      />
      <div className="listItemHeader__search">
        <Input placeholder="Hôtels / Adresses" />
        <p className="listItemHeader__search_item">Secteur ▼</p>
        <p className="listItemHeader__search_item">Date de dernière visite ▼</p>
        <p className="listItemHeader__search_item">Taux d'anomalies ▼</p>
      </div>
    </div> 
    );
}
 
export default ListItemHeader;