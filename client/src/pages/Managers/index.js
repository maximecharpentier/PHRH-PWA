import React from 'react';
import './styles.css'
import ListItem from './../../components/Common/ListItem/ListItem.js'
import ListItemHeader from './../../components/Common/ListItemHeader/ListItemHeader.js'

const Managers = (props) => {
  // fetch('https://monapi.com/hotels')
  // .then(res => {
    
  // })
  const HOTELS = [
    { 
      nom: "Welcomo",
      adresse: "26 avenue ...",
      cp: 75013,
      nb_chambres_utilise: 5,
      nb_visites_periode: 6,
      anomalie: "foobar",
      urgence: true,
      nature: "TROU"
    },
    { 
      nom: "Welcomo",
      adresse: "26 avenue ...",
      cp: 75013,
      nb_chambres_utilise: 5,
      nb_visites_periode: 6,
      anomalie: "foobar",
      urgence: true,
      nature: "TROU"
    },
    { 
      nom: "Welcomo",
      adresse: "26 avenue ...",
      cp: 75013,
      nb_chambres_utilise: 5,
      nb_visites_periode: 6,
      anomalie: "foobar",
      urgence: true,
      nature: "TROU"
    }
  ]
  return (
    <div className="container">
      <ListItemHeader />
      <table>
        <tr>
          <th>Hôtel</th>
          <th>Adresse</th>
          <th>Secteur</th>
          <th>Chambres</th>
          <th>Nombre de visites par mois</th>
          <th>Taux d'anomalie</th>
          <th>Urgence</th>
          <th>Nature de l'urgence</th>
        </tr>
        { HOTELS.map(hotelData => {
          return <ListItem 
            hotel={hotelData}
          />
        })}
      </table>
    </div>
  );
}

export default Managers;
