import React, { Component } from "react"
import "./HotelsList.scss"
import Hotel from "./../Hotel/Hotel"
import { API } from '../../../utils/api'
import { CurrentTeamContext } from "../../../contexts/CurrentTeamContext";


// Fetch the hotels to visit directly from the API, then render each of them into a component named "Hotel"

class HotelsList extends Component {
  state = {
    hotels: []
  }
  static contextType = CurrentTeamContext

  componentWillMount() {
    API.get('hotels/').then((response) => {
      this.setState({
        hotels: response.data
      })
    })
  }

  render() {
    const { hotels } = this.state;
    const currentTeam = this.context
    let allVisits = currentTeam[0] && this.state.hotels.length !== 0 ?  hotels.filter(hotels => hotels.cp.toString().substring(0, 2) == currentTeam[0].equipe.secteur_binome).map(hotel => <Hotel id={hotel._id} hotel={hotel} />) : hotels.map(hotel => <Hotel key={hotel._id} hotel={hotel} />)
    return (
      <div className="HotelsList">
        <div className="HotelsList__container">
          {allVisits}
        </div>
        <button className="HotelsList__button">Voir Plus</button>
      </div>
    )
  }

}

export default HotelsList