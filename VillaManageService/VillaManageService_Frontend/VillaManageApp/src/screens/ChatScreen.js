import React, {useState, useEffect, useRef, useContext} from 'react';
import {TextEncoder, TextDecoder} from 'text-encoding';
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Keyboard,
  TextInput,
} from 'react-native';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {BehaviorSubject} from 'rxjs';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import Swiper from 'react-native-swiper';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import TextButton from '../components/TextButton';
import VillaSideMenu from '../fragments/VillaSideMenu';
import Feather from 'react-native-vector-icons/Feather';
import NoticeBoardItem from '../components/NoticeBoardItem';
import {UserContext} from '../contexts/UserProvider';
import {requestGET} from '../api';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

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
  const {userInfo} = useContext(UserContext);

  const flatListRef = useRef();

  const options = {
    debug: true,
    // protocols: webstomp.VERSIONS.supportedProtocols(),
  };

  // const stompClient = Stomp.client(
  //   'ws://172.30.1.69:8080/chatSession',
  //   options,
  // );

  // BehaviorSubject를 사용하여 채팅 메시지를 저장합니다.
  const otherMessagesSubject = new BehaviorSubject([]);
  const myMessagesSubject = new BehaviorSubject([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user1ChatData, setUser1ChatData] = useState(User1ChatData);
  const [user2ChatData, setUser2ChatData] = useState(User2ChatData);
  // const [combinedChats, setCombinedChats] = useState(
  //   [...user1ChatData, ...user2ChatData].sort(
  //     (a, b) => a.createTime - b.createTime,
  //   ),
  // );
  const [combinedChats, setCombinedChats] = useState([]);
  const [currentInputChat, setCurrentInputChat] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [lastClick, setLastClick] = useState(0);

  // 연결 설정
  // stompClient.onConnect = frame => {
  //   try {
  //     console.log('Connected: ' + frame);

  //     // 채팅방에 가입
  //     stompClient.subscribe('/topic/chat/' + route.params.roomId, message => {
  //       if (message.body) {
  //         const newMessage = JSON.parse(message.body);
  //         otherMessagesSubject.next([
  //           ...otherMessagesSubject.value,
  //           newMessage,
  //         ]);
  //         setCombinedChats(otherMessagesSubject);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // 연결 에러 처리
  // stompClient.onStompError = frame => {
  //   console.error('Broker reported error: ' + frame.headers['message']);
  //   console.error('Additional details: ' + frame.body);
  // };

  useFocusEffect(
    React.useCallback(() => {
      //       const socket = new SockJS('http://localhost:8080/chat');
      // const stompClient = Stomp.over(socket);
      // stompClient.connect({}, function(frame) {
      //     stompClient.subscribe('/topic/messages', function(messageOutput) {
      //         // Handle real-time messages
      //     });
      // });
      requestGetChats();

      // const socket = new SockJS('http://172.30.1.69:8080/chatSession');

      // const client = Stomp.over(socket);
      const client = Stomp.over(
        () => new SockJS('http://172.30.1.69:8080/chatSession'),
      );

      // Configure for auto-reconnect
      client.reconnect_delay = 5000; // delay in milliseconds

      const connectToWebSocket = () => {
        client.connect({}, () => {
          setStompClient(client);

          client.subscribe(
            '/topic/chat/' + route.params.roomInfo.id,
            message => {
              console.log('Received message:', message.body);
              // otherMessagesSubject.next([
              //   ...otherMessagesSubject.value,
              //   message.body,
              // ]);
              setCombinedChats(prev => [...prev, JSON.parse(message.body)]);
            },
          );
        });
      };

      connectToWebSocket();

      console.log('route.params.roomId: ', route.params.roomInfo.id);

      // try {
      //   // 연결 시작
      //   stompClient.activate();
      // } catch (error) {
      //   console.log(error);
      // }

      return () => {
        if (stompClient) {
          stompClient.disconnect();
        }
      };
    }, []),
  );

  useEffect(() => {
    // const keyboardDidShowListener = Keyboard.addListener(
    //   'keyboardDidShow',
    //   scrollToBottom,
    // );
    console.log('combinedChats: ', combinedChats);
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
    // setCombinedChats(
    //   [...user1ChatData, ...user2ChatData].sort(
    //     (a, b) => a.createTime - b.createTime,
    //   ),
    // );
  }, [isFocused, combinedChats]);

  // const handleSendChat = () => {
  //   setUser1ChatData(prev => [
  //     ...prev,
  //     {
  //       writer: 'user1',
  //       text: currentInputChat,
  //       createTime: new Date(),
  //     },
  //   ]);
  // };

  // 채팅 메시지를 보냅니다.
  // const handleSendChat = messageContent => {
  //   const message = {
  //     content: messageContent,
  //     sender: userInfo.id,
  //     // type: 'CHAT',
  //   };
  //   stompClient.publish({
  //     destination: '/app/chat/' + route.params.roomId + '/sendMessage',
  //     body: JSON.stringify(message),
  //   });
  //   myMessagesSubject.next([...myMessagesSubject.value, message]);
  // };

  const requestGetChats = async () => {
    try {
      // console.log(
      //   'pre-request: ',
      //   '/chat/room/' + route.params.roomId + '/pre',
      // );
      const response = await requestGET(
        '/chat/room/' + route.params.roomInfo.id + '/pre',
      );

      console.log('pre-chats: ', response);
      setCombinedChats(response.sort((a, b) => a.createdAt - b.createdAt));
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

  const handleSendChat = () => {
    const now = new Date().getTime();
    if (now - lastClick > 2000) {
      if (stompClient) {
        // const messageContent = JSON.stringify({
        //   content: message,
        //   sender: userInfo.id,
        //   type: 'TEXT',
        // });

        const messageContent = {
          content: currentInputChat,
          sender: userInfo.id,
          // type: 'TEXT',
        };

        console.log('messageContent: ', messageContent);

        stompClient.send(
          '/app/chat/' + route.params.roomInfo.id,
          {},
          JSON.stringify(messageContent),
        );
        // setMessage('');
      }
    }
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
            <Text style={styles.headerTitle}>{route.params.roomInfo.name}</Text>
            <Text>{route.params.roomInfo.participants.join(',')}</Text>
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
                {item.sender === userInfo.id ? (
                  // <View
                  //   style={{
                  //     flexDirection: 'column',
                  //     justifyContent: 'flex-end',
                  //     alignItems: 'flex-end',
                  //   }}>
                  //   <Text
                  //     style={{
                  //       // padding: 5,
                  //       paddingHorizontal: 15,
                  //     }}>
                  //     {item.sender}
                  //   </Text>
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
                      }}>{`${new Date(item.createdAt)
                      .getHours()
                      .toString()
                      .padStart(2, '0')}:${new Date(item.createdAt)
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
                      {item.content}
                    </Text>
                  </View>
                ) : (
                  // </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      padding: 2,
                    }}>
                    <Text
                      style={{
                        // padding: 5,
                        paddingHorizontal: 5,
                      }}>
                      {item.sender}
                    </Text>
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
                        {item.content}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          paddingHorizontal: 5,
                        }}>{`${new Date(item.createdAt)
                        .getHours()
                        .toString()
                        .padStart(2, '0')}:${new Date(item.createdAt)
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')}`}</Text>
                    </View>
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
