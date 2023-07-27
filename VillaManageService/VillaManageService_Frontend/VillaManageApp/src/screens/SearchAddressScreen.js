import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import Postcode from '@actbase/react-daum-postcode';

export default SearchAddressScreen = ({route}) => {
  const {parentScreenName} = route.params;
  const navigation = useNavigation();

  const getAddressData = data => {
    let defaultAddress = '';

    if (data.buildingName === '') {
      defaultAddress = '';
    } else if (data.buildingName === 'N') {
      defaultAddress = '(' + data.apartment + ')';
    } else {
      defaultAddress = '(' + data.buildingName + ')';
    }
    // this.props.navigation.navigate('Drawers', {
    //   screen: 'Deliver',
    //   params: {
    //     zonecode: data.zonecode,
    //     address: data.address,
    //     defaultAddress: defaultAddress,
    //   },
    // });
    // const addressData = data;
    // console.log(addressData);
    // navigation.goBack({addressData: data});

    console.log(parentScreenName);
    navigation.navigate(parentScreenName, {addressData: data});
  };

  return (
    <Postcode
      style={{width: '100%', height: '100%'}}
      jsOptions={{animation: true}}
      onSelected={data => getAddressData(data)}
    />
  );
};
