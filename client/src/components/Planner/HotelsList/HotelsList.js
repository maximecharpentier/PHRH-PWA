
import React, { createContext, useContext, useState, useEffect } from "react"
import "./HotelsList.scss"
import Hotel from "./../Hotel/Hotel"
import { API } from '../../../utils/api'
import { CurrentTeamContext } from "../../../contexts/CurrentTeamContext";

// Fetch the hotels to visit directly from the API, then render each of them into a component named "Hotel"
export const HotelContext = createContext({
  sendVisit: (data, date) => {
    const visite = {
      hotel_id: data.hotel.hotel_id,
      date_visite: date,
      duree: null,
      type: "Visite",
      visite_effectue: false,
      equipe_id: data.currentTeam.equipe._id,
      note: data.hotel.score,
    }
    console.log(visite)
    API.post('gestion/visites/plannifier/', visite).then((response) => {
      console.log(response.data)
    }).catch(error => {
      console.log(error.response)
    });

  }
});

const HotelsList = () => {
  const [hotels, setHotels] = useState([])
  const [currentTeam] = useContext(CurrentTeamContext)

  const { sendVisit } = useContext(HotelContext)

  useEffect(() => {
    API.get('gestion/visites/suggestions/', { params: { filters: { secteur: 75 } } }).then((response) => {
      setHotels(response.data)
    })
  }, []);

  // currentTeam && hotels.length !== 0 && console.log( hotels[500].hotel_id.cp.toString().substring(0, 2), currentTeam.equipe.secteur_binome.substring(0, 2))
  // let allVisits = currentTeam && hotels.length !== 0 && hotels.filter(hotel => hotel.hotel_id.cp.toString().substring(0, 2) === currentTeam.equipe.secteur_binome.substring(0, 2)).map(hotel => <Hotel list key={hotel._id} hotel={hotel} />) 

  let allVisits = currentTeam && hotels.length !== 0 && hotels.map(hotel => <Hotel list key={hotel._id} hotel={hotel} />) 
  if (!currentTeam) {
    return (
      <div>Veuillez choisir un binome</div>
    )
  }

  return (
    <HotelContext.Provider value={{ sendVisit }}>
      <div className="HotelsList">
        <div className="HotelsList__container">
          {allVisits}
        </div>
        <button className="HotelsList__button">Voir Plus</button>
      </div>
    </HotelContext.Provider>
  );
};


export default HotelsList;