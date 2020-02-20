import React from 'react';
import './VisitorDisplayTable.scss'
import VisitorTableItem from '../../Common/TableItem/VisitorTableItem/VisitorTableItem.js'

const DisplayTable = props => {
    return ( 
      <div className="displayTable">
        { props.data.map(visitorData => {
        return <VisitorTableItem
          visitor={visitorData}
        />
      })}
      </div>
    );
}
 
export default DisplayTable;