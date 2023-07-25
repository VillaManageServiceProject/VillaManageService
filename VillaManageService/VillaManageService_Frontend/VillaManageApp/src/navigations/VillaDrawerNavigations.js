import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {VillaSideMenu} from '../fragments/VillaSideMenu';
import {VillaHomeScreen} from '../screens/VillaHomeScreen';
import {VillaMenuScreen} from '../screens/VillaMenuScreen';

const Drawer = createDrawerNavigator();

const VillaDrawerNavigations = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={() => <VillaSideMenu />}>
      <Drawer.Screen name="Home" component={VillaHomeScreen} />
      <Drawer.Screen name="Menu" component={VillaMenuScreen} />
    </Drawer.Navigator>
  );
};

export default VillaDrawerNavigations;
