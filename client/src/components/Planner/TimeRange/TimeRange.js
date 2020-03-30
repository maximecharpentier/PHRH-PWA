import React, { Component } from "react"
import "./TimeRange.scss"

class TimeRange extends Component {

    state = {
        title: "Plage horaire",
        hours: "9h - 16h30"
    }

    render() {

        const { title, hours } = this.state

        return (
            <div className="TimeRange">
                <h2 className="TimeRange__title">{title}</h2>
                <p className="TimeRange__hours">{hours}</p>
            </div>
        )
    }

}

export default TimeRange