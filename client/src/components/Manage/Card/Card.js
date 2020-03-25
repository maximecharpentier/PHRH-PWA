import React, {useState} from 'react';
import ItemMenu from '../../../assets/item-menu';

const Card = ({ user, editUser, deleteUser }) => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="planificator-card">
            <p>{user.prenom} {user.nom}</p> <span onClick={() => setShowMenu(!showMenu)}><ItemMenu /></span>
            <div className={showMenu ? "planificator-card-menu show" : "planificator-card-menu"}> <p onClick={editUser}>Modifier</p> <p onClick={deleteUser}>Supprimer</p> <p>En savoir plus</p></div>
            <p>{user.secteur}</p>
            <div className="planificator-card-line" />
            <p>{user.fonction}</p>
        </div>
    )
}

export default Card;
