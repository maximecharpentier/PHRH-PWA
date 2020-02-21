import React from 'react';
import './styles.scss'
import SubHeader from '../../../components/Common/SubHeader/SubHeader.js'
import ManagerDisplayList from '../../../components/Managers/ManagerDisplayList/ManagerDisplayList.js'
import ManagerDisplayTable from '../../../components/Managers/ManagerDisplayTable/ManagerDisplayTable.js'
import ListItemHeader from '../../../components/Common/ListItemHeader/ListItemHeader.js'

const Managers = () => {
  // fetch('https://monapi.com/hotels')
  // .then(res => {
    
  // })
  const MANAGERS = [
    { 
      nom: "Jean-Pierre",
      adresse: "26 avenue ...",
      cp: 75013,
    },
    { 
      nom: "Michel",
      adresse: "26 avenue ...",
      cp: 75013,
    },
    { 
      nom: 'Auguste',
      adresse: '26 avenue ...',
      cp: 75013,
    },
    { 
      nom: 'Antoine',
      adresse: '26 avenue ...',
      cp: 75013,
    },
    { 
      nom: 'Nicolas',
      adresse: '26 avenue ...',
      cp: 75013,
    }
  ]
  let displayList = true;
  let toggleDisplay;
  if (displayList) {
    toggleDisplay = <ManagerDisplayList data={MANAGERS} />;
  } else {
    toggleDisplay = <ManagerDisplayTable data={MANAGERS} />
  }
  return (
    <div className="container">
      <div className="container__inside">
        <SubHeader button="Ajouter un superviseur →" title="Les superviseurs à votre disposition" overtitle="Gestion des superviseurs" />
        <ListItemHeader placeholder="Nom / Prénom" />
        {toggleDisplay}
      </div>
    </div>
  );
}

export default Managers;
