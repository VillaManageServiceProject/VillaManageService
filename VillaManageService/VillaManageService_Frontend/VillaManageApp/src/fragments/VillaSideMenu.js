import React, {useContext, useEffect} from 'react';
import {UserContext} from '../contexts/UserProvider';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import SideMenu from '../components/SideMenu';
import TextButton from '../components/TextButton';
import {logout} from '../api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// export const VillaSideMenu = () => {
//   //   const progress = useDrawerProgress();

//   // If you are on react-native-reanimated 1.x, use `Animated.interpolate` instead of `Animated.interpolateNode`
//   const translateX = Animated.interpolateNode(progress, {
//     inputRange: [0, 1],
//     outputRange: [-100, 0],
//   });

//   return (
//     <Animated.View style={{transform: [{translateX}]}}>
//       <Button
//         title="Go somewhere"
//         onPress={() => {
//           console.log('hi2');
//           // Navigate using the `navigation` prop that you received
//           // navigation.navigate('SomeScreen');
//         }}
//       />
//     </Animated.View>
//   );
//   // return (
//   //   <View>
//   //     <Text>Side Menu Content</Text>
//   //   </View>
//   // );
// };

export default VillaSideMenu = ({onToggle, navigationReset}) => {
  const {navigation} = useNavigation();
  const {isLoggedIn, userInfo, handleLogout} = useContext(UserContext);

  let currentAnimatedValue = 0;
  const menuAnimation = new Animated.Value(0);
  menuAnimation.addListener(({value}) => {
    currentAnimatedValue = value;
  });

  useEffect(() => {
    if (onToggle) slideIn();
    else slideOut();
    console.log('onToggle: ', onToggle);
  }, [onToggle]);

  const slideIn = () => {
    Animated.timing(menuAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (!finished) {
        // 애니메이션 중간에 멈췄다면,
        console.log('animation finished');
        moveToDestination(currentAnimatedValue, Dimensions.get('window').width); // 현재 위치에서 300까지 다시 이동
      }
    });
  };

  const slideOut = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (!finished) {
        // 애니메이션 중간에 멈췄다면,
        console.log('animation finished');
        moveToDestination(currentAnimatedValue, 100); // 현재 위치에서 300까지 다시 이동
      }
    });
  };

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width, 100], // Adjust this range as needed to control the slide distance
  });

  const moveToDestination = (fromValue, toValue) => {
    menuAnimation.setValue(fromValue); // 애니메이션의 현재 값을 설정
    Animated.timing(menuAnimation, {
      toValue: toValue,
      duration: ((toValue - fromValue) / 300) * 1000, // 남은 거리만큼 애니메이션 시간 조절
      useNativeDriver: false,
    }).start();
  };

  const handleLogoutSubmit = async () => {
    try {
      const response = await logout();
      // Handle the response from the signup API
      console.log(response);

      // if (response.status === 200) {
      handleLogout();
      navigationReset();
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'UnLoginedMap'}],
      // });
      // }
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

    // const response = await checkSession();
  };

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateX: menuTranslateX}]}]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          width: '70%',
          // backgroundColor: 'red',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: 45,
              height: 45,
              borderRadius: 15,
              borderWidth: 1,
              marginRight: 15,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#9AA0A6',
            }}>
            <MaterialCommunityIcons name="account" size={25} color="black" />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text>{userInfo.name}</Text>
            <Text>{userInfo.id}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
          }}>
          <SideMenu
            title="빌라소개"
            IconName="infocirlceo"
            childMenuList={{빌라정보: 'VillaInfo'}}
          />
          <SideMenu
            title="공용메뉴"
            IconName="home"
            childMenuList={{
              공지사항: 'AnnounceBoard',
              // 일정관리: '',
              '설문조사/투표': 'SurveyBoard',
              게시판: 'GeneralBoard',
              // 갤러리: '',
            }}
          />
          {/* <SideMenu
            title="관리메뉴"
            IconName="setting"
            childMenuList={{관리비: '', 입주자회의: '', 시설관리: ''}}
          /> */}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            // backgroundColor: 'blue',
          }}>
          <TextButton
            IconType="MaterialCommunityIcons"
            IconName="logout"
            text="Logout"
            onPress={handleLogoutSubmit}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const Spacing = ({height}) => <View style={{height}} />;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '100%',
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 20,
  },
  bottomSection: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '100%',
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgray',
  },
});
