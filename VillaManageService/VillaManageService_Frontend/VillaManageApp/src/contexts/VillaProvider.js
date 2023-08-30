import React, {createContext, useState} from 'react';

export const VillaContext = createContext({
  villaId: '',
  villaName: '',
  villaAddress: '',
  villaDetail: null,
  villaHouses: [],
  villaLocalCC: '',
  villaBM: '',
  setVillaId: () => {},
  setVillaName: () => {},
  setVillaAddress: () => {},
  setVillaDetail: () => {},
  setVillaHouses: () => {},
  setVillaLocalCC: () => {},
  setVillaBM: () => {},
});

export const VillaProvider = ({children}) => {
  const [villaId, setVillaId] = useState('000000000000000000');
  const [villaName, setVillaName] = useState('');
  const [villaAddress, setVillaAddress] = useState('');
  const [villaDetail, setVillaDetail] = useState(null);
  const [villaHouses, setVillaHouses] = useState([]);
  const [villaLocalCC, setVillaLocalCC] = useState('');
  const [villaBM, setVillaBM] = useState('');

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
        villaAddress,
        villaDetail,
        villaHouses,
        villaLocalCC,
        villaBM,
        setVillaId,
        setVillaName,
        setVillaAddress,
        setVillaDetail,
        setVillaHouses,
        setVillaLocalCC,
        setVillaBM,
      }}>
      {children}
    </VillaContext.Provider>
  );
};
