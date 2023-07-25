import React, {useState, useEffect, useRef} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Keyboard,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import Swiper from 'react-native-swiper';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import TextButton from '../components/TextButton';
import VillaSideMenu from '../fragments/VillaSideMenu';
import Feather from 'react-native-vector-icons/Feather';
import NoticeBoardItem from '../components/NoticeBoardItem';

let User1ChatData = [
  {
    writer: 'user1',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:21:17+09:00'),
  },
  {
    writer: 'user1',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:25:20+09:00'),
  },
  {
    writer: 'user1',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:25:20+09:00'),
  },
  {
    writer: 'user1',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:25:20+09:00'),
  },
];

let User2ChatData = [
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:18+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
  {
    writer: 'user2',
    text: '최근 챗',
    createTime: new Date('2023-07-24T10:22:19+09:00'),
  },
];

export const ChatScreen = ({route}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const flatListRef = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user1ChatData, setUser1ChatData] = useState(User1ChatData);
  const [user2ChatData, setUser2ChatData] = useState(User2ChatData);
  const [combinedChats, setCombinedChats] = useState(
    [...user1ChatData, ...user2ChatData].sort(
      (a, b) => a.createTime - b.createTime,
    ),
  );
  const [currentInputChat, setCurrentInputChat] = useState('');

  useEffect(() => {
    // const keyboardDidShowListener = Keyboard.addListener(
    //   'keyboardDidShow',
    //   scrollToBottom,
    // );
    if (isFocused) {
      // Perform your specific action when the screen is focused/opened
      // console.log(combinedChats.length);
      // Your custom action goes here...
      // console.log('hi4');
      // setCombinedChats(
      //   [...user1ChatData, ...user2ChatData].sort(
      //     (a, b) =>d a.createTime - b.createTime,
      //   ),
      // );

      scrollToBottom;
    }
    // return () => {
    //   keyboardDidShowListener.remove();
    // };
    setCombinedChats(
      [...user1ChatData, ...user2ChatData].sort(
        (a, b) => a.createTime - b.createTime,
      ),
    );
  }, [isFocused, user1ChatData]);

  const handleSendChat = () => {
    setUser1ChatData(prev => [
      ...prev,
      {
        writer: 'user1',
        text: currentInputChat,
        createTime: new Date(),
      },
    ]);
  };

  const scrollToBottom = () => {
    if (flatListRef.current && combinedChats.length > 0) {
      flatListRef.current.scrollToIndex({index: combinedChats.length - 1});
    }
  };

  const toggleSideMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.foreground}>
        <View style={styles.header}>
          <View style={styles.left} />
          <View style={styles.center}>
            {/* <Text style={styles.headerTitle}>{route.param.perticipants}</Text> */}
            <Text style={styles.headerTitle}>참여자</Text>
          </View>
          <View style={styles.right}>
            <Icon
              IconType="Ionicons"
              IconName="menu"
              borderRadius={30}
              onPress={toggleSideMenu}
            />
          </View>
        </View>

        <View style={styles.body}>
          {/* <KeyboardAvoidingView
          style={styles.body}
          behavior="padding"
          keyboardVerticalOffset={Platform.select({ios: 64, android: 50})}> */}
          <FlatList
            ref={flatListRef}
            data={combinedChats}
            renderItem={({item}) => (
              <View style={{paddingHorizontal: 20}}>
                {item.writer === 'user1' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        paddingHorizontal: 5,
                      }}>{`${item.createTime
                      .getHours()
                      .toString()
                      .padStart(2, '0')}:${item.createTime
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')}`}</Text>
                    <Text
                      style={{
                        padding: 5,
                        paddingHorizontal: 15,
                        borderRadius: 30,
                        backgroundColor: '#1A73E840',
                      }}>
                      {item.text}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-end',
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{
                        padding: 5,
                        paddingHorizontal: 15,
                        borderRadius: 30,
                        backgroundColor: 'white',
                      }}>
                      {item.text}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        paddingHorizontal: 5,
                      }}>{`${item.createTime
                      .getHours()
                      .toString()
                      .padStart(2, '0')}:${item.createTime
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')}`}</Text>
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            onContentSizeChange={scrollToBottom}
            onScrollToIndexFailed={info =>
              console.warn('Scroll to index failed:', info)
            }
            // initialScrollIndex={1}
            style={{width: '100%'}}
          />
          {/* </KeyboardAvoidingView> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            paddingBottom: 10,
            backgroundColor: 'white',
          }}>
          <TextInput
            onPressIn={scrollToBottom}
            onChangeText={text => setCurrentInputChat(text)}
            style={{
              flex: 9,
              marginHorizontal: 5,
              fontSize: 17,
              // borderWidth: 1,
              // borderRadius: 10,
            }}
          />
          <Icon
            IconType="Ionicons"
            IconName="send"
            borderRadius={30}
            onPress={handleSendChat}
          />
        </View>
      </View>
      {isMenuOpen && <VillaSideMenu onClose={toggleSideMenu} />}
    </SafeAreaView>
  );
};

const Spacing = ({height}) => <View style={{height}} />;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    // backgroundColor: "red",
  },
  foreground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    // backgroundColor: "red",
  },
  header: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    zIndex: 2,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    zIndex: 2,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 10,
    // paddingHorizontal: 20,
    flexDirection: 'column',
  },
  notificationWrapper: {
    height: 30,
    borderRadius: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'yellow',
  },
  voteWrapper: {
    height: 250,
    borderRadius: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'yellow',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 20,
    backgroundColor: 'green',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'green',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'green',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  calendar: {
    flex: 1,
    width: '100%',
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  vote: {
    // flex: 1,
    width: '100%',
    // padding: 20,
    borderRadius: 25,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'red',
  },
  separator: {
    backgroundColor: '#e0e0e0',
    margin: 5,
    height: 1,
  },
});
