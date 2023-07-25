import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import SideMenu from '../components/SideMenu';
import TextButton from '../components/TextButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatBoardItem from '../components/ChatBoardItem';
import {useNavigation} from '@react-navigation/native';

const NoticeBoardData = [
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 1,
  },
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 2,
  },
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 2,
  },
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 2,
  },
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 2,
  },
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 2,
  },
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 2,
  },
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 2,
  },
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 2,
  },
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 2,
  },
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 2,
  },
  {
    title: '참여자',
    text: '최신 챗',
    newMessageCount: 2,
  },
];

export default ChatBoard = ({onClose}) => {
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const slideIn = () => {
    Animated.timing(menuAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

  const menuTranslateY = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // Adjust this range as needed to control the slide distance
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: () => {
        // Slide down when the touch is released
        slideOut();
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.container, {transform: [{translateY: menuTranslateY}]}]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          width: '100%',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 70,
              height: 8,
              borderRadius: 10,
              backgroundColor: '#D9D9D9',
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text style={{margin: 10, fontSize: 23, fontWeight: 'bold'}}>
            Chat
          </Text>
          <View style={{borderRadius: 3, marginBottom: 15}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddChat')}
              style={{
                paddingHorizontal: 5,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#1A73E840',
                borderRadius: 4,
              }}>
              <Ionicons
                name="add"
                size={25}
                color="#9AA0A6"
                // style={{marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
            data={NoticeBoardData}
            renderItem={({item}) => (
              <ChatBoardItem
                noticeType={item.noticeType}
                title={item.title}
                text={item.text}
                newMessageCount={item.newMessageCount}
                onPress={() => navigation.navigate('Chat')}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}
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
    zindex: 2,
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
  body: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
});
