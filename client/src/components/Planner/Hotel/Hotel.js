import React, { useContext } from "react"
import "./Hotel.scss"

import { useDrag } from "react-dnd"
import { ItemsType } from "../../../utils/items";

import { CurrentTeamContext } from "../../../contexts/CurrentTeamContext"

import { API } from '../../../utils/api';

const Hotel = ({ hotel, list }) => {

    const [currentTeam] = useContext(CurrentTeamContext)
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemsType.CARD,
            hotel: hotel,
            currentTeam: currentTeam
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    const deleteVisit = () => {
        console.log(hotel._id)
        API.delete('/gestion/visites/delete/' + hotel._id).then((response) => {
            console.log(response.data)
        })
    }
    if (list) {
        return (
            <div ref={drag} style={{ opacity: isDragging ? 0 : 1, }} key={hotel._id} className="Hotel">
                <div className="Hotel__container">
                    <p className="Hotel__name">{hotel.hotel_id.nom}</p>
                    <p className="Hotel__score">{hotel.score && hotel.score.toFixed(2)}</p>
                </div>
                <div className="Hotel__container">
                    <p className="Hotel__adress">{hotel.hotel_id.adresse}</p>
                    <p className="Hotel__date">{new Date(hotel.hotel_id.last_time_visited).getDate() + "/" + new Date(hotel.hotel_id.last_time_visited).getMonth() + "/" + new Date(hotel.hotel_id.last_time_visited).getFullYear()}</p>
                    <p className="Hotel__room">{hotel.hotel_id.nb_chambres_utilise} ch.</p>
                </div>
            </div>
        )
    } else {
        return (
            <div key={hotel._id} className="Hotel">
                <div className="Hotel__container">
                    <p className="Hotel__name">{hotel.hotel_id.nom}</p>
                    <p className="Hotel__score">{hotel.note}</p>
                    <button className="Hotel__button" onClick={deleteVisit}>
                        <svg viewBox="0 0 14 14">
                            <path d="M4.17779 6.33325V7.66659H10.6222V6.33325H4.17779ZM7.40001 0.333252C3.84268 0.333252 0.955566 3.31992 0.955566 6.99992C0.955566 10.6799 3.84268 13.6666 7.40001 13.6666C10.9573 13.6666 13.8444 10.6799 13.8444 6.99992C13.8444 3.31992 10.9573 0.333252 7.40001 0.333252ZM7.40001 12.3333C4.55801 12.3333 2.24445 9.93992 2.24445 6.99992C2.24445 4.05992 4.55801 1.66659 7.40001 1.66659C10.242 1.66659 12.5556 4.05992 12.5556 6.99992C12.5556 9.93992 10.242 12.3333 7.40001 12.3333Z" />
                        </svg>
                    </button>
                </div>
                <div className="Hotel__container">
                    <p className="Hotel__adress">{hotel.hotel_id.adresse}</p>
                    <p className="Hotel__room">{hotel.hotel_id.nb_chambres_utilise} ch.</p>
                </div>
            </div>
        )
    }

}

export default Hotel;