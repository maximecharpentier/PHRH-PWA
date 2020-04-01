import React, { Component } from "react"
import "./HotelsList.scss"
import Hotel from "./../Hotel/Hotel"

// Fetch the hotels to visit directly from the API, then render each of them into a component named "Hotel"

class HotelsList extends Component {

    state = {}

    render() {
        return (
            <div className="HotelsList">
                <div className="HotelsList__container">
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                </div>
                <button className="HotelsList__button">Voir Plus</button>
            </div>
        )
    }

}

export default HotelsList