import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import {UnLoginedMapScreen, LoginedMapScreen} from '../screens/MapScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {UserContext, UserProvider} from '../context/UserProvider';
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
<<<<<<< Updated upstream
import {PostScreen} from '../screens/PostScreen';
=======
import {VillaInfoScreen} from '../screens/VillaInfoScreen';
>>>>>>> Stashed changes
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
      <NavigationContainer>
        {/* <RootStackNavigations handleLogin={handleLogin} isLoggedIn={isLoggedIn} /> */}
        <RootStackNavigations />
      </NavigationContainer>
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
          {/* <Stack.Screen name="LoginedMap" component={LoginedMapScreen} />
          <Stack.Screen
            name="Villa"
            component={VillaHomeScreen}
            // options={{headerShown: false}}
          />
          <Stack.Screen
            name="AccountSetting"
            component={AccountSettingScreen}
          />
          <Stack.Screen name="NoticeBoard" component={NoticeBoardScreen} /> */}
          <Stack.Screen name="AddNotice" component={AddNoticeScreen} />
          {/* <Stack.Screen name="Post" component={PostScreen} /> */}
          {/* <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="AddChat" component={AddChatScreen} /> */}
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
