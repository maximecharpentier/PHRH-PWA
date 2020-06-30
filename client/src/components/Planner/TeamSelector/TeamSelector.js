import React, { useState, useEffect, useContext } from 'react';
import "./TeamSelector.scss"

import { API } from '../../../api/api'

import { CurrentTeamContext } from "../../../contexts/CurrentTeamContext";

const TeamSelector = () => {
    const [currentTeam, setCurrentTeam] = useContext(CurrentTeamContext);

    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState("Binôme");
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        API.get('gestion/equipes/').then((response) => {
            setTeams(response.data)
        })
    }, []);

    const handleChange = (team) => {
        setIsActive(!isActive)
        setCurrentTeam(team)
    }

    return (
        <div className={`TeamSelector ${isActive ? "TeamSelector--active" : ""}`}>
            <h3 className="TeamSelector__title">Binôme</h3>
            <div className="TeamSelector__container">
                <p className={`TeamSelector__current ${currentTeam ? "TeamSelector__current--active" : ""}`} onClick={() => setIsActive(!isActive)}>
                    <span>{currentTeam ? currentTeam.user_names.user_a : "Binôme"}</span>
                    <svg viewBox="0 0 12 8">
                        <path d="M1.41 0.590088L6 5.17009L10.59 0.590088L12 2.00009L6 8.00009L0 2.00009L1.41 0.590088Z" />
                    </svg>
                </p>
                <ul className="TeamSelector__items">
                    {teams && teams.map(team => <li key={team.equipe._id} onClick={() => handleChange(team)} className="TeamSelector__item">{team.user_names.user_a} / {team.user_names.user_b}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default TeamSelector