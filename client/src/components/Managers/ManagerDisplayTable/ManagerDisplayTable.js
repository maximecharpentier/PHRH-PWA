import React from 'react';
import './ManagerDisplayTable.scss'
import ManagerTableItem from '../../Common/TableItem/ManagerTableItem/ManagerTableItem.js'

const DisplayTable = props => {
    return ( 
      <div className="displayTable">
        { props.data.map(hotelData => {
        return <ManagerTableItem
          hotel={hotelData}
        />
      })}
      </div>
    );
}
 
export default DisplayTable;