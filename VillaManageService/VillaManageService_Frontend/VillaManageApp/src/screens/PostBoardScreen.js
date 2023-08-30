import React, {useEffect, useState, useContext, useRef} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {VillaContext} from '../contexts/VillaProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import {requestGET} from '../api';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import TextButton from '../components/TextButton';
import VillaSideMenu from '../fragments/VillaSideMenu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NoticeBoardItem from '../components/NoticeBoardItem';
import SegmentedControl from '../components/SegmentedControl';
import {formatDate} from '../utils/formatters';
import {orderByImportanceAndDateDesc} from '../utils/sorters';

const NoticeBoardData = [
  {
    noticeType: 'cc',
    title: '공지1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'bm',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'vi',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'bm',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
];

export const GeneralBoardScreen = ({route}) => {
  const navigation = useNavigation();
  const {villaId} = useContext(VillaContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [postData, setPostData] = useState([]);
  // const [postData, setPostData] = useState([{
  //   generalId: '',
  //   publisherId: '',
  //   title: '',
  //   context: '',
  //   notification: '',
  //   createdAt: '',
  //   modifiedAt: '',
  //   // dateStart: '',
  //   // dateEnd: '',
  // }]);

  useFocusEffect(
    React.useCallback(() => {
      requestGetpost();

      return () => {
        console.log('ScreenOne is unfocused');
      };
    }, []),
  );

  const toggleSideMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const requestGetpost = async () => {
    try {
      const response = await requestGET(`/generals/board/${villaId}`);
      // Handle the response from the signup API
      console.log(response);

      // if (response.status === 'success') {
      setPostData(orderByImportanceAndDateDesc(response));
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
            <Text style={styles.headerTitle}>게시판</Text>
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
          <View style={{borderRadius: 3, marginBottom: 15}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddGeneral')}
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
              <Text color="#9AA0A6" style={{paddingBottom: 2}}>
                새글
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={postData}
            // data={NoticeBoardData}
            renderItem={({item}) => (
              <NoticeBoardItem
                noticeType={item.noticeType}
                title={item.title}
                text={item.context}
                createDate={formatDate(new Date(item.createdAt))}
                onPress={() => {
                  navigation.navigate('General', {generalId: item.generalId});
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent />}
            style={{width: '100%'}}
          />
        </View>
      </View>
      {isMenuOpen && <VillaSideMenu onClose={toggleSideMenu} />}
    </SafeAreaView>
  );
};

export const SurveyBoardScreen = ({route}) => {
  const navigation = useNavigation();
  const {villaId} = useContext(VillaContext);
  const segmentedControlRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [postData, setPostData] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      // handleTabsChange(
      //   segmentedControlRef?.current?.currentIndex === null
      //     ? 0
      //     : segmentedControlRef?.current?.currentIndex,
      // );
      handleTabsChange(tabIndex);
      requestGetpost();

      return () => {
        console.log('ScreenOne is unfocused');
      };
    }, []),
  );

  useEffect(() => {
    requestGetpost();
  }, [tabIndex]);

  const toggleSideMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const requestGetpost = async () => {
    try {
      console.log('villaId : ', villaId);
      const requestParams = {
        villaId: villaId,
        available: tabIndex === 0 ? 'valid' : 'invalid',
      };
      const response = await requestGET('/surveys/board', requestParams);
      // Handle the response from the signup API
      console.log(response);

      // if (response.status === 'success') {
      setPostData(orderByImportanceAndDateDesc(response));
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

  const handleTabsChange = index => {
    console.log(index);
    setTabIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.foreground}>
        <View style={styles.header}>
          <View style={styles.left} />
          <View style={styles.center}>
            <Text style={styles.headerTitle}>설문게시판</Text>
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
          <View style={{borderRadius: 3, marginBottom: 15}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddSurvey')}
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
              <Text color="#9AA0A6" style={{paddingBottom: 2}}>
                새글
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              //   backgroundColor: 'red',
            }}>
            <SegmentedControl
              ref={segmentedControlRef}
              tabs={['진행중', '만료']}
              currentIndex={tabIndex}
              onChange={index => handleTabsChange(index)}
              segmentedControlBackgroundColor="#F0F0F0"
              activeSegmentBackgroundColor="#1A73E8"
              activeTextColor="white"
              textColor="#9AA0A6"
              paddingVertical={10}
              width={350}
            />
          </View>
          {/* <Spacing height={20} /> */}
          <FlatList
            data={postData}
            // data={NoticeBoardData}
            renderItem={({item, index}) => (
              <NoticeBoardItem
                title={item.title}
                // text={item.text}
                createDate={formatDate(new Date(item.createdAt))}
                onPress={() => {
                  navigation.navigate('Survey', {surveyId: item.surveyId});
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyListComponent />}
            style={{width: '100%'}}
          />
        </View>
      </View>
      {isMenuOpen && <VillaSideMenu onClose={toggleSideMenu} />}
    </SafeAreaView>
  );
};

export const AnnounceBoardScreen = ({route}) => {
  const navigation = useNavigation();
  const {villaId} = useContext(VillaContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [CCPostData, setCCPostData] = useState([]);
  // const [BMPostData, setBMPostData] = useState([]);
  const [postData, setPostData] = useState({
    COMMUNITY_CENTER: [],
    BUILDING_MANAGER: [],
    LANDLORD: [],
    RESIDENT: [],
  });
  // const [postData, setPostData] = useState([{
  //   generalId: '',
  //   publisherId: '',
  //   title: '',
  //   context: '',
  //   notification: '',
  //   createdAt: '',
  //   modifiedAt: '',
  //   // dateStart: '',
  //   // dateEnd: '',
  // }]);

  useFocusEffect(
    React.useCallback(() => {
      requestGetpost();

      return () => {
        console.log('ScreenOne is unfocused');
      };
    }, []),
  );

  const toggleSideMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const requestGetpost = async () => {
    try {
      const roles = Object.keys(postData).join(',');
      console.log(roles);
      const response = await requestGET(`/announces/board/role/${villaId}`, {
        roles,
      });
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.foreground}>
        <View style={styles.header}>
          <View style={styles.left} />
          <View style={styles.center}>
            <Text style={styles.headerTitle}>공지사항</Text>
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
          <View style={{borderRadius: 3, marginBottom: 15}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddAnnounce')}
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
              <Text color="#9AA0A6" style={{paddingBottom: 2}}>
                새글
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.8,
              width: '100%',
              // height: '30%',
              flexDirection: 'column',
              // backgroundColor: 'red',
            }}>
            <Text style={{fontSize: 18, color: 'black'}}>주민센터 공지</Text>
            <View style={styles.separator} />
            <Spacing height={10} />
            <FlatList
              data={orderByImportanceAndDateDesc(postData.COMMUNITY_CENTER)}
              // data={NoticeBoardData.filter(post => post.noticeType === 'cc')}
              renderItem={({item}) => (
                <NoticeBoardItem
                  noticeType={item.noticeType}
                  title={item.title}
                  text={item.context}
                  createDate={formatDate(new Date(item.createdAt))}
                  backgroundColor="#F5F5F5"
                  onPress={() => {
                    navigation.navigate('Announce', {
                      announceId: item.announceId,
                    });
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <Spacing height={5} />}
              showsVerticalScrollIndicator={true}
              ListEmptyComponent={<EmptyListComponent />}
              style={{width: '100%'}}
            />
          </View>
          <Spacing height={30} />
          <View
            style={{
              flex: 0.8,
              width: '100%',
              // height: '30%',
              flexDirection: 'column',
              // backgroundColor: 'red',
            }}>
            <Text style={{fontSize: 18, color: 'black'}}>건물관리자 공지</Text>
            <View style={styles.separator} />
            <Spacing height={10} />
            <FlatList
              data={orderByImportanceAndDateDesc(postData.BUILDING_MANAGER)}
              // data={NoticeBoardData.filter(post => post.noticeType === 'bm')}
              renderItem={({item}) => (
                <NoticeBoardItem
                  noticeType={item.noticeType}
                  title={item.title}
                  text={item.context}
                  createDate={formatDate(new Date(item.createdAt))}
                  backgroundColor="#F5F5F5"
                  onPress={() => {
                    navigation.navigate('Announce', {
                      announceId: item.announceId,
                    });
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <Spacing height={5} />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<EmptyListComponent />}
              style={{width: '100%'}}
            />
          </View>
          <Spacing height={30} />
          <View
            style={{
              flex: 0.8,
              width: '100%',
              // height: '30%',
              flexDirection: 'column',
              // backgroundColor: 'red',
            }}>
            <Text style={{fontSize: 18, color: 'black'}}>빌라 공지</Text>
            <View style={styles.separator} />
            <Spacing height={10} />
            <FlatList
              data={orderByImportanceAndDateDesc([
                ...postData.LANDLORD,
                ...postData.RESIDENT,
              ])}
              // data={NoticeBoardData.filter(post => post.noticeType === 'bm')}
              renderItem={({item}) => (
                <NoticeBoardItem
                  noticeType={item.noticeType}
                  title={item.title}
                  text={item.context}
                  createDate={formatDate(new Date(item.createdAt))}
                  backgroundColor="#F5F5F5"
                  onPress={() => {
                    navigation.navigate('Announce', {
                      announceId: item.announceId,
                    });
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <Spacing height={5} />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<EmptyListComponent />}
              style={{width: '100%'}}
            />
          </View>
          {/* <Spacing height={30} />
          <View
            style={{
              flex: 0.8,
              width: '100%',
              // height: '30%',
              flexDirection: 'column',
              // backgroundColor: 'red',
            }}>
            <Text style={{fontSize: 18, color: 'black'}}>빌라 공지</Text>
            <View style={styles.separator} />
            <Spacing height={10} />
            <FlatList
              // data={postData}
              data={NoticeBoardData.filter(post => post.noticeType === 'vi')}
              renderItem={({item}) => (
                <NoticeBoardItem
                  noticeType={item.noticeType}
                  title={item.title}
                  text={item.context}
                  createDate={formatDate(new Date(item.createdAt))}
                  backgroundColor="#F5F5F5"
                  onPress={() => {
                    navigation.navigate('Post', {generalId: item.generalId});
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <Spacing height={5} />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<EmptyListComponent />}
              style={{width: '100%'}}
            />
          </View> */}
        </View>
      </View>
      {isMenuOpen && <VillaSideMenu onClose={toggleSideMenu} />}
    </SafeAreaView>
  );
};

const Spacing = ({height}) => <View style={{height}} />;

const EmptyListComponent = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text>등록된 게시글이 없습니다.</Text>
    </View>
  );
};

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
    backgroundColor: 'white',
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
    alignItems: 'flex-start',
    paddingBottom: 10,
    paddingHorizontal: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
