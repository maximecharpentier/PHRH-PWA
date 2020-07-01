import React, { useState, useRef, useEffect } from 'react';
import ItemMenu from '../../../../assets/item-menu';
import './Card.scss'
import {getItem, getItems} from '../../../../utils/api'

const Card = ({ user, editUser, deleteUser, hotel, editHotel, deleteHotel, team, deleteTeam, showMore, emergency, editEmergency, deleteEmergency }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [emergencyHotel, setEmergencyHotel] = useState({});
    const [emergencyTeam, setEmergencyTeam] = useState({});
    // const [emergencyDone, setEmergencyDone] = useState(false);
    const menuRef = useRef();

    const handleClickOutside = e => {
        !menuRef.current.contains(e.target) && setShowMenu(false);
    };

    const getDay = day => {
        switch (day) {
            case 1:
                return 'Lundi'
            case 2:
                return 'Mardi'
            case 3:
                return 'Mercredi'
            case 4:
                return 'Jeudi'
            case 5:
                return 'Vendredi'
            default:
                break;
        }
    };

    useEffect(() => {
        if(emergency) {
            getItem( "/hotels/get/", setEmergencyHotel, emergency.hotel_id)
            getItems( "/gestion/equipes/",setEmergencyTeam, emergency.equipe_id)
        }
        document.body.addEventListener('mousedown', handleClickOutside);
        return () => document.body.removeEventListener('mousedown', handleClickOutside);
    }, [emergency]);


    return (
        hotel ?
            <div className="card">
                <p className="text-overflow">{hotel.nom}</p> <span onClick={() => setShowMenu(!showMenu)}><ItemMenu /></span>
                <div ref={menuRef} className={showMenu ? "card-menu show" : "card-menu"}> <p onClick={editHotel}>Modifier</p> <p onClick={deleteHotel}>Supprimer</p></div>
                <p className="text-overflow inline-block">{hotel.adresse}</p> <p className="inline-block right">{hotel.cp}</p>
                <div className="card-line" />
                <p className="inline-block">{hotel.nb_chambres_utilise} chambres</p>
                <p>{new Date(hotel.last_time_visited).getDate() + "/" + new Date(hotel.last_time_visited).getMonth() + "/" + new Date(hotel.last_time_visited).getFullYear()}</p>
            </div>

            : user ?

            <div className="card">
                <p className="text-overflow">{user.prenom} {user.nom}</p> <span onClick={() => setShowMenu(!showMenu)}><ItemMenu /></span>
                <div ref={menuRef} className={showMenu ? "card-menu show" : "card-menu"}> <p onClick={editUser}>Modifier</p> <p onClick={deleteUser}>Supprimer</p> <p onClick={showMore}>En savoir plus</p></div>
                <p>{user.secteur}</p>
                <div className="card-line" />
                <div className="flex-container"><p className="text-overflow">{user.fonction}</p> <p>{user.jour_bureau && getDay(new Date(user.jour_bureau).getDay())}</p></div>
            </div>

            : team ?

            <div className="card">
                <p className="text-overflow"> {team.user_names.user_a}</p> <span onClick={() => setShowMenu(!showMenu)}><ItemMenu /></span>
                <div ref={menuRef} className={showMenu ? "card-menu show" : "card-menu"}> <p onClick={deleteTeam}>Supprimer</p></div>
                <p className="bold text-overflow inline-block f18">{team.user_names.user_b}</p> <p className="inline-block right">{team.equipe.secteur_binome}</p>
                <div className="card-line" />
                <div className="flex-container"><p className="text-overflow">{team.equipe.plage_h}</p> </div>
            </div>

            : 
            <div className="card">
                <p className="text-overflow">{emergencyHotel.nom}</p> <span onClick={() => setShowMenu(!showMenu)}><ItemMenu /></span>
                <div ref={menuRef} className={showMenu ? "card-menu show" : "card-menu"}> <p onClick={editEmergency}>Modifier</p> <p onClick={deleteEmergency}>Supprimer</p></div>
                <p className="text-overflow inline-block">{emergencyHotel.nb_chambres_utilise} chambres</p> <p className="inline-block right">{emergencyHotel.cp}</p>
                <div className="card-line" />
                <div className="flex-container"><p className="text-overflow">{emergencyTeam.user_names !== undefined ? emergencyTeam.user_names.user_a : ""}</p>  <p>{emergency.resume}</p></div>
                <p className="text-overflow">{emergencyTeam.user_names !== undefined ? emergencyTeam.user_names.user_b : ""}</p>
            </div>
             
    )

}

export default Card;
