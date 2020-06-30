import React, {Component} from "react"
import "./TeamSelector.scss"

import {API} from '../../../utils/api'
import { CurrentTeamContext } from "../../../contexts/CurrentTeamContext";

class TeamSelector extends Component {

    state = {
        title: "Binôme",
        isActive: false,
        teams: []
    }

    static contextType = CurrentTeamContext

    

    handleToggle = () => {
        this.setState(prevState => ({ isActive: !prevState.isActive }))
    }

    componentDidMount(){
        API.get('gestion/equipes/').then((response) => {
            this.setState({
                teams: response.data
            })
        })
    }

    handleChange(team){
        const [currentTeam, setCurrentTeam] = this.context

        this.setState({
            isActive: !this.state.isActive,
        })
        setCurrentTeam(team)
    }

    render() {

        const { title, isActive, value, teams } = this.state
        const [currentTeam] = this.context


        return (
            <div className={`TeamSelector ${isActive ? "TeamSelector--active" : ""}`}>
                <h3 className="TeamSelector__title">{title}</h3>
                <div className="TeamSelector__container">
                    <p className={`TeamSelector__current ${currentTeam ? 'TeamSelector__current--active' : ''}`} onClick={this.handleToggle}>
                        <span>{currentTeam ? currentTeam.user_names.user_a + " / " + currentTeam.user_names.user_b : title}</span>
                        <svg viewBox="0 0 12 8">
                            <path d="M1.41 0.590088L6 5.17009L10.59 0.590088L12 2.00009L6 8.00009L0 2.00009L1.41 0.590088Z" />
                        </svg>
                    </p>
                    <ul className="TeamSelector__items">
                        {teams.map(team => <li key={team.equipe._id} onClick={() => this.handleChange(team)} className="TeamSelector__item">{team.user_names.user_a} / {team.user_names.user_b}</li> )}
                    </ul>
                </div>
            </div>
        )
    }

}

export default TeamSelector