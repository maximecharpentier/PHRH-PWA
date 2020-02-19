import React from 'react';
import './DisplayTable.scss'
import TableItem from '../../Common/TableItem/TableItem.js'

function DisplayList(props){
    return ( 
      <div>
        { props.data.map(hotelData => {
        return <TableItem 
          hotel={hotelData}
        />
      })}
      </div>
    );
}
 
export default DisplayList;