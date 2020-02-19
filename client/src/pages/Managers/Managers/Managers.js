import React from 'react';
import './styles.scss'
import SubHeader from '../../../components/Common/SubHeader/SubHeader.js'
import ListItem from '../../../components/Common/ListItem/ListItem.js'
import ListItemHeader from '../../../components/Common/ListItemHeader/ListItemHeader.js'

const Managers = () => {
  // fetch('https://monapi.com/hotels')
  // .then(res => {
    
  // })
  const MANAGERS = [
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
      urgence: false,
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
      <SubHeader button="Ajouter un superviseur →" title="Les superviseurs à votre disposition" overtitle="Gestion des superviseurs" />
      <ListItemHeader placeholder="Nom / Prénom" />
      <table>
        <tr>
          <th>Hôtel</th>
          <th>Adresse</th>
          <th>Secteur</th>
          <th>Chambres</th>
          <th>Nombre de visites par mois</th>
          <th>Note</th>
          <th>Urgence</th>
          <th>Nature de l'urgence</th>
        </tr>
        { MANAGERS.map(hotelData => {
          return <ListItem 
            hotel={hotelData}
          />
        })}
      </table>
    </div>
  );
}

export default Managers;
