import React, { createContext, useContext, useState, useEffect } from "react"
import "./HotelsList.scss"
import Hotel from "./../Hotel/Hotel"
import { API } from '../../../utils/api'
import { CurrentTeamContext } from "../../../contexts/CurrentTeamContext";

// Fetch the hotels to visit directly from the API, then render each of them into a component named "Hotel"
export const HotelContext = createContext({
  sendVisit: (id) => {
    console.log(id)
  }
});

const HotelsList = () => {
  const [hotels, setHotels] = useState([])
  const [currentTeam] = useContext(CurrentTeamContext)

  const {sendVisit} = useContext(HotelContext)

  useEffect(() => {
    API.get('hotels/').then((response) => {
      setHotels(response.data)
    })
  }, []);

  

  let allVisits = currentTeam && hotels.length !== 0 ? hotels.filter(hotels => hotels.cp.toString().substring(0, 2) == currentTeam.equipe.secteur_binome).map(hotel => <Hotel key={hotel._id} hotel={hotel} />) : hotels.map(hotel => <Hotel key={hotel._id} hotel={hotel} />)
  if (!currentTeam) {
    return (
      <div>Veuillez choisir un binome</div>
    )
  }
  
  return (
    <HotelContext.Provider value={{sendVisit}}>
      <div className="HotelsList">
        <div className="HotelsList__container">
          {allVisits}
        </div>
        {/* <button className="HotelsList__button">Voir Plus</button> */}
      </div>
    </HotelContext.Provider>
  );
};


export default HotelsList;