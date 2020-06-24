import React, { Component } from "react"
import "./HotelsList.scss"
import Hotel from "./../Hotel/Hotel"

// Fetch the hotels to visit directly from the API, then render each of them into a component named "Hotel"

class HotelsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    fetch("http://localhost:27017/hotels")
      .then(res => res.json())
      .then(data => {
          this.setState({
            isLoaded: true,
            hotels: data
          });
        }
      )
  }

  renderHotels = () => {
    const hotels = this.state.hotels;
    return hotels.map((hotel, id) =>
      <Hotel
        key={id}
        id={hotel._id}
        name={hotel.nom}
        adress={hotel.adresse}
        ville={hotel.city}
        zipcode={hotel.cp}
      />
    );
  }

  render() {
    return (
      <div className="HotelsList">
        <div className="HotelsList__container">
          {this.state.isLoaded ? this.renderHotels() : 'Loading...'}
        </div>
        <button className="HotelsList__button">Voir Plus</button>
      </div>
    )
  }
}

export default HotelsList