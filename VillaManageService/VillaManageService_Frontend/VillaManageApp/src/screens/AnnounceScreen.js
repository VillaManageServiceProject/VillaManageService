import React, {useState, useContext} from 'react';
import {UserContext} from '../contexts/UserProvider';
import {StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SpecificButton} from '../components/Button';
import DatePicker from 'react-native-date-picker';
import {RadioButton} from 'react-native-paper';
import Icon from '../components/Icon';
import {requestDelete, requestGET} from '../api';

export const AnnounceScreen = ({route}) => {
  const navigation = useNavigation();
  const {userInfo} = useContext(UserContext);

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [isDateStartPickerOpened, setDateStartPickerOpen] = useState(false);
  const [isDateEndPickerOpened, setDateEndPickerOpen] = useState(false);
  const [noticeChecked, setNoticeChecked] = useState('Notice');

  const [postData, setPostData] = useState({
    announceId: '',
    publisherId: '',
    title: '',
    content: '',
    notification: '',
    createdAt: '',
    modifiedAt: '',
    dateStart: '',
    dateEnd: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      requestGetpost();

      return () => {
        console.log('ScreenOne is unfocused');
      };
    }, []),
  );

  const requestGetpost = async () => {
    try {
      const response = await requestGET(
        `/announces/${route.params.announceId}`,
      );
      // Handle the response from the signup API
      console.log(response);

      // if (response.status === 'success') {
      setPostData(response);
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

  const handlePressUpdate = () => {
    if (userInfo.id === postData.publisherId) {
      navigation.navigate('EditAnnounce', {
        announceId: route.params.announceId,
        postData,
      });
    }
  };

  const handlePressDelete = async () => {
    try {
      if (userInfo.id === postData.publisherId) {
        const response = await requestDelete(
          `/announces/${route.params.announceId}`,
        );
        // Handle the response from the signup API
        console.log(response);

        // if (response.status === 'success') {
        navigation.goBack();
      }
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
    <SafeAreaView style={styles.container}>
      <View style={styles.foreground}>
        <View style={styles.header}>
          <View style={styles.left} />

          <View style={styles.center}>
            <Text style={styles.headerTitle}>게시글</Text>
          </View>
          <View style={styles.right}>
            <Icon
              IconType="MaterialCommunityIcons"
              IconName="pencil-outline"
              size={20}
              borderRadius={30}
              borderWidth={0}
              onPress={handlePressUpdate}
            />
            <Icon
              IconType="MaterialCommunityIcons"
              IconName="delete-empty-outline"
              size={20}
              borderRadius={30}
              borderWidth={0}
              onPress={handlePressDelete}
            />
          </View>
        </View>
        <ScrollView>
          <View style={styles.body}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={styles.title}>{postData.title}</Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={{marginRight: 20}}>게시자</Text>
              <Text style={{marginRight: 20}}>{postData.publisherId}</Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={{marginRight: 20}}>게시일</Text>
              <Text style={{marginRight: 20}}>{postData.createdAt}</Text>
            </View>

            <Spacing height={20} />
            {/* <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text>알림</Text>
            </View> */}
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <View
                style={{
                  width: '100%',
                  borderRadius: 10,
                  textAlignVertical: 'top',
                }}>
                <Text>{postData.content}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const Spacing = ({height}) => <View style={{height}} />;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
  },
  foreground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'yellow',
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
    marginVertical: 25,
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
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 40,
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
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
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
  separator: {
    backgroundColor: '#e0e0e0',
    marginRight: 20,
    width: 1,
    height: 55,
  },
});
