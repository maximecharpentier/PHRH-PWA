import React, { useState, useRef, useEffect } from 'react';
import ItemMenu from '../../../../assets/item-menu';
import './Card.scss'
import {getUser} from '../../../../api/api'

const Card = ({ user, editUser, deleteUser, hotel, editHotel, deleteHotel, team, deleteTeam, showMore, emergency, editEmergency, deleteEmergency }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [firstUser, setFirstUser] = useState({});
    const [secondUser, setSecondUser] = useState({});
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
        if(team) {
            getUser(team.user_a_id, setFirstUser)
            getUser(team.user_b_id, setSecondUser)
        }
        document.body.addEventListener('mousedown', handleClickOutside);
        return () => document.body.removeEventListener('mousedown', handleClickOutside);
    }, [secondUser, firstUser, team]);


    return (
        hotel ?
            <div className="card">
                <p className="text-overflow">{hotel.nom}</p> <span onClick={() => setShowMenu(!showMenu)}><ItemMenu /></span>
                <div ref={menuRef} className={showMenu ? "card-menu show" : "card-menu"}> <p onClick={editHotel}>Modifier</p> <p onClick={deleteHotel}>Supprimer</p></div>
                <p className="text-overflow inline-block">{hotel.adresse}</p> <p className="inline-block right">{hotel.cp}</p>
                <div className="card-line" />
                <p className="inline-block">{hotel.nb_chambres_utilise}</p>
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
                <p className="text-overflow">{firstUser.prenom} {firstUser.nom}</p> <span onClick={() => setShowMenu(!showMenu)}><ItemMenu /></span>
                <div ref={menuRef} className={showMenu ? "card-menu show" : "card-menu"}> <p onClick={deleteTeam}>Supprimer</p></div>
                <p>{secondUser.prenom} {secondUser.nom}</p>
                <div className="card-line" />
                <div className="flex-container"><p className="text-overflow">{team.plage_h}</p> <p>{team.secteur_binome}</p></div>
            </div>

            : 
            <div className="card">
                <p className="text-overflow">{emergency.resume}</p> <span onClick={() => setShowMenu(!showMenu)}><ItemMenu /></span>
                <div ref={menuRef} className={showMenu ? "card-menu show" : "card-menu"}> <p onClick={editEmergency}>Modifier</p> <p onClick={deleteEmergency}>Supprimer</p></div>
                <p>{emergency.detail}</p>
                <div className="card-line" />
                // <div className="flex-container"><p className="text-overflow">{emergency.fonction}</p> <p>{emergency.jour_bureau}</p></div>
            </div>
             
    )

}

export default Card;
