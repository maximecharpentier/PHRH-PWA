import React from 'react';
import './DisplayTable.scss'
import TableItem from '../../Common/TableItem/TableItem.js'

function DisplayTable(props){
    return ( 
      <div className="displayTable">
        { props.data.map(hotelData => {
        return <TableItem
          hotel={hotelData}
        />
      })}
      </div>
    );
}
 
export default DisplayTable;