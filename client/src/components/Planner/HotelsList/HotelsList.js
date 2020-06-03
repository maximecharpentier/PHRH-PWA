import React, { Component } from "react"
import "./HotelsList.scss"
import Hotel from "./../Hotel/Hotel"
import API from '../../../api/api'


// Fetch the hotels to visit directly from the API, then render each of them into a component named "Hotel"

class HotelsList extends Component {

    state = {
        hotels: []
    }
    componentDidMount(){
        API.get('hotels/').then((response) => {
            this.setState({
                hotels: response.data
            })
        })
    }

    render() {
        const {hotels} = this.state;
        return (
            <div className="HotelsList">
                <div className="HotelsList__container">
                    {hotels.map(hotel => 
                        <Hotel hotel={hotel}/>)}
                </div>
                <button className="HotelsList__button">Voir Plus</button>
            </div>
        )
    }

}

export default HotelsList