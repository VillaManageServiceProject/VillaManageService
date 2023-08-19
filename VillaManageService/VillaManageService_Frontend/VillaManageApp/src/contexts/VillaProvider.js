import React, {createContext, useState} from 'react';

export const VillaContext = createContext();

export const VillaProvider = ({children}) => {
  const [villaId, setVillaId] = useState('000000000000000000');
  const [villaInfo, setVillaInfo] = useState(null);

  return (
    <VillaContext.Provider value={{villaId, setVillaId, setVillaInfo}}>
      {children}
    </VillaContext.Provider>
  );
};
