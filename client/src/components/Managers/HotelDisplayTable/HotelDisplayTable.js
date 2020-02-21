import React from 'react';
import './HotelDisplayTable.scss'
import HotelTableItem from '../../Common/TableItem/HotelTableItem/HotelTableItem.js'

const DisplayTable = props => {
    return ( 
      <div className="displayTable">
        { props.data.map(hotelData => {
        return <HotelTableItem
          hotel={hotelData}
        />
      })}
      </div>
    );
}
 
export default DisplayTable;