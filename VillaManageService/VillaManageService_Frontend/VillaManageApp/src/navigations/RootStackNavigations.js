import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
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
import {PostScreen} from '../screens/PostScreen';
import {VillaInfoScreen} from '../screens/VillaInfoScreen';
import {SurveyScreen} from '../screens/SurveyScreen';
import {
  GeneralBoardScreen,
  SurveyBoardScreen,
} from '../screens/PostBoardScreen';
import {AddGeneralScreen, AddSurveyScreen} from '../screens/AddPostScreen';
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
  const {isLoggedIn} = useContext(UserContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   // Your login logic here, if login is successful, set isLoggedIn to true
  //   console.log('here');
  //   setIsLoggedIn(true);
  // };

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="LoginedMap" component={LoginedMapScreen} />
          <Stack.Screen
            name="Villa"
            component={VillaHomeScreen}
            // options={{headerShown: false}}
          />
          <Stack.Screen
            name="AccountSetting"
            component={AccountSettingScreen}
          />
          <Stack.Screen name="GeneralBoard" component={GeneralBoardScreen} />
          <Stack.Screen name="AddGeneral" component={AddGeneralScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
          {/* <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="AddChat" component={AddChatScreen} /> */}
          <Stack.Screen name="SurveyBoard" component={SurveyBoardScreen} />
          <Stack.Screen name="Survey" component={SurveyScreen} />
          <Stack.Screen name="AddSurvey" component={AddSurveyScreen} />
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
          <Stack.Screen name="villaInfo" component={VillaInfoScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
