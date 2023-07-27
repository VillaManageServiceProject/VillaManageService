import React, {useState, useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import IconInput from '../components/IconInput';
import {CommonButton, SpecificButton} from '../components/Button';
import TextButton from '../components/TextButton';
import IconTitle from '../components/IconTitle';
import SegmentedControl from '../components/SegmentedControl';
import DatePicker from 'react-native-date-picker';
import Postcode from '@actbase/react-daum-postcode';
import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import {signup} from '../api';

export const LandlordJoinScreen = ({route}) => {
  const navigation = useNavigation();
  const {addressData} = route.params;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabIndex, setTabIndex] = React.useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isModal, setModal] = useState(false);
  const [position, setPosition] = React.useState('');
  const [submitError, setSubmitError] = useState('');

  const [userData, setUserData] = useState({
    id: '',
    password1: '',
    password2: '',
    name: '',
    contactNumber: '',
    contactNumberSub: '',
    email: '',
    gender: 0,
    birth: '1998-02-20',
    ownedAddress: '',
    ownedAddressDetail: 0,
    coOwnerId: '',
  });

  useLayoutEffect(() => {
    console.log(addressData);
    if (addressData && addressData.address) {
      console.log(addressData.address);
      setUserData(prev => ({...prev, ownedAddress: addressData.address}));
      // addressComp.current.text = addressData.address;
    }
  }, [addressData]);

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
      const userType = 'landlord';
      const response = await signup({userType: userType, userData: userData});
      // Handle the response from the signup API
      console.log(response);
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
          placeholder="아이디"
          onChangeText={text => setUserData(prev => ({...prev, id: text}))}
        />
        <Spacing height={10} />
        <IconInput
          Icon="none"
          placeholder="비밀번호"
          onChangeText={text =>
            setUserData(prev => ({...prev, password1: text}))
          }
        />
        <Spacing height={10} />
        <IconInput
          Icon="none"
          placeholder="비밀번호 확인"
          onChangeText={text =>
            setUserData(prev => ({...prev, password2: text}))
          }
        />
        <Spacing height={10} />
        <IconInput
          Icon="none"
          placeholder="이름"
          onChangeText={text => setUserData(prev => ({...prev, name: text}))}
        />
        <Spacing height={10} />
        <IconInput
          Icon="none"
          placeholder="E-mail"
          onChangeText={text =>
            setUserData(prev => ({...prev, password1: text}))
          }
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 15,
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
            paddingLeft: 15,
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
              setDate(date);
              setOpen(false);
              setUserData(prev => ({
                ...prev,
                birth: date.toISOString().substring(0, 10),
              }));
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
          placeholder="전화번호1(본인)"
          onChangeText={text =>
            setUserData(prev => ({...prev, contactNumber: text}))
          }
        />
        <Spacing height={10} />
        <IconInput
          Icon="none"
          placeholder="전화번호2(가족,친척 등 비상연락망)"
          onChangeText={text =>
            setUserData(prev => ({...prev, contactNumberSub: text}))
          }
        />
        <Spacing height={10} />
        <IconInput
          Icon="none"
          placeholder="공동소유자 아이디"
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
            paddingLeft: 15,
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
        <Spacing height={20} />
        <IconInput
          Icon="none"
          placeholder="상세주소(호수)"
          onChangeText={text =>
            setUserData(prev => ({
              ...prev,
              ownedAddressDetail: text,
            }))
          }
        />
        <Spacing height={40} />
        <Text style={{color: 'red'}}>{submitError}</Text>
        <Spacing height={10} />
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
