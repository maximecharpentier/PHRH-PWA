import React from 'react';

const Card = ({ user, editUser }) => {
    return (
        <div className="planificator-card">
            <p>{user.prenom} {user.nom}</p> <span onClick={editUser}>modifier</span> <span>supprimer</span>
            <p>{user.secteur}</p>
        </div>
    )
}

export default Card;
