import React from 'react';
import './styles.scss'
import SubHeader from '../../../components/Common/SubHeader/SubHeader.js'
import ListItemHeader from '../../../components/Common/ListItemHeader/ListItemHeader.js'
import DisplayList from '../../../components/Managers/DisplayList/DisplayList.js'
import DisplayTable from '../../../components/Managers/DisplayTable/DisplayTable.js'

const Hotels = () => {
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
      anomalie: 27.6,
      urgence: true,
      nature: "TROU"
    },
    { 
      nom: "Welcomo",
      adresse: "26 avenue ...",
      cp: 75013,
      nb_chambres_utilise: 5,
      nb_visites_periode: 6,
      anomalie: 27.5,
      urgence: false,
      nature: "TROU"
    },
    { 
      nom: "Welcomo",
      adresse: "26 avenue ...",
      cp: 75013,
      nb_chambres_utilise: 5,
      nb_visites_periode: 6,
      anomalie: 27.5,
      urgence: true,
      nature: "TROU"
    },
    { 
      nom: "Welcomo",
      adresse: "26 avenue ...",
      cp: 75013,
      nb_chambres_utilise: 5,
      nb_visites_periode: 6,
      anomalie: 27.5,
      urgence: true,
      nature: "TROU"
    },
    { 
      nom: "Welcomo",
      adresse: "26 avenue ...",
      cp: 75013,
      nb_chambres_utilise: 5,
      nb_visites_periode: 6,
      anomalie: 27.5,
      urgence: true,
      nature: "Moisissure"
    }
  ]
  let displayList = false;
  let toggleDisplay;
  if (displayList) {
    toggleDisplay = <DisplayList data={HOTELS} />;
  } else {
    toggleDisplay = <DisplayTable data={HOTELS} />
  }
  return (
    <div className="container">
      <SubHeader button="Ajouter un hôtel →" title="Les hôtels à votre disposition" overtitle="Gestion des hôtels" />
      <ListItemHeader placeholder="Hôtels / Adresses" />
      {toggleDisplay}
    </div>
  );
}

export default Hotels;
