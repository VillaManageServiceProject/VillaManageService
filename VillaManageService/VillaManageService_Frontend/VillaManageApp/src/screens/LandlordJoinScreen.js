import React, {useState, useLayoutEffect, useContext, useEffect} from 'react';
import styled from 'styled-components/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {VillaContext} from '../contexts/VillaProvider';
import IconInput from '../components/IconInput';
import {CommonButton, SpecificButton} from '../components/Button';
import TextButton from '../components/TextButton';
import IconTitle from '../components/IconTitle';
import SegmentedControl from '../components/SegmentedControl';
import DatePicker from 'react-native-date-picker';
import Postcode from '@actbase/react-daum-postcode';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {signup} from '../api';
import {UserContext} from '../contexts/UserProvider';

export const LandlordJoinScreen = ({route}) => {
  const navigation = useNavigation();
  const {villaId} = useContext(VillaContext);
  const {setUserType, setUserInfo} = useContext(UserContext);
  const addressData = route?.params?.addressData;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [position, setPosition] = React.useState('');
  const [submitError, setSubmitError] = useState('');
  const [lastClick, setLastClick] = useState(0);

  const [userData, setUserData] = useState({
    id: '',
    villaId: villaId,
    password1: '',
    password2: '',
    name: '',
    contactNumber: '',
    contactNumberSub: '',
    email: '',
    gender: 0,
    birth: null,
    ownedAddress: '',
    ownedAddressDetail: null,
    coOwnerId: '',
    isMaster: false,
  });

  useLayoutEffect(() => {
    console.log(addressData);
    if (addressData && addressData.address) {
      console.log(addressData.address);
      setUserData(prev => ({
        ...prev,
        villaId:
          addressData.bcode +
          addressData.jibunAddress
            .split(' ')
            .reverse()[0]
            .split('-')[0]
            .padStart(4, '0') +
          addressData.jibunAddress
            .split(' ')
            .reverse()[0]
            .split('-')[1]
            .padStart(4, '0'),
        ownedAddress: addressData.address,
      }));
      // addressComp.current.text = addressData.address;
    }
  }, [addressData]);

  useEffect(() => {
    if (toggleModal) {
      setTimeout(() => {
        setToggleModal(false);
      }, 1500);
    }
  }, [toggleModal]);

  const handleTabsChange = index => {
    setTabIndex(index);
    setUserData(prev => ({...prev, gender: index}));
  };

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
  };

  const handleAddressSelect = data => {
    setAddress(data);
    setModal(false);
  };

  const handleFormSubmit = async () => {
    try {
      const now = new Date().getTime();
      if (now - lastClick > 2000) {
        console.log(userData);
        const userType = 'LANDLORD';
        // const response = await signup({userType: userType, userData: userData});
        const response = await signup({
          userType: userType,
          userData: {...userData, userType: userType},
        });
        // Handle the response from the signup API
        console.log(response);
        if (response === 'ok') {
          navigation.navigate('Login');
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

  return (
    <Container>
      <View
        style={{
          margin: '15%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IconTitle
          IconType="MaterialCommunityIcons"
          IconName="account-plus-outline"
          title="임대인 계정만들기"
        />
        <Spacing height={40} />
        <IconInput
          Icon="none"
          title="아이디"
          onChangeText={text => setUserData(prev => ({...prev, id: text}))}
        />
        <Spacing height={20} />
        <IconInput
          secureTextEntry
          Icon="none"
          title="비밀번호"
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
        <IconInput
          Icon="none"
          title="이름"
          onChangeText={text => setUserData(prev => ({...prev, name: text}))}
        />
        <Spacing height={20} />
        <IconInput
          Icon="none"
          title="E-mail"
          onChangeText={text => setUserData(prev => ({...prev, email: text}))}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text>성별</Text>
          <SegmentedControl
            tabs={['남자', '여자']}
            currentIndex={tabIndex}
            onChange={handleTabsChange}
            segmentedControlBackgroundColor="#F0F0F0"
            activeSegmentBackgroundColor="#1A73E8"
            activeTextColor="white"
            textColor="#9AA0A6"
            paddingVertical={10}
          />
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text>생년월일</Text>
          <SpecificButton
            width={170}
            height={40}
            fontSize={14}
            text={date.toISOString().substring(0, 10)}
            onPress={() => setOpen(true)}
          />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              if (date > new Date()) {
                setToggleModal(!toggleModal);
                setOpen(false);
              } else {
                setDate(date);
                setOpen(false);
                setUserData(prev => ({
                  ...prev,
                  birth: date.toISOString().substring(0, 10),
                }));
              }
            }}
            onCancel={() => {
              setOpen(false);
            }}
            mode="date"
            textColor="#9AA0A6"
          />
        </View>
        <Spacing height={20} />
        <IconInput
          Icon="none"
          title="전화번호1(본인)"
          onChangeText={text =>
            setUserData(prev => ({...prev, contactNumber: text}))
          }
        />
        <Spacing height={20} />
        <IconInput
          Icon="none"
          title="전화번호2(가족,친척 등 비상연락망)"
          onChangeText={text =>
            setUserData(prev => ({...prev, contactNumberSub: text}))
          }
        />
        <Spacing height={20} />
        <IconInput
          Icon="none"
          title="공동소유자 아이디"
          onChangeText={text =>
            setUserData(prev => ({...prev, coOwnerId: text}))
          }
        />
        <Spacing height={20} />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text>임대지주소(동)</Text>
          <SpecificButton
            width={150}
            height={40}
            fontSize={14}
            text={addressData === undefined ? '주소찾기' : addressData.address}
            onPress={() =>
              navigation.navigate('SearchAddress', {
                parentScreenName: 'LandlordJoin',
              })
            }
          />
        </View>
        <Spacing height={25} />
        <IconInput
          Icon="none"
          title="상세주소(호수)"
          onChangeText={text =>
            setUserData(prev => ({
              ...prev,
              ownedAddressDetail: text,
            }))
          }
        />
        <Spacing height={40} />
        <Text style={{color: 'red'}}>{submitError}</Text>
        <Spacing height={20} />
        <CommonButton
          text="완료"
          fontSize={15}
          backgroundColor="#DFE1E5"
          onPress={handleFormSubmit}
        />
      </View>
      {toggleModal && (
        <View>
          <Modal
            isVisible={toggleModal}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}>
            <View
              style={{
                height: 'auto',
                padding: 30,
                borderRadius: 10,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="exclamationcircle" color="#FF383890" size={17} />
              <Text style={{fontSize: 17, margin: 10}}>
                유효하지 않은 생년월일입니다.
              </Text>
            </View>
          </Modal>
        </View>
      )}
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const Spacing = ({height}) => <View style={{height}} />;

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
});
