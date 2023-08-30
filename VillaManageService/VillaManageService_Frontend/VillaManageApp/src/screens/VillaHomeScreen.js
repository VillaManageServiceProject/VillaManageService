import React, {useState, useContext, useEffect, useRef} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import Swiper from 'react-native-swiper';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import TextButton from '../components/TextButton';
import VillaSideMenu from '../fragments/VillaSideMenu';
import {requestGET} from '../api';
import {VillaContext} from '../contexts/VillaProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Survey from '../components/Survey';
import {increaseDateByOneDay} from '../utils/calc';
import {generateRandomHueColor, clearGeneratedColors} from '../utils/generator';
import {Button} from 'react-native-paper';
// import {TouchableOpacity} from 'react-native-web';
import _ from 'lodash';

LocaleConfig.locales['fr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';

// function SettingScreen({navigation}) {
//   return (
//     <View>
//       <Text>Setting</Text>
//       <Button title="뒤로가기" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

function LoadingAnimation() {
  return (
    <View style={styles.indicatorWrapper}>
      <ActivityIndicator size="large" />
      <Text style={styles.indicatorText}>Loading...</Text>
    </View>
  );
}

export const VillaHomeScreen = ({route}) => {
  const navigation = useNavigation();
  const {
    villaId,
    villaName,
    setVillaId,
    setVillaHouses,
    setVillaAddress,
    setVillaDetail,
    setVillaLocalCC,
    setVillaBM,
  } = useContext(VillaContext);

  const [loading, setLoading] = useState({
    announceUI: true,
    calendarUI: true,
    surveyUI: true,
  });
  const [selected, setSelected] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [announcePostData, setAnnouncePostData] = useState({
    COMMUNITY_CENTER: [],
    BUILDING_MANAGER: [],
    LANDLORD: [],
    RESIDENT: [],
  });
  const [surveyPostData, setSurveyPostData] = useState([]);
  const [combinedPosts, setCombinedPosts] = useState([]);
  const [calendarPeriods, setCalendarPeriods] = useState([]);
  const [periodMap, setPeriodMap] = useState({});
  // let periodMap = {};
  const [markedDates, setMarkedDates] = useState({});
  // let markedDates = {};
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [selectedPeriods, setSelectedPeriods] = useState([]);
  // let selectedPeriods = [];
  const [selectedPeriod, setSelectedPeriod] = useState({});
  const [surveyRender, setSurveyRender] = useState(false);
  const prevCalendarPeriodsRef = useRef();
  const [selectedPostBackgroundColor, setSelectedPostBackgroundColor] =
    useState('white');
  const [selectedPostIdx, setSelectedPostIdx] = useState(null);
  const [announceSwiperIndex, setAnnounceSwiperIndex] = useState(0);

  // const markedDates = {
  //   '2023-08-01': {
  //     periods: [{startingDay: true, endingDay: false, color: '#50cebb'}],
  //   },
  //   '2023-08-02': {
  //     periods: [
  //       {startingDay: false, endingDay: false, color: '#50cebb'},
  //       {startingDay: true, endingDay: false, color: '#70d7c7'},
  //     ],
  //   },
  //   '2023-08-03': {
  //     periods: [
  //       {startingDay: false, endingDay: true, color: '#50cebb'},
  //       {startingDay: false, endingDay: true, color: '#70d7c7'},
  //     ],
  //   },
  // };

  useFocusEffect(
    React.useCallback(() => {
      setLoading({
        announceUI: true,
        calendarUI: true,
        surveyUI: true,
      });
      // setCalendarPeriods([]);

      requestGetVillaInfo();
      requestGetAnnouncePost();
      requestGetSurveyPost();
      requestGetPeriods();

      setIsMenuOpen(false);

      // console.log('villaName: ', villaName);
      // console.log('villaId: ', villaId);

      return () => {
        console.log('ScreenOne is unfocused');
      };
    }, []),
  );

  // const setCalendarSchedule = () => {
  useEffect(() => {
    // if (!_.isEqual(calendarPeriods, prevCalendarPeriodsRef.current)) {
    const newMarkedDates = {};
    const newPeriodMap = {};

    // clearGeneratedColors();

    console.log('start');

    // const calendarPeriodsCopy = calendarPeriods;
    if (calendarPeriods) {
      calendarPeriods.forEach((period, index) => {
        console.log('startperiod: ', period);
        let currentDate = period.dateStart;
        const periodId = period.announceId || period.surveyId;
        let periodIdx = -1;
        const periodPostType = Object.keys(period)
          .filter(key => key.includes('Id'))[0]
          .split('I')[0];

        let searchPeriodIdx = 0;
        const oneDayMaxPeriod = 10;

        const periodColor = generateRandomHueColor(oneDayMaxPeriod);
        // const periodColor = 'blue';

        // console.log('currentDate: ', currentDate);
        while (searchPeriodIdx < oneDayMaxPeriod) {
          currentDate = period.dateStart;
          let isFull = false;

          while (currentDate <= period.dateEnd) {
            // if(newPeriodMap[currentDate]) {
            //   isFull = true;
            // }

            if (
              newMarkedDates[currentDate] &&
              newMarkedDates[currentDate].periods[searchPeriodIdx]
            ) {
              if (
                newMarkedDates[currentDate].periods[searchPeriodIdx].color !==
                'white'
              ) {
                isFull = true;
              }
              if (isFull) {
                break;
              }
            }

            currentDate = increaseDateByOneDay(currentDate);
          }
          if (!isFull) {
            periodIdx = searchPeriodIdx;
            break;
          }
          searchPeriodIdx = searchPeriodIdx + 1;
        }

        if (periodIdx > -1) {
          currentDate = period.dateStart;
          while (currentDate <= period.dateEnd) {
            if (
              !newPeriodMap[currentDate] ||
              !Array.isArray(newPeriodMap[currentDate])
            ) {
              newPeriodMap[currentDate] = [];
            }
            newPeriodMap[currentDate].push({
              id: periodId,
              title: period.title,
              color: periodColor,
              postType: periodPostType,
            });

            if (!newMarkedDates[currentDate]) {
              newMarkedDates[currentDate] = {periods: []};
            }

            const isStartingDay = currentDate === period.dateStart;
            const isEndingDay = currentDate === period.dateEnd;

            while (newMarkedDates[currentDate].periods.length < periodIdx) {
              newMarkedDates[currentDate].periods.push({
                startingDay: isStartingDay,
                endingDay: isEndingDay,
                color: 'white',
                // periodId,
              });
            }

            newMarkedDates[currentDate].periods[periodIdx] = {
              startingDay: isStartingDay,
              endingDay: isEndingDay,
              color: periodColor,
              // periodId,
            };

            currentDate = increaseDateByOneDay(currentDate);
            // console.log('newMarkedDates: ', newMarkedDates);
          }
        }
      });

      // console.log('newMarkedDates: ', newMarkedDates);
      // markedDates = newMarkedDates;
      // periodMap = newPeriodMap;
      console.log('done');
      setMarkedDates(newMarkedDates);
      setPeriodMap(newPeriodMap);

      prevCalendarPeriodsRef.current = calendarPeriods;
    }
    // }
    // setLoading(prevLoading => ({...prevLoading, calendarUI: false}));
    setTimeout(() => {
      setLoading(prevLoading => ({...prevLoading, calendarUI: false}));
    }, 2000);
  }, [calendarPeriods]);

  useEffect(() => {
    requestGetSurveyPost();
  }, [surveyRender]);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnounceSwiperIndex(prevIndex => (prevIndex + 1) % 2);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const requestGetVillaInfo = async () => {
    try {
      const response = await requestGET(`/villa/${villaId}`);

      setVillaState(response);
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

  const requestGetAnnouncePost = async () => {
    try {
      const roles = Object.keys(announcePostData).join(',');
      // console.log(roles);
      const response = await requestGET(`/announces/board/role/${villaId}`, {
        roles,
      });
      // Handle the response from the signup API
      // console.log(response);

      // if (response.status === 'success') {

      setAnnouncePostData(response);
      setCombinedPosts(
        Object.values(response).reduce((acc, val) => acc.concat(val), []),
      );
      // console.log(
      //   'combined: ',
      //   Object.values(announcePostData).reduce(
      //     (acc, val) => acc.concat(val),
      //     [],
      //   ),
      // );
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

  const requestGetSurveyPost = async () => {
    try {
      const response = await requestGET(`/surveys/board/vote/${villaId}`);
      // Handle the response from the signup API
      // console.log(response);

      // if (response.status === 'success') {

      setSurveyPostData(response);
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

  const requestGetPeriods = async () => {
    try {
      // const surveyPeriodsResponse = await requestGET(
      //   `/surveys/board/period/${villaId}`,
      // );
      // // Handle the response from the signup API
      // console.log('surveyPeriodsResponse: ', surveyPeriodsResponse);

      // const announcePeriodsResponse = await requestGET(
      //   `/announces/board/period/${villaId}`,
      // );
      // // Handle the response from the signup API
      // console.log('announcePeriodsResponse: ', announcePeriodsResponse);

      const [surveyPeriodsResponse, announcePeriodsResponse] =
        await Promise.all([
          requestGET(`/surveys/board/period/${villaId}`),
          requestGET(`/announces/board/period/${villaId}`),
        ]);

      console.log('surveyPeriodsResponse: ', surveyPeriodsResponse);
      console.log('announcePeriodsResponse: ', announcePeriodsResponse);

      setCalendarPeriods([
        ...announcePeriodsResponse,
        ...surveyPeriodsResponse,
      ]);

      // setCalendarSchedule();
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

  const setVillaState = currVilla => {
    console.log('currVilla: ', currVilla);
    setVillaId(currVilla.id);
    setVillaAddress(currVilla.address);
    setVillaDetail(JSON.parse(currVilla.villaInfo).body.items.item[0]);
    setVillaHouses(currVilla.houses);
    setVillaLocalCC(currVilla.localCC);
    setVillaBM(currVilla.buildingManagers);
  };

  const selectVillaName = address => {
    const addressElements = address.split(' ');
    return addressElements[addressElements.length - 1];
  };

  const toggleSideMenu = () => {
    // console.log(navigation.getState());
    setIsMenuOpen(prev => !prev);
  };

  const navigationReset = () => {
    // console.log('navigationReset');
    navigation.reset({
      index: 0,
      routes: [{name: 'UnLoginedMap'}],
    });
  };

  // const handleDayPress = day => {
  //   const dateStr = day.dateString; // Format: "YYYY-MM-DD"
  //   setSelected(dateStr);
  //   if (markedDates[dateStr]) {
  //     Alert.alert('You clicked a marked date!', `Date: ${dateStr}`);
  //   }
  // };

  // 선택한 날짜에 해당하는 이벤트 ID를 찾고 작업을 수행합니다.
  const handleDayPress = day => {
    const periods = periodMap[day.dateString];
    // console.log('periods: ', periods);

    if (periods !== null) {
      // selectedPeriods = periods;
      setSelectedPeriods(periods);
      setIsCalendarModalVisible(true);
    }
  };

  const handleSelectModalPost = (period, index) => {
    const originalColor = period.color;
    const newLightness = '80%';
    const parts = originalColor.split(',');
    parts[2] = ` ${newLightness})`;
    const newColor = parts.join(',');
    setSelectedPostIdx(index);
    setSelectedPostBackgroundColor(newColor);
    setSelectedPeriod(period);
  };

  const handleModalClose = () => {
    setSelectedPostIdx(null);
    setSelectedPostBackgroundColor('');
    setSelectedPeriod({});
    setIsCalendarModalVisible(false);
  };

  const onAnnounceLayout = () => {
    setLoading(prevLoading => ({...prevLoading, announceUI: false}));
  };

  const onSurveyLayout = () => {
    setLoading(prevLoading => ({...prevLoading, surveyUI: false}));
  };

  // {periods.map((period, index) => {
  //   <TouchableOpacity>
  //     {/* <View style={{ flex: 1 }}> */}

  //     <Text>{period.id}</Text>
  //     <Text>{period.title}</Text>
  //     {/* </View> */}
  //   </TouchableOpacity>;
  // })}

  // {
  //   const periodId = periodMap[day.dateString];
  //   if (periodId) {
  //     console.log(`Event ID: ${periodId}`);
  //     // 이벤트 ID를 사용해 추가 작업을 수행합니다.
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.foreground}>
        <View style={styles.header}>
          <View style={styles.left}>
            <Icon
              IconType="AntDesign"
              IconName="left"
              borderRadius={30}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.headerTitle}>{villaName}</Text>
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
        <ScrollView>
          <View style={styles.body}>
            <View
              onLayout={onAnnounceLayout}
              style={{width: 320, marginVertical: 30}}>
              <Swiper
                autoplay
                autoplayTimeout={5}
                showsHorizontalScrollIndicator={false}
                style={styles.notificationWrapper}
                showsButtons={false}
                dot={
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,.2)',
                      width: 5,
                      height: 5,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3,
                    }}
                  />
                }
                activeDot={
                  <View
                    style={{
                      backgroundColor: '#000',
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3,
                    }}
                  />
                }
                paginationStyle={{
                  bottom: -23,
                  // left: null,
                  // right: 10,
                }}
                loop>
                {combinedPosts.length !== 0 ? (
                  combinedPosts.map((item, index) => (
                    <View key={index} style={styles.slide2}>
                      <TextButton
                        IconType="AntDesign"
                        IconName="exclamationcircle"
                        IconSize={15}
                        IconColor="#FF383890"
                        width={320}
                        justifyContent="flex-start"
                        text={item.title}
                        onPress={() => {
                          navigation.navigate('Announce', {
                            announceId: item.announceId,
                          });
                        }}
                      />
                      {/* <AntDesign
                      name="exclamationcircle"
                      size={15}
                      color="#FF383890"
                      style={{marginRight: 15}}
                    />
                    <Text style={styles.text}>{item.title}</Text> */}
                    </View>
                  ))
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <Text>※ 공지사항이 없습니다.</Text>
                  </View>
                )}
              </Swiper>
            </View>
            <Spacing height={15} />

            {/* <Calendar
              onDayPress={day => {
                setSelected(day.dateString);
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange',
                },
              }}
            /> */}
            <View style={styles.calendar}>
              <Calendar
                // onDayPress={day => {
                //   setSelected(day.dateString);
                // }}
                // markedDates={{
                //   [selected]: {
                //     selected: true,
                //     disableTouchEvent: true,
                //     selectedDotColor: 'orange',
                //   },
                // }
                // current={'2023-08-01'}
                markingType={'multi-period'}
                markedDates={markedDates}
                onDayPress={handleDayPress}
                // markedDates={{
                //   '2023-08-15': {startingDay: true, color: 'green'},
                //   '2023-08-16': {color: 'green', textColor: 'white'},
                //   '2023-08-17': {color: 'green', textColor: 'white'},
                //   '2023-08-18': {endingDay: true, color: 'green'},
                // }}
                // markingType={'period'}
              />
            </View>
            <Spacing height={25} />
            <View style={styles.vote} onLayout={onSurveyLayout}>
              <TextButton
                IconType="MaterialCommunityIcons"
                IconName="vote"
                paddingHorizontal={10}
                text="진행중인 설문조사"
                onPress={() => navigation.navigate('SurveyBoard')}
              />

              <View
                style={{
                  flex: 1,
                  borderRadius: 30,
                  paddingVertical: 10,
                }}>
                <Swiper
                  showsButtons
                  style={styles.voteWrapper}
                  dot={
                    <View
                      style={{
                        backgroundColor: 'rgba(0,0,0,.2)',
                        width: '10%',
                        height: 3,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3,
                      }}
                    />
                  }
                  activeDot={
                    <View
                      style={{
                        backgroundColor: '#000',
                        width: '10%',
                        height: 5,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3,
                      }}
                    />
                  }
                  paginationStyle={{
                    bottom: 330,
                    // left: null,
                    // right: 10,
                  }}
                  loop>
                  {/* <View> */}
                  {surveyPostData.length !== 0 ? (
                    surveyPostData.map((item, index) => (
                      <View key={index} style={styles.slide1}>
                        <Survey
                          surveyData={item}
                          setSurveyRender={setSurveyRender}
                        />
                      </View>
                    ))
                  ) : (
                    <View style={{alignItems: 'center'}}>
                      <Text>※ 설문조사가 없습니다.</Text>
                    </View>
                  )}
                </Swiper>
              </View>
              {/* // <View style={{width: '100%', backgroundColor: 'blue'}}>
                    //   <Text style={{backgroundColor: 'red'}}>{item.title}</Text>
                    //   <Spacing height={5} />
                    //   <Text style={styles.text}>{item.question}</Text>
                    //   <Spacing height={5} />
                    //   {item.options.map((innerItem, innerIndex) => (
                    //     <View
                    //       key={innerIndex}
                    //       style={{
                    //         borderWidth: 1,
                    //         borderRadius: 10,
                    //         borderColor: 'gray',
                    //         backgroundColor: '#9AA0A6',
                    //         marginVertical: 10,
                    //       }}>
                    //       <TextButton
                    //         text={innerItem.option}
                    //         fontColor="#1F2429"
                    //       />
                    //     </View>
                    //   ))}
                    // </View> */}
              {/* <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <TextButton
                  text="게시글"
                  fontColor="white"
                  backgroundColor="black"
                />
              </View> */}
            </View>
          </View>
        </ScrollView>
      </View>
      {isMenuOpen && (
        <VillaSideMenu
          onClose={toggleSideMenu}
          navigationReset={navigationReset}
        />
      )}
      {isCalendarModalVisible && (
        <View>
          <Modal
            isVisible={true}
            transparent={true}
            // onRequestClose={() => setIsCalendarModalVisible(false)}
          >
            <View
              style={{
                height: 'auto',
                padding: 20,
                borderRadius: 10,
                backgroundColor: 'white',
              }}>
              <FlatList
                data={selectedPeriods}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      {
                        borderRadius: 10,
                        flexDirection: 'row',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        marginVertical: 5,
                        borderWidth: 5,
                        borderColor: item.color,
                      },
                      {
                        backgroundColor:
                          selectedPostIdx === index
                            ? selectedPostBackgroundColor
                            : 'white',
                      },
                    ]}
                    onPress={() => handleSelectModalPost(item, index)}>
                    <Text style={{marginRight: 10}}>{item.id}</Text>
                    <Text style={{paddingRight: 10}}>{item.title}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={{width: '100%'}}
              />
              {/* {selectedPeriods.map((period, index) => (
                
              ))} */}
              <Spacing height={15} />
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 5,
                    borderColor: 'rgba(0,0,0,.3)',
                  }}
                  onPress={() => {
                    // setIsCalendarModalVisible(false);
                    const postIdKey = selectedPeriod.postType + 'Id';
                    const postType =
                      selectedPeriod.postType.charAt(0).toUpperCase() +
                      selectedPeriod.postType.slice(1);
                    // console.log('postIdKey: ', postIdKey);
                    // console.log('selectedPeriod.id: ', selectedPeriod.id);
                    navigation.navigate(postType, {
                      [postIdKey]: selectedPeriod.id,
                    });
                  }}>
                  <Text style={{fontSize: 15}}>이동하기</Text>
                </TouchableOpacity>
                <Spacing width={10} />
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    padding: 5,
                    borderColor: 'rgba(0,0,0,.3)',
                  }}
                  onPress={handleModalClose}>
                  <Text style={{fontSize: 15}}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
      {Object.values(loading).every(value => value === true) && (
        <LoadingAnimation />
      )}
    </SafeAreaView>
  );
};

const Spacing = ({height, width}) => <View style={{height, width}} />;

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
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  notificationWrapper: {
    // width: '100%',
    height: 30,
    borderRadius: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    // backgroundColor: 'yellow',
  },
  voteWrapper: {
    // width: '50%',
    height: 350,
    // flex: 1,
  },
  slide1: {
    flex: 1,
    // height: 300,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
    padding: 20,
    paddingHorizontal: 40,
    backgroundColor: 'white',
  },
  slide2: {
    flex: 1,
    // width: 320,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    flexDirection: 'row',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
  },
  text: {
    paddingBottom: 3,
    fontSize: 18,
    // fontWeight: 'bold',
  },
  calendar: {
    flex: 1,
    width: '100%',
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  vote: {
    flex: 1,
    width: '100%',
    // padding: 20,
    borderRadius: 25,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  indicatorWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
  },
});
