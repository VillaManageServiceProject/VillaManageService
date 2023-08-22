import React, {createContext, useState} from 'react';

export const VillaContext = createContext({
  villaId: '',
  villaName: '',
  villaInfo: null,
  setVillaId: () => {},
  setVillaName: () => {},
  setVillaInfo: () => {},
});

export const VillaProvider = ({children}) => {
  const [villaId, setVillaId] = useState('000000000000000000');
  const [villaName, setVillaName] = useState('');
  const [villaInfo, setVillaInfo] = useState(null);

  // const handleSetId = id => {
  //   setVillaId(id);
  // };

  // const handleSetName = name => {
  //   setVillaName(name);
  // };

  return (
    <VillaContext.Provider
      value={{
        villaId,
        villaName,
        villaInfo,
        setVillaId,
        setVillaName,
        setVillaInfo,
      }}>
      {children}
    </VillaContext.Provider>
  );
};
