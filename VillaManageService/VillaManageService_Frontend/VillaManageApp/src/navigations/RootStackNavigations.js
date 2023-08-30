import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {UnLoginedMapScreen, LoginedMapScreen} from '../screens/MapScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {UserProvider, UserContext} from '../contexts/UserProvider';
import {VillaProvider} from '../contexts/VillaProvider';
import {JoinScreen} from '../screens/JoinScreen';
import {ResidentsJoinScreen} from '../screens/ResidentsJoinScreen';
import {LandlordJoinScreen} from '../screens/LandlordJoinScreen';
import {BuildingManagerJoinScreen} from '../screens/BuildingManagerJoinScreen';
import {CommunityCenterJoinScreen} from '../screens/CommunityCenterJoinScreen';
import SearchAddressScreen from '../screens/SearchAddressScreen';
import {AccountSettingScreen} from '../screens/AccountSettingScreen';
import {VillaHomeScreen} from '../screens/VillaHomeScreen';
import {ChatScreen} from '../screens/ChatScreen';
import {AddChatScreen} from '../screens/AddChatScreen';
import {GeneralScreen} from '../screens/GeneralScreen';
import {VillaInfoScreen} from '../screens/VillaInfoScreen';
import {SurveyScreen} from '../screens/SurveyScreen';
import {AnnounceScreen} from '../screens/AnnounceScreen';
import {
  GeneralBoardScreen,
  SurveyBoardScreen,
  AnnounceBoardScreen,
} from '../screens/PostBoardScreen';
import {
  AddGeneralScreen,
  AddSurveyScreen,
  AddAnnounceScreen,
} from '../screens/AddPostScreen';
import {
  EditGeneralScreen,
  EditSurveyScreen,
  EditAnnounceScreen,
} from '../screens/EditPostScreen';
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

export const AuthenticationProvider = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   // Your login logic here, if login is successful, set isLoggedIn to true
  //   console.log(isLoggedIn);
  //   setIsLoggedIn(true);
  // };

  return (
    <UserProvider>
      <VillaProvider>
        <NavigationContainer>
          {/* <RootStackNavigations handleLogin={handleLogin} isLoggedIn={isLoggedIn} /> */}
          <RootStackNavigations />
        </NavigationContainer>
      </VillaProvider>
    </UserProvider>
  );
};

// export const RootStackNavigations = ({isLoggedIn, handleLogin}) => {
export const RootStackNavigations = () => {
  const {navigation, navigate} = useNavigation();

  const {isLoggedIn} = useContext(UserContext);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('UnLoginedMap');
  //   }
  //   if (isLoggedIn) {
  //     navigate('LoginedMap');
  //   }
  // }, [isLoggedIn]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="LoginedMap" component={LoginedMapScreen} />
          <Stack.Screen
            name="Villa"
            component={VillaHomeScreen}
            options={{unmountOnBlur: true}}
            // options={{headerShown: false}}
          />
          <Stack.Screen
            name="AccountSetting"
            component={AccountSettingScreen}
          />
          <Stack.Screen name="AnnounceBoard" component={AnnounceBoardScreen} />
          <Stack.Screen name="Announce" component={AnnounceScreen} />
          <Stack.Screen name="AddAnnounce" component={AddAnnounceScreen} />
          <Stack.Screen name="EditAnnounce" component={EditAnnounceScreen} />
          <Stack.Screen name="GeneralBoard" component={GeneralBoardScreen} />
          <Stack.Screen name="AddGeneral" component={AddGeneralScreen} />
          <Stack.Screen name="General" component={GeneralScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="AddChat" component={AddChatScreen} />
          <Stack.Screen name="SurveyBoard" component={SurveyBoardScreen} />
          <Stack.Screen name="Survey" component={SurveyScreen} />
          <Stack.Screen name="AddSurvey" component={AddSurveyScreen} />
          <Stack.Screen name="EditGeneral" component={EditGeneralScreen} />
          <Stack.Screen name="EditSurvey" component={EditSurveyScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="UnLoginedMap" component={UnLoginedMapScreen} />
          {/* <Stack.Screen
            name="Login"
            component={LoginScreen}
            handleLogin={handleLogin}
          /> */}
          {/* <Stack.Screen name="Login" options={{unmountOnBlur: true}}>
            {props => <LoginScreen {...props} handleLogin={handleLogin} />}
          </Stack.Screen> */}
          <Stack.Screen
            name="Villa"
            component={VillaHomeScreen}
            // options={{headerShown: false}}
          />
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
          {/* <Stack.Screen name="villaInfo" component={VillaInfoScreen} /> */}
        </>
      )}
      <Stack.Screen name="villaInfo" component={VillaInfoScreen} />
    </Stack.Navigator>
  );
};
