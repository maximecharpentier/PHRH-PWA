import React, { useState, useRef, useEffect } from 'react';
import ItemMenu from '../../../../assets/item-menu';
import './Card.scss'

const Card = ({ user, editUser, deleteUser, showMore, hotel, editHotel, deleteHotel }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();

    const handleClickOutside = e => {
        !menuRef.current.contains(e.target) && setShowMenu(false);
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
                <div className="flex-container"><p>{hotel.adresse}</p> <p>{hotel.cp}</p></div>
                <div className="card-line" />
                <p>{hotel.nb_chambres_utilise}</p>
            </div>
            :
            <div className="card">
                <p className="text-overflow">{user.prenom} {user.nom}</p> <span onClick={() => setShowMenu(!showMenu)}><ItemMenu /></span>
                <div ref={menuRef} className={showMenu ? "card-menu show" : "card-menu"}> <p onClick={editUser}>Modifier</p> <p onClick={deleteUser}>Supprimer</p> <p onClick={showMore}>En savoir plus</p></div>
                <p>{user.secteur}</p>
                <div className="card-line" />
                <p>{user.fonction}</p>
            </div>
    )

}

export default Card;
