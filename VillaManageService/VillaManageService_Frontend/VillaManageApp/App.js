// import React from 'react';
// import {Text, View, StyleSheet} from 'react-native';

// function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello world from React Naitve Web</Text>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default App;

//////////////////////////////////////////////////////////////

import React, {useEffect} from 'react';
// import 'react-native-reanimated';
// import 'react-native-gesture-handler';
// import {enableScreens} from 'react-native-screens';
// enableScreens();
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {AuthenticationProvider} from './src/navigations/RootStackNavigations';

console.disableYellowBox = true;

// if (__DEV__) {
//   import('react-native-reanimated/src/ReanimatedDevTools').then(() => {});
// }

// const Screens = () => {
//   return (
//     // <GestureHandlerRootView style={{flex: 1}}>
//     <NavigationContainer>
//       <RootStackNavigations />
//     </NavigationContainer>
//     // </GestureHandlerRootView>
//   );
// };

export default function App() {
  useEffect(() => {
    SplashScreen.hide();

    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  // return <Screens />;
  return <AuthenticationProvider />;
}

//////////////////////////////////////////////////////////////////

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import {NavigationContainer} from '@react-navigation/native';
// import {RootStackNavigations} from './src/navigations/RootStackNavigations';

// const Screens = () => {
//   return (
//     <NavigationContainer>
//       <RootStackNavigations />
//     </NavigationContainer>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return <Screens />;

// return (
//   <SafeAreaView style={backgroundStyle}>
//     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//     <ScrollView
//       contentInsetAdjustmentBehavior="automatic"
//       style={backgroundStyle}>
//       <Header />
//       <View
//         style={{
//           backgroundColor: isDarkMode ? Colors.black : Colors.white,
//         }}>
//         <Section title="Step One">
//           Edit <Text style={styles.highlight}>App.js</Text> to change this
//           screen and then come back to see your edits.
//         </Section>
//         <Section title="See Your Changes">
//           <ReloadInstructions />
//         </Section>
//         <Section title="Debug">
//           <DebugInstructions />
//         </Section>
//         <Section title="Learn More">
//           Read the docs to discover what to do next:
//         </Section>
//         <LearnMoreLinks />
//       </View>
//     </ScrollView>
//   </SafeAreaView>
// );
// };

// export default App;
