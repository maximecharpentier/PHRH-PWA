import React, {Component} from "react"
import "./TeamSelector.scss"

class TeamSelector extends Component {

    state = {
        title: "Binôme",
        isActive: false,
        value: "Binôme"
    }

    handleToggle = () => {
        this.setState(prevState => ({ isActive: !prevState.isActive }))
    }

    render() {

        const { title, isActive, value } = this.state

        return (
            <div className={`TeamSelector ${isActive && "TeamSelector--active"}`}>
                <h3 className="TeamSelector__title">{title}</h3>
                <div className="TeamSelector__container">
                    <p className="TeamSelector__current" onClick={this.handleToggle}>
                        <span>{value}</span>
                        <svg viewBox="0 0 12 8">
                            <path d="M1.41 0.590088L6 5.17009L10.59 0.590088L12 2.00009L6 8.00009L0 2.00009L1.41 0.590088Z" />
                        </svg>
                    </p>
                    <ul className="TeamSelector__items">
                        <li className="TeamSelector__item">A</li>
                        <li className="TeamSelector__item">B</li>
                        <li className="TeamSelector__item">C</li>
                        <li className="TeamSelector__item">D</li>
                    </ul>
                </div>
            </div>
        )
    }

}

export default TeamSelector