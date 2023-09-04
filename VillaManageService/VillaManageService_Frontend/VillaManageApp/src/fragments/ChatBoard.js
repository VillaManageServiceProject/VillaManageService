import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import TextButton from '../components/TextButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatBoardItem from '../components/ChatBoardItem';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {requestGET} from '../api';

export default ChatBoard = ({onToggle}) => {
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const screenHeight = Dimensions.get('window').height;

  const [chatBoardItems, setChatBoardItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      // slideIn();
      requestGetChatBoards();

      return () => {
        console.log('ScreenOne is unfocused');
      };
    }, []),
  );

  useEffect(() => {
    if (onToggle) {
      console.log('slide in');
      slideIn();
    } else slideOut();
    console.log('onToggle: ', onToggle);
  }, [onToggle]);

  const requestGetChatBoards = async () => {
    try {
      const response = await requestGET('/chat/board');

      console.log(response);
      setChatBoardItems(response);
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
  };

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
    }).start();
  };

  const menuTranslateY = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, 200], // Adjust this range as needed to control the slide distance
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // onPanResponderRelease: () => {
      //   // Slide down when the touch is released
      //   slideOut();
      // },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          slideOut();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.container, {transform: [{translateY: menuTranslateY}]}]}>
      {/* <Modal  isVisible={true}> */}
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
            data={chatBoardItems}
            renderItem={({item, index}) => (
              <ChatBoardItem
                // noticeType={item.noticeType}
                IconName={
                  item.participants.length > 1 ? 'account-multiple' : 'account'
                }
                title={
                  item.name === '' ? item.participants.join(',') : item.name
                }
                text={
                  item.recentChatMessage !== null
                    ? item.recentChatMessage.content
                    : 'no message'
                }
                // newMessageCount={item.newMessageCount}
                onPress={() => {
                  console.log('chatBoardItems.id: ', chatBoardItems);
                  navigation.navigate('Chat', {
                    roomInfo: chatBoardItems[index],
                  });
                }}
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
    // </Modal>
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
