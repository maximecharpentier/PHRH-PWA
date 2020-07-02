import React, { useState, createContext } from 'react';

// Create Context Object
export const CurrentTeamContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const CurrentTeamContextProvider = props => {
  const [currentTeam, setCurrentTeam] = useState(false);

  return (
    <CurrentTeamContext.Provider value={[currentTeam, setCurrentTeam]}>
      {props.children}
    </CurrentTeamContext.Provider>
  );
};