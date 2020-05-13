import React, { useState, useRef, useEffect } from 'react';
import ItemMenu from '../../../../assets/item-menu';
import './Card.scss'

const Card = ({ user, editUser, deleteUser, hotel, editHotel, deleteHotel, team, editTeam, deleteTeam, showMore }) => {
    const [showMenu, setShowMenu] = useState(false);
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
        document.body.addEventListener('mousedown', handleClickOutside);
        return () => document.body.removeEventListener('mousedown', handleClickOutside);
    });

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
                <p className="text-overflow">{team.user_a_id}</p> <span onClick={() => setShowMenu(!showMenu)}><ItemMenu /></span>
                <div ref={menuRef} className={showMenu ? "card-menu show" : "card-menu"}> <p onClick={editTeam}>Modifier</p> <p onClick={deleteTeam}>Supprimer</p></div>
                <p>{team.user_b_id}</p>
                <div className="card-line" />
                {/* <div className="flex-container"><p className="text-overflow">{user.fonction}</p> <p>{user.jour_bureau}</p></div> */}
            </div>

            : 
            <div className="card">
                <p className="text-overflow">{user.prenom} {user.nom}</p> <span onClick={() => setShowMenu(!showMenu)}><ItemMenu /></span>
                <div ref={menuRef} className={showMenu ? "card-menu show" : "card-menu"}> <p onClick={editUser}>Modifier</p> <p onClick={deleteUser}>Supprimer</p> <p onClick={showMore}>En savoir plus</p></div>
                <p>{user.secteur}</p>
                <div className="card-line" />
                <div className="flex-container"><p className="text-overflow">{user.fonction}</p> <p>{user.jour_bureau}</p></div>
            </div>
             
    )

}

export default Card;
