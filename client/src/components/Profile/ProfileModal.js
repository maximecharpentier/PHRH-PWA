import React from 'react';
import { useAuth } from '../../contexts/AuthContext'
import './ProfileModal.scss'

const ProfileModal = ({setProfile}) => {

    const {authToken, setAuthToken } = useAuth();

    const logOut = () => {
        setAuthToken();
        setProfile(false)
    }

    const userInfos = JSON.parse(localStorage.getItem('user'))

    return (
        <section className="Profile">
          <div className="Profile__container">
            <div className="Profile__picture">{userInfos.nom.charAt(0)}{userInfos.prenom.charAt(0)}</div>
            <p className="Profile__username">{userInfos.nom} {userInfos.prenom}</p>
          </div>
          <p className="Profile__label">Adresse :</p>
          <p className="Profile__info">{userInfos.adresse}</p>
          <p className="Profile__label">Rôle :</p>
          <p className="Profile__info">{userInfos.fonction}</p>
          <button className="Profile__button" onClick={logOut}>Deconnexion</button>
        </section>
    )
};

export default ProfileModal;
