import React, {useState, useContext} from 'react';
import {UserContext} from '../contexts/UserProvider';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import styled from 'styled-components/native';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import IconInput from '../components/IconInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CommonButton, SpecificButton} from '../components/Button';
import TextButton from '../components/TextButton';
import IconTitle from '../components/IconTitle';
import Icon from '../components/Icon';
import DatePicker from 'react-native-date-picker';
import Postcode from '@actbase/react-daum-postcode';
import {SelectList} from 'react-native-dropdown-select-list';
import {requestPOST, logout} from '../api';

export const AccountSettingScreen = ({route, navigationReset}) => {
  const navigation = useNavigation();
  const {userInfo, handleLogout} = useContext(UserContext);

  // const {addressData} = route.params;

  const [lastClick, setLastClick] = useState(0);
  const [selectedIsMaster, setSelectedIsMaster] = useState(false);
  const [tabIndex, setTabIndex] = React.useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isModal, setModal] = useState(false);
  const [position, setPosition] = React.useState('');
  const [newFavoriteAddress, setNewFavoriteAddress] = useState('');
  const [favoriteRecordes, setFavoriteRecordes] = useState([]);

  const [userData, setUserData] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      console.log('userInfo: ', userInfo);
      if (userInfo.roles[0] === 'RESIDENT')
        setUserData({...userInfo, villaId: '..', address: '..'});
      else if (userInfo.roles[0] === 'LANDLORD')
        setUserData({...userInfo, villaId: '..', ownedAddress: '..'});
      else if (userInfo.roles[0] === 'BUILDING_MANAGER')
        setUserData({...userInfo, manageVillaId: '..'});
      else setUserData(userInfo);

      if (userInfo.favorites !== null) {
        setFavoriteRecordes(userInfo.favorites);
      }

      return () => {
        console.log('ScreenOne is unfocused');
      };
    }, []),
  );

  const handleFormSubmit = async () => {
    try {
      const now = new Date().getTime();
      if (now - lastClick > 2000) {
        console.log('favoriteRecordes: ', favoriteRecordes);
        setUserData(prev => ({
          ...prev, // 기존의 key-value 쌍 유지
          favorites: favoriteRecordes, // 새로운 key-value 쌍 추가
        }));
        console.log(userData);
        const response = await requestPOST(`/user/account/update`, {
          ...userData,
          userType: userInfo.roles[0],
        });
        // {...dict, newKey: 'newValue'};
        // Handle the response from the signup API
        console.log(response);
        if (response === 'ok') {
          handleLogoutSubmit();
        }
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
  };

  const handleSelectisContractor = () => {
    // setSelectedIsContractor(prev =>
    //   !prev
    // );
    setUserData(prev => ({...prev, isContractor: !prev.isContractor}));
  };

  const handleSelectisMaster = () => {
    // setSelectedIsMaster(prev => (prev === 'isMaster' ? '' : 'isMaster'));
    setUserData(prev => ({...prev, isMaster: !prev.isMaster}));
  };

  const handleSetisOwner = data => {
    console.log(data);
    setPosition(data);
    setUserData(prev => ({...prev, isOwner: data === '주인'}));
  };

  const handleInputChange = text => {
    setNewFavoriteAddress(text);
  };

  const handleAddPress = () => {
    console.log(newFavoriteAddress);
    if (
      newFavoriteAddress !== '' &&
      !favoriteRecordes.includes(newFavoriteAddress)
    ) {
      const updatedRecords = [newFavoriteAddress, ...favoriteRecordes];
      setFavoriteRecordes(updatedRecords);
      console.log('updatedRecords: ', updatedRecords);
    }
  };

  const handleDeletePress = index => {
    console.log(favoriteRecordes);
    const updatedRecords = [
      ...favoriteRecordes.slice(0, index),
      ...favoriteRecordes.slice(index + 1),
    ];
    console.log('updatedRecords: ', updatedRecords);
    setFavoriteRecordes(updatedRecords);
  };

  const handleAddressSelect = data => {
    setAddress(data);
    setModal(false);
  };

  const handleFavorite = () => {
    // const {FavoriteQuery, favoriteRecordes} = this.state;
    // this.props.onFavorite(FavoriteQuery);
    // Keyboard.dismiss();
    // this.setState({isTextInputTouched: false});
    // // add the FavoriteQuery to favoriteRecordes
    // if (FavoriteQuery !== '' && !favoriteRecordes.includes(FavoriteQuery)) {
    //   const updatedRecords = [FavoriteQuery, ...favoriteRecordes].slice(0, 3);
    //   console.log(updatedRecords);
    //   this.setState({favoriteRecordes: updatedRecords});
    //   // Save the updated favoriteRecordes to AsyncStorage
    //   this.savefavoriteRecordes(updatedRecords);
  };

  const handleLogoutSubmit = async () => {
    try {
      const response = await logout();
      // Handle the response from the signup API
      console.log(response);

      // if (response.status === 200) {
      handleLogout();
      navigationReset();
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'UnLoginedMap'}],
      // });
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
    <Container>
      <View
        style={{
          margin: '10%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IconTitle
          IconType="MaterialCommunityIcons"
          IconName="account-cog-outline"
          title="계정 정보"
          fontSize={30}
        />
        <Spacing height={40} />
        <View
          style={{
            width: '100%',
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            justifyContent: 'center',
            borderColor: '#DFE1E5',
            // backgroundColor: 'blue',
          }}>
          <TextButton
            IconType="MaterialCommunityIcons"
            IconName="logout"
            text="Logout"
            onPress={handleLogoutSubmit}
          />
        </View>
        <Spacing height={30} />
        <View style={styles.section}>
          <View style={styles.borderTextArea}>
            <Text style={{color: 'black'}}>계정정보</Text>
          </View>
          <View style={{width: '100%'}}>
            {/* <IconInput
              Icon="none"
              title="아이디"
              value={userData.id}
              onChangeText={text => setUserData(prev => ({...prev, id: text}))}
            />
            <Spacing height={20} /> */}
            <IconInput
              secureTextEntry
              Icon="none"
              title="비밀번호"
              placeholder="기존 비밀번호 또는 새로운 비밀번호"
              onChangeText={text =>
                setUserData(prev => ({...prev, password1: text}))
              }
            />
            <Spacing height={20} />
            <IconInput
              secureTextEntry
              Icon="none"
              title="비밀번호 확인"
              onChangeText={text =>
                setUserData(prev => ({...prev, password2: text}))
              }
            />
            <Spacing height={20} />
            {userInfo.roles.some(
              item => item === 'RESIDENT' || item === 'LANDLORD',
            ) && (
              <View>
                <IconInput
                  Icon="none"
                  title="이름"
                  value={userData.name}
                  onChangeText={text =>
                    setUserData(prev => ({...prev, name: text}))
                  }
                />
                <Spacing height={20} />
              </View>
            )}
            {userInfo.roles.some(
              item =>
                item === 'COMMUNITY_CENTER' || item === 'BUILDING_MANAGER',
            ) && (
              <View>
                <IconInput
                  Icon="none"
                  title="담당자명"
                  value={userData.name}
                  onChangeText={text =>
                    setUserData(prev => ({...prev, name: text}))
                  }
                />
                <Spacing height={20} />
              </View>
            )}
            {userInfo.roles.some(
              item => item === 'RESIDENT' || item === 'LANDLORD',
            ) && (
              <View>
                <IconInput
                  Icon="none"
                  title="전화번호1(본인)"
                  value={userData.contactNumber}
                  onChangeText={text =>
                    setUserData(prev => ({...prev, contactNumber: text}))
                  }
                />
                <Spacing height={20} />
                <IconInput
                  Icon="none"
                  title="전화번호2(가족,친척 등 비상연락망)"
                  value={userData.contactNumberSub}
                  onChangeText={text =>
                    setUserData(prev => ({...prev, contactNumberSub: text}))
                  }
                />
                <Spacing height={20} />
              </View>
            )}
            {userInfo.roles.some(
              item =>
                item === 'COMMUNITY_CENTER' || item === 'BUILDING_MANAGER',
            ) && (
              <View>
                <IconInput
                  Icon="none"
                  title="연락처"
                  value={userData.contactNumber}
                  onChangeText={text =>
                    setUserData(prev => ({...prev, contactNumber: text}))
                  }
                />
                <Spacing height={20} />
                <IconInput
                  Icon="none"
                  title="직함(부서)"
                  value={userData.department}
                  onChangeText={text =>
                    setUserData(prev => ({...prev, department: text}))
                  }
                />
                <Spacing height={20} />
              </View>
            )}
            {userInfo.roles.some(
              item => item === 'RESIDENT' || item === 'LANDLORD',
            ) && (
              <View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    // marginRight: 20,
                    // backgroundColor: 'red',
                  }}>
                  {userInfo.roles.includes('RESIDENT') && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 10,
                      }}>
                      <Text style={{marginRight: 5}}>계약자</Text>
                      <RadioButton
                        // value={userData.isContractor ? 'isContractor' : ''}
                        status={userData.isContractor ? 'checked' : 'unchecked'}
                        onPress={handleSelectisContractor}
                      />
                    </View>
                  )}
                  {userInfo.roles.some(
                    item => item === 'RESIDENT' || item === 'LANDLORD',
                  ) && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 10,
                      }}>
                      <Text style={{marginRight: 5}}>대표자</Text>
                      <RadioButton
                        // value={userData.isMaster ? 'isContractor' : ''}
                        status={userData.isMaster ? 'checked' : 'unchecked'}
                        onPress={handleSelectisMaster}
                      />
                    </View>
                  )}
                </View>
                <Spacing height={25} />
              </View>
            )}
            {userInfo.roles.includes('RESIDENT') && (
              <View>
                <IconInput
                  Icon="none"
                  title="세대주와의 관계"
                  value={userData.relationHousehold}
                  onChangeText={text =>
                    setUserData(prev => ({...prev, relationHousehold: text}))
                  }
                />
                <Spacing height={25} />
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'column',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Text>본 건물 소유 여부</Text>
                  <View style={{width: '100%'}}>
                    <SelectList
                      setSelected={val => handleSetisOwner(val)}
                      data={[
                        {key: '1', value: '임차인'},
                        {key: '2', value: '주인'},
                      ]}
                      save="value"
                      boxStyles={{
                        width: '100%',
                        borderRadius: 30,
                        backgroundColor: '#f0f0f0',
                        borderWidth: 0,
                        marginVertical: 5,
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
        <Spacing height={30} />
        <View style={styles.section}>
          <View style={styles.borderTextArea}>
            <Text style={{color: 'black'}}>즐겨찾기</Text>
          </View>
          <FavoriteArea>
            <FavoriteView>
              {/* <TouchableWithoutFeedback onPress={this.handleScreenTouch}> */}
              <FavoriteTextInput
                placeholder="주소 입력"
                onChangeText={handleInputChange}
              />
              {/* </TouchableWithoutFeedback> */}
              <TouchableOpacity
                style={{justifyContent: 'center'}}
                onPress={handleFavorite}>
                <Icon
                  size={20}
                  IconType="AntDesign"
                  IconName="plus"
                  borderWidth={0}
                  borderRadius={30}
                  onPress={handleAddPress}
                />
              </TouchableOpacity>
            </FavoriteView>
            <FavoriteList
              data={favoriteRecordes}
              renderItem={({item, index}) => (
                <FavoriteListComp>
                  <FavoriteListItem
                  // onPress={() => this.handleItemPress(item)}
                  >
                    <AntDesign
                      name="staro"
                      size={20}
                      color="black"
                      style={{marginRight: 10}}
                      // borderRadius={30}
                      // onPress={() => this.props.navigation.navigate('Login')}
                    />
                    <Text>{item}</Text>
                  </FavoriteListItem>
                  <Icon
                    size={20}
                    IconType="AntDesign"
                    IconName="minus"
                    borderWidth={0}
                    borderRadius={30}
                    onPress={() => handleDeletePress(index)}
                  />
                </FavoriteListComp>
              )}
              keyExtractor={(item, index) => index.toString()}
              // onLayout={
              //   // e => console.log(e.nativeEvent.layout.height)
              //   e => this.setState({textInputHeight: e.nativeEvent.layout.height})
              // }
              // style={{backgroundColor: 'red'}}
            />
          </FavoriteArea>
        </View>
        <Spacing height={40} />
        <CommonButton
          text="완료"
          fontSize={15}
          backgroundColor="#DFE1E5"
          onPress={handleFormSubmit}
        />
      </View>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const Spacing = ({height}) => <View style={{height}} />;
const SeperateLine = ({height}) => (
  <View style={{height, marginHorizontal: 20, borderWidth: 0.2}} />
);

const postCode = ({}) => (
  <Postcode
    style={{width: '100%', height: '100%'}}
    jsOptions={{animation: true}}
    // onSelected={(data)=>this.getAddressData(data)}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postcodeContainer: {
    width: 320,
    height: 320,
  },
  addressText: {
    marginTop: 16,
    fontSize: 18,
  },
  section: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    paddingVertical: 30,
  },
  borderTextArea: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
});

const FavoriteTextInput = styled.TextInput`
  width: 90%;
  font-size: 15px;
`;

const FavoriteView = styled.View`
  width: 100%;
  height: 53px;
  padding-horizontal: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const FavoriteArea = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #dfe1e5;
  border-radius: 30px;
  flex-direction: column;
  justify-content: space-between;
`;

const FavoriteList = styled.FlatList`
  width: 100%;
  padding-bottom: 20px;
  padding-horizontal: 15px;
  border-radius: 30px;
`;

const FavoriteListItem = styled.View`
  width: 90%;
  border-radius: 10px;
  padding-vertical: 5px;
  flex-direction: row;
`;

const FavoriteListComp = styled.View`
  width: 100%;
  border-radius: 10px;
  padding-vertical: 5px;
  flex-direction: row;
  justify-content: space-between;
`;
