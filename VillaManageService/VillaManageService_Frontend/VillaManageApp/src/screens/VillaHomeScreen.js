import React, {useState, useContext} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
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

  const [selected, setSelected] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [announcePostData, setAnnouncePostData] = useState({
    COMMUNITY_CENTER: [],
    BUILDING_MANAGER: [],
    RESIDENT: [],
  });
  const [combinedPosts, setCombinedPosts] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      requestGetVillaInfo();
      requestGetpost();

      console.log('villaName: ', villaName);
      console.log('villaId: ', villaId);

      return () => {
        console.log('ScreenOne is unfocused');
      };
    }, []),
  );

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

  const requestGetpost = async () => {
    try {
      const roles = Object.keys(announcePostData).join(',');
      console.log(roles);
      const response = await requestGET(
        `/generals/board/role/announce/${villaId}`,
        {
          roles,
        },
      );
      // Handle the response from the signup API
      console.log(response);

      // if (response.status === 'success') {

      setAnnouncePostData(response);
      setCombinedPosts(
        Object.values(response).reduce((acc, val) => acc.concat(val), []),
      );
      console.log(
        'combined: ',
        Object.values(announcePostData).reduce(
          (acc, val) => acc.concat(val),
          [],
        ),
      );
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
    console.log(navigation.getState());
    setIsMenuOpen(prev => !prev);
  };

  const navigationReset = () => {
    console.log('navigationReset');
    navigation.reset({
      index: 0,
      routes: [{name: 'UnLoginedMap'}],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.foreground}>
        <View style={styles.header}>
          <View style={styles.left} />
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
            <View style={{flex: 1, marginVertical: 30}}>
              <Swiper
                autoplay
                autoplayTimeout={3.5}
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
                {combinedPosts.map((item, index) => (
                  <View key={index} style={styles.slide2}>
                    <AntDesign
                      name="exclamationcircle"
                      size={15}
                      color="#FF383890"
                      style={{marginRight: 15}}
                    />
                    <Text style={styles.text}>{item.title}</Text>
                  </View>
                ))}
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
              />
            </View>
            <Spacing height={15} />
            <View style={styles.vote}>
              <TextButton
                IconType="MaterialCommunityIcons"
                IconName="vote"
                text="진행중인 설문조사"
              />
              <Spacing height={10} />
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
                  top: -220,
                  // left: null,
                  // right: 10,
                }}
                loop>
                <View style={styles.slide1}>
                  <Text style={styles.text}>
                    rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                    rrrrrrrrrrrrrrrrrrrrrrrrrrrr
                  </Text>
                  <Spacing height={5} />
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: 'gray',
                      backgroundColor: '#9AA0A6',
                      marginVertical: 10,
                    }}>
                    <TextButton text="옵션1" fontColor="#1F2429" />
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: 'gray',
                      backgroundColor: '#9AA0A6',
                      marginVertical: 10,
                    }}>
                    <TextButton text="옵션2" fontColor="#1F2429" />
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: 'gray',
                      backgroundColor: '#9AA0A6',
                      marginVertical: 10,
                    }}>
                    <TextButton text="옵션3" fontColor="#1F2429" />
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: 'gray',
                      backgroundColor: '#9AA0A6',
                      marginVertical: 10,
                    }}>
                    <TextButton text="옵션4" fontColor="#1F2429" />
                  </View>
                </View>
                <View style={styles.slide2}>
                  <Text style={styles.text}>Beautiful</Text>
                  <TextButton text="옵션" />
                </View>
                <View style={styles.slide3}>
                  <Text style={styles.text}>And simple</Text>
                  <TextButton text="옵션" />
                </View>
              </Swiper>
              <View
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
              </View>
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
    height: 30,
    borderRadius: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    // backgroundColor: 'yellow',
  },
  voteWrapper: {
    height: 250,
    borderRadius: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    // backgroundColor: 'yellow',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 20,
    backgroundColor: 'white',
  },
  slide2: {
    flex: 1,
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
    // backgroundColor: 'red',
  },
});
