import React, {createContext, useState} from 'react';

export const villaContext = createContext();

export const VillaProvider = ({children}) => {
  const [villaId, setVillaId] = useState('');
  const [villaInfo, setVillaInfo] = useState(null);

  return (
    <villaContext.Provider value={{setVillaId, setVillaInfo}}>
      {children}
    </villaContext.Provider>
  );
};
