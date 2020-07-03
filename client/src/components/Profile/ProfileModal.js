import React from 'react';
import { useAuth } from "../../contexts/AuthContext";


const ProfileModal = ({setProfile}) => {
    const {authToken, setAuthToken } = useAuth();

    const logOut = () => {
        setAuthToken();
        setProfile(false)
    }
    const userInfos = JSON.parse(localStorage.getItem('user'))
    return (
        <section className="profile">
            <div>{userInfos.nom} {userInfos.prenom}</div>
            <div>Adresse: {userInfos.adresse}</div>
            <div>Role: {userInfos.fonction}</div>
            <button onClick={logOut}>Deconnexion</button>
        </section>
    )
};

export default ProfileModal;
