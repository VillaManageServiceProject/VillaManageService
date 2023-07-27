import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {UnLoginedMapScreen, LoginedMapScreen} from '../screens/MapScreen';
import {LoginScreen} from '../screens/LoginScreen';
// import VillaDrawerNavigations from './VillaDrawerNavigations';
import {JoinScreen} from '../screens/JoinScreen';
import {ResidentsJoinScreen} from '../screens/ResidentsJoinScreen';
import {LandlordJoinScreen} from '../screens/LandlordJoinScreen';
import {BuildingManagerJoinScreen} from '../screens/BuildingManagerJoinScreen';
import {CommunityCenterJoinScreen} from '../screens/CommunityCenterJoinScreen';
import SearchAddressScreen from '../screens/SearchAddressScreen';
import {AccountSettingScreen} from '../screens/AccountSettingScreen';
import {VillaHomeScreen} from '../screens/VillaHomeScreen';
import {NoticeBoardScreen} from '../screens/NoticeBoardScreen';
import {AddNoticeScreen} from '../screens/AddNoticeScreen';
import {ChatScreen} from '../screens/ChatScreen';
import {AddChatScreen} from '../screens/AddChatScreen';
// import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// // Define the main drawer navigator
// const MainDrawerNavigator = () => (
//   <Drawer.Navigator>
//     <Drawer.Screen name="LoginedMap" component={LoginedMapScreen} />
//     <Drawer.Screen name="Login" component={LoginScreen} />
//     <Drawer.Screen name="Villa" component={VillaScreen} />
//   </Drawer.Navigator>
// );

export const RootStackNavigations = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <Stack.Screen name="LoginedMap" component={LoginedMapScreen} />
      ) : (
        <Stack.Screen name="UnLoginedMap" component={UnLoginedMapScreen} />
      )}

      {/* <Stack.Group screenOptions={{headerShown: false}}> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Join" component={JoinScreen} />
      <Stack.Screen name="ResidentsJoin" component={ResidentsJoinScreen} />
      <Stack.Screen
        name="BuildingManagerJoin"
        component={BuildingManagerJoinScreen}
      />
      <Stack.Screen name="LandlordJoin" component={LandlordJoinScreen} />
      <Stack.Screen
        name="CommunityCenterJoin"
        component={CommunityCenterJoinScreen}
      />
      <Stack.Screen name="SearchAddress" component={SearchAddressScreen} />
      {/* </Stack.Group> */}

      {/* <Stack.Screen
        name="Villa"
        component={VillaHomeScreen}
        // options={{headerShown: false}}
      />

      <Stack.Screen name="AccountSetting" component={AccountSettingScreen} />
      <Stack.Screen name="NoticeBoard" component={NoticeBoardScreen} />
      <Stack.Screen name="AddNotice" component={AddNoticeScreen} /> */}
      {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
      <Stack.Screen name="AddChat" component={AddChatScreen} />
    </Stack.Navigator>
  );
};
