import React from 'react';
import Burger from '../Burger/Burger.js'
import SearchInput from '../SearchInput/SearchInput'
import './ListItemHeader.scss'

const ListItemHeader = props => {
    return ( 
    <div className="listItemHeader">
      <Burger 
        handleClick={props.toggle}
      />
      <div className="listItemHeader__search">
        <SearchInput placeholder={props.placeholder} />
        <p className="listItemHeader__search_item">Secteur ▼</p>
        <p className="listItemHeader__search_item">Date de dernière visite ▼</p>
        <p className="listItemHeader__search_item">Note ▼</p>
      </div>
    </div> 
    );
}
 
export default ListItemHeader;