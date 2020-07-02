import React, { useContext } from "react";
import "./Day.scss";

import { useDrop } from "react-dnd"
import { ItemsType } from "../../../utils/items";
import { HotelContext } from "../HotelsList/HotelsList"

import Hotel from '../Hotel/Hotel'


const Day = (props) => {

    const oneHotel = {"memos":[],"_id":"5efc5eeb894a3e0012b06e6c","uid_internal":10745398,"nom":"F1 Beauvais - H2225","adresse":"23 Avenue Montaigne","cp":60000,"ville":"BEAUVAIS","nb_chambres_utilise":0,"nb_visites_periode":0,"last_time_visited":null,"__v":0}
    
    const { sendVisit } = useContext(HotelContext)

    const [{isOver}, drop] = useDrop({
        accept: ItemsType.CARD,
        drop: (item, monitor) => sendVisit(item, props.fullDate),
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
                {/* <Hotel hotel={oneHotel}/> */}
            </div>
        </div>
    );
}
export default Day;