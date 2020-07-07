import React, { useContext, useState, useEffect } from "react";
import "./Day.scss";

import { useDrop } from "react-dnd"
import { ItemsType } from "../../../utils/items";
import { HotelContext } from "../HotelsList/HotelsList"
import { CurrentTeamContext } from "../../../contexts/CurrentTeamContext";

import { API } from '../../../utils/api'


import Hotel from '../Hotel/Hotel'


const Day = (props) => {

    const [visits, setVisits] = useState([])
    const { sendVisit } = useContext(HotelContext)
    const [currentTeam] = useContext(CurrentTeamContext)


    const [{isOver}, drop] = useDrop({
        accept: ItemsType.CARD,
        drop: (item, monitor) => sendVisit(item, props.fullDate),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    useEffect(() => { 
        if(currentTeam){
            API.get('/gestion/visites/get/foruser/' + currentTeam.equipe.user_b_id).then((response) => {
                setVisits(response.data === "Aucune visite pour cet user" ? [] : response.data )
              })
        }
      }, [currentTeam, visits]);


    return (
        <div className="Day">
            <div className="Day__header">
                <p className="Day__label">{props.label}</p>
                <p className="Day__date">{props.date}</p>
            </div>
            <div style={{backgroundColor: isOver ? "#4357ea33" : "#FFFFFF"}} ref={drop} className="Day__list">
                {visits !== "Aucune visite pour cet user" && visits.filter(visit => visit !== null && visit.date_visite.slice(0, 10) === props.fullDate).map(visit => <Hotel key={visit._id} hotel={visit}/>)}
            </div>
        </div>
    );
}
export default Day;