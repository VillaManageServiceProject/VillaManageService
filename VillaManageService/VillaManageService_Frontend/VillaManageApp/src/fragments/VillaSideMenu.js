import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Animated,
} from 'react-native';
import SideMenu from '../components/SideMenu';
import TextButton from '../components/TextButton';

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

export default VillaSideMenu = ({onClose}) => {
  const menuAnimation = new Animated.Value(0);

  const slideIn = () => {
    Animated.timing(menuAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(onClose);
  };

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // Adjust this range as needed to control the slide distance
  });

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
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'column', backgroundColor: 'yellow'}}>
            <Text>username</Text>
            <Text>id(세대주와의 관계)</Text>
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
            childMenuList={['빌라정보', '호수별정보']}
          />
          <SideMenu
            title="공용메뉴"
            IconName="home"
            childMenuList={[
              '공지사항',
              '일정관리',
              '설문조사/투표',
              '게시판',
              '갤러리',
            ]}
          />
          <SideMenu
            title="관리메뉴"
            IconName="setting"
            childMenuList={['관리비', '입주자회의', '시설관리']}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            // backgroundColor: 'blue',
          }}>
          <TextButton
            IconType="MaterialCommunityIcons"
            IconName="login"
            text="Logout"
            // backgroundColor="yellow"
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
