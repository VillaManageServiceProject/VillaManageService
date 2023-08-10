import React, {useState, useContext} from 'react';
import {UserContext} from '../context/UserProvider';
import {StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SpecificButton} from '../components/Button';
import DatePicker from 'react-native-date-picker';
import {RadioButton} from 'react-native-paper';
import {CommonButton} from '../components/Button';
import {checkSession, requestPOST} from '../api';

export const AddNoticeScreen = ({route}) => {
  const navigation = useNavigation();
  const {userInfo} = useContext(UserContext);

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [isDateStartPickerOpened, setDateStartPickerOpen] = useState(false);
  const [isDateEndPickerOpened, setDateEndPickerOpen] = useState(false);
  const [noticeChecked, setNoticeChecked] = useState('Notice');

  const [postData, setPostData] = useState({
    // publisherId: userInfo.id,
    // address: userInfo.address,
    title: '',
    // postDate: new Date().toISOString().substring(0, 10),
    notification: '',
    // relatedMemberId: '',
    content: '',
    // dateStart: new Date().toISOString().substring(0, 10),
    // dateEnd: new Date().toISOString().substring(0, 10),
  });

  const handleFormSubmit = async () => {
    try {
      const response = await requestPOST(postData, '/posts');
      // const response = await checkSession();
      // Handle the response from the signup API
      console.log(response);

      if (response.status === 'success') {
        navigation.navigate('NoticeBoard');
      }
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
            <Text style={styles.headerTitle}>새로운 게시글</Text>
          </View>
          <View style={styles.right} />
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
              <Text style={{marginRight: 20}}>제목</Text>
              <TextInput
                onChangeText={text =>
                  setPostData(prev => ({...prev, title: text}))
                }
                style={{
                  width: '85%',
                  height: 45,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#DFE1E5',
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={{marginRight: 20}}>공지</Text>
              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: 'column',
                  // backgroundColor: 'blue',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 20,
                    // backgroundColor: 'red',
                  }}>
                  <Text style={{marginRight: 5}}>중요</Text>
                  <RadioButton
                    value="Notice"
                    status={
                      noticeChecked === 'Notice' ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      setNoticeChecked('Notice');
                      setPostData(prev => ({...prev, notification: true}));
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 20,
                  }}>
                  <Text style={{marginRight: 5}}>일반</Text>
                  <RadioButton
                    value="Common"
                    status={
                      noticeChecked === 'Common' ? 'checked' : 'unchecked'
                    }
                    onPress={() => {
                      setNoticeChecked('Common');
                      setPostData(prev => ({...prev, notification: true}));
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 5,
                // backgroundColor: 'blue',
              }}>
              <Text>일정</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <SpecificButton
                  width={120}
                  height={40}
                  fontSize={14}
                  text={dateStart.toISOString().substring(0, 10)}
                  onPress={() => setDateStartPickerOpen(true)}
                />
                <DatePicker
                  modal
                  open={isDateStartPickerOpened}
                  date={dateStart}
                  onConfirm={dateStart => {
                    setDateStartPickerOpen(false);
                    setDateStart(dateStart);
                    // setPostData(prev => ({
                    //   ...prev,
                    //   dateStart: date.toISOString().substring(0, 10),
                    // }));
                  }}
                  onCancel={() => {
                    setDateStartPickerOpen(false);
                  }}
                  mode="date"
                  textColor="#9AA0A6"
                />
                <Text style={{marginHorizontal: 5}}>~</Text>
                <SpecificButton
                  width={120}
                  height={40}
                  fontSize={14}
                  text={dateEnd.toISOString().substring(0, 10)}
                  onPress={() => setDateEndPickerOpen(true)}
                />
                <DatePicker
                  modal
                  open={isDateEndPickerOpened}
                  date={dateEnd}
                  onConfirm={dateEnd => {
                    setDateEndPickerOpen(false);
                    setDateEnd(dateEnd);
                    // setPostData(prev => ({
                    //   ...prev,
                    //   dateEnd: date.toISOString().substring(0, 10),
                    // }));
                  }}
                  onCancel={() => {
                    setDateEndPickerOpen(false);
                  }}
                  mode="date"
                  textColor="#9AA0A6"
                />
              </View>
            </View>
            {/* <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={{marginRight: 20}}>알림</Text>
              <TextInput
                onChangeText={text =>
                  setPostData(prev => ({...prev, relatedMemberId: text}))
                }
                style={{
                  width: '85%',
                  height: 45,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#DFE1E5',
                }}
              />
            </View> */}
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
              <TextInput
                multiline
                placeholder="내용 입력"
                onChangeText={text =>
                  setPostData(prev => ({...prev, content: text}))
                }
                style={{
                  width: '100%',
                  height: 300,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#DFE1E5',
                  textAlignVertical: 'top',
                }}
              />
            </View>
            <Spacing height={20} />
            <CommonButton
              fontSize={15}
              text="올리기"
              onPress={handleFormSubmit}
            />
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
    // backgroundColor: 'red',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
