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
import {requestGET, requestDelete, requestPUT} from '../api';
import {UserContext} from '../contexts/UserProvider';
import {formatDate} from '../utils/formatters';
import TextButton from './TextButton';

export default props => {
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

  useEffect(() => {
    // console.log('userInfo: ', userInfo);
    if (
      props.surveyData.options.some(option =>
        option.voters.split(',').some(voter => voter.includes(userInfo.id)),
      )
    ) {
      console.log('props.surveyData: ', props.surveyData.title);
      setIsExpired(true);
    }
  }, [props.surveyData]);

  const handlePressOption = async optionIdx => {
    try {
      // const updateData = {
      //   surveyId: route.params.surveyId,
      //   optionIdx: optionIdx,
      // };
      if (!isExpired) {
        const response = await requestPUT(
          `/surveys?surveyId=${props.surveyData.surveyId}&optionIdx=${optionIdx}`,
        );
        // Handle the response from the signup API
        // console.log(response);

        // if (response.status === 'success') {
        // setPostData(response);
        // }
        props.setSurveyRender(prev => !prev);
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
    <View style={{flex: 1}}>
      <View
        style={{
          //   flex: 1,
          //   width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
          //   margin: 5,
        }}>
        <TextButton
          text={props.surveyData.title}
          onPress={() => {
            navigation.navigate('Survey', {
              surveyId: props.surveyData.surveyId,
            });
          }}
        />
      </View>
      <View
        style={{
          //   flex: 1,
          //   width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          //   margin: 5,
        }}>
        <View
          style={{
            width: '100%',
            borderRadius: 10,
            textAlignVertical: 'top',
          }}>
          <Text>{props.surveyData.question}</Text>
        </View>
      </View>
      <Spacing height={10} />
      <FlatList
        // data={postData}
        data={props.surveyData.options}
        renderItem={({item, index}) => handleRenderOptions(item, index)}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{width: '100%', flex: 1}}
      />
    </View>
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
