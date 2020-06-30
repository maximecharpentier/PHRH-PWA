import React, { Component } from "react"
import "./TimeRange.scss"
import { CurrentTeamContext } from "../../../contexts/CurrentTeamContext";


class TimeRange extends Component {

    state = {
        title: "Plage horaire",
    }
    static contextType = CurrentTeamContext

    render() {

        const { title } = this.state
        const [currentTeam] = this.context

        return (
            <div className="TimeRange">
                <h2 className="TimeRange__title">{title}</h2>
                <p className="TimeRange__hours">{currentTeam ? currentTeam.equipe.plage_h : ""}</p>
            </div>
        )
    }

}

export default TimeRange