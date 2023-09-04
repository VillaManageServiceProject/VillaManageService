import React, {createContext, useState} from 'react';
import {requestGET} from '../api';

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
  updateInfo: () => {},
});

export const VillaProvider = ({children}) => {
  const [villaId, setVillaId] = useState('000000000000000000');
  const [villaName, setVillaName] = useState('');
  const [villaAddress, setVillaAddress] = useState('');
  const [villaDetail, setVillaDetail] = useState(null);
  const [villaHouses, setVillaHouses] = useState([]);
  const [villaLocalCC, setVillaLocalCC] = useState('');
  const [villaBM, setVillaBM] = useState('');

  const setVillaState = currVilla => {
    console.log('currVilla: ', currVilla);
    setVillaId(currVilla.id);
    setVillaAddress(currVilla.address);
    setVillaDetail(JSON.parse(currVilla.villaInfo).body.items.item[0]);
    setVillaHouses(currVilla.houses);
    setVillaLocalCC(currVilla.localCC);
    setVillaBM(currVilla.buildingManagers);
  };

  const updateInfo = async () => {
    try {
      console.log('villa update');
      const response = await requestGET(`/villa/${villaId}`);

      setVillaState(response);
    } catch (error) {
      if (error.response) {
        // The server responded with a status other than 2xx
        console.log('Response Data:', error.response.data);
        console.log('Response Status:', error.response.status);
        console.log('Response Headers:', error.response.headers);

        setSubmitError(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Request:', error.request);
      } else {
        // Something happened in setting up the request
        console.log('Error:', error.message);
      }
    }
  };

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
        updateInfo,
      }}>
      {children}
    </VillaContext.Provider>
  );
};
