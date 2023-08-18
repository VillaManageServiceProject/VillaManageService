import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SpecificButton} from '../components/Button';
import DatePicker from 'react-native-date-picker';
import {RadioButton} from 'react-native-paper';
import Icon from '../components/Icon';
import {requestGET, requestPOST} from '../api';
// import {TouchableOpacity} from 'react-native-gesture-handler';

export const SurveyScreen = ({route}) => {
  const navigation = useNavigation();

  const [postData, setPostData] = useState({
    postId: '',
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
      const response = await requestGET(`/posts/${route.params.postId}`);
      // Handle the response from the signup API
      console.log(response);

      if (response.status === 'success') {
        setPostData(response.data);
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

  const handlePressDelete = async () => {
    try {
      const response = await requestPOST(postData, '/');
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
            <Text style={styles.headerTitle}>설문조사</Text>
          </View>
          <View style={styles.right}>
            <Icon
              IconType="MaterialCommunityIcons"
              IconName="pencil-outline"
              size={20}
              borderRadius={30}
              borderWidth={0}
              //   onPress={this.handleTouchFavorite}
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
              <Text style={styles.title}>{route.params.postId}제목</Text>
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
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={{marginRight: 20}}>진행기간</Text>
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
                <Text>
                  내용dddddddddddddddddddddddddddddddddddddddddddddddddddddddddㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                </Text>
              </View>
            </View>
            <Spacing height={20} />
            <FlatList
              // data={postData}
              data={[
                '옵션1',
                '옵션2',
                '옵션3',
                '옵션4',
                '옵션4',
                '옵션4',
                '옵션4',
                '옵션4',
                '옵션4',
                '옵션4',
                '옵션4',
              ]}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                    padding: 10,
                    margin: 5,
                  }}>
                  <Text>
                    {index + 1}
                    {'    '}
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              style={{width: '100%'}}
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
