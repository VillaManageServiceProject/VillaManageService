import React, {useState, useEffect, useContext} from 'react';
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
import {requestGET, requestPOST, requestPUT} from '../api';
import {UserContext} from '../contexts/UserProvider';
// import {TouchableOpacity} from 'react-native-gesture-handler';

export const SurveyScreen = ({route}) => {
  const navigation = useNavigation();
  const {userInfo} = useContext(UserContext);

  const [postData, setPostData] = useState({
    surveyId: '',
    publisherId: '',
    title: '',
    question: '',
    options: [],
    createdAt: '',
    modifiedAt: '',
    dateStart: '',
    dateEnd: '',
  });
  const [isExpired, setIsExpired] = useState(false);
  const [topVoteOpt, setTopVoteOpt] = useState({index: null, voteCnt: 0});

  useFocusEffect(
    React.useCallback(() => {
      requestGetpost();

      return () => {
        console.log('ScreenOne is unfocused');
      };
    }, []),
  );

  useEffect(() => {
    const today = new Date();
    console.log('hi1');
    if (
      postData.dateStart !== '' &&
      postData.dateEnd !== '' &&
      (formatDate(new Date(postData.dateStart)) > formatDate(today) ||
        formatDate(new Date(postData.dateEnd)) < formatDate(today))
    ) {
      console.log('hi2');
      setIsExpired(true);
    }

    console.log(
      'postData.options: ',
      postData.options.some(option =>
        option.voters.split(',').some(voter => console.log(option)),
      ),
    );
    if (
      postData.options.some(option =>
        option.voters.split(',').some(voter => voter.includes(userInfo.id)),
      )
    ) {
      console.log('hi2');
      setIsExpired(true);
    }
  }, [postData]);

  const formatDate = date => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const requestGetpost = async () => {
    try {
      const response = await requestGET(`/surveys/${route.params.surveyId}`);
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

  const handlePressOption = async optionIdx => {
    try {
      // const updateData = {
      //   surveyId: route.params.surveyId,
      //   optionIdx: optionIdx,
      // };
      const response = await requestPUT(
        `/surveys?surveyId=${route.params.surveyId}&optionIdx=${optionIdx}`,
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

  const handleRenderOptions = (item, index) => {
    if (topVoteOpt.voteCnt < item.voteCnt) {
      setTopVoteOpt({index: index, voteCnt: item.voteCnt});
    }

    return (
      <TouchableOpacity
        disabled={isExpired}
        onPress={() => handlePressOption(index)}
        style={{
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#e0e0e0',
          paddingHorizontal: 10,
          margin: 5,
          backgroundColor:
            item.voteCnt === topVoteOpt.voteCnt ? '#EAEAEA' : null,
        }}>
        <Text
          style={{
            marginRight: 10,
          }}>
          {index + 1}
        </Text>
        <View
          style={{
            width: '95%',
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>{item.option}</Text>
          <View
            style={{
              width: 20,
              alignItems: 'center',
              borderRadius: 30,
              backgroundColor: '#e0e0e0',
            }}>
            <Text>{item.voteCnt}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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
              <Text style={styles.title}>
                {route.params.surveyId}
                {postData.title}
              </Text>
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
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 5,
              }}>
              <Text style={{marginRight: 20}}>진행기간</Text>
              <Text style={{marginRight: 20}}>
                {postData.dateStart} - {postData.dateEnd}
              </Text>
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
                <Text>{postData.question}</Text>
              </View>
            </View>
            <Spacing height={20} />
            <FlatList
              // data={postData}
              data={postData.options}
              renderItem={({item, index}) =>
                // <TouchableOpacity
                //   style={{
                //     borderRadius: 5,
                //     borderWidth: 1,
                //     borderColor: '#e0e0e0',
                //     padding: 10,
                //     margin: 5,
                //   }}>
                //   <Text>
                //     {index + 1}
                //     {'    '}
                //     {item}
                //   </Text>
                // </TouchableOpacity>
                handleRenderOptions(item, index)
              }
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
