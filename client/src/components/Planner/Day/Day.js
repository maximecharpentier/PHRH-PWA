import React, { useContext } from "react";
import Hotel from "./../Hotel/Hotel"
import "./Day.scss";

import { useDrop } from "react-dnd"
import { ItemsType } from "../../../utils/items";
import { HotelContext } from "../HotelsList/HotelsList"


const Day = (props) => {
    
    const { sendVisit } = useContext(HotelContext)

    const [{isOver}, drop] = useDrop({
        accept: ItemsType.CARD,
        drop: (item, monitor) => sendVisit(item.hotel._id),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })


    return (
        <div className="Day">
            <div className="Day__header">
                <p className="Day__label">{props.label}</p>
                <p className="Day__date">{props.date}</p>
            </div>
            <div style={{backgroundColor: isOver ? "#4357ea33" : "#FFFFFF"}} ref={drop} className="Day__list">
                {/* <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel /> */}
            </div>
        </div>
    );
}
export default Day;