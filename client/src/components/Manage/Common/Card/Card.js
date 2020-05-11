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
                <p className="text-overflow inline-block">{hotel.adresse}</p> <p className="inline-block right">{hotel.cp}</p>
                <div className="card-line" />
                <p className="inline-block">{hotel.nb_chambres_utilise}</p> <p className="inline-block">{hotel.adresse}</p>
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
