import React, {useState} from 'react';
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

// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');

// const handleSignup = async () => {
//   try {
//     const userData = {email, password};
//     const response = await signup(userData);
//     // Handle successful signup
//     console.log(response);
//   } catch (error) {
//     // Handle signup error
//     Alert.alert('Signup Failed', error.message);
//   }
// };

export const ResidentsJoinScreen = ({route}) => {
  const navigation = useNavigation();
  const {addressData} = route.params;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabIndex, setTabIndex] = React.useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isModal, setModal] = useState(false);
  const [position, setPosition] = React.useState('');

  const [userData, setUserData] = useState({
    id: '',
    // password: '',
    // name: '',
    // contact_number: '',
    // contact_number_sub: '',
    // address: '',
    // email: '',
    // gender: 0,
    // birth: new Date(),
    // relation_household: '',
    // contractor: false,
    // master: false,
    // owner: false,
  });

  const handleTabsChange = index => {
    setTabIndex(index);
    setUserData(prev => ({...prev, gender: index}));
  };

  const handleSetOwner = data => {
    setPosition(data);
    setUserData(prev => ({...prev, owner: data}));
  };

  // const handleAddressSelect = () => {
  //   setUserData(prev => ({...prev, address: addressData.address}));
  //   return addressData.address;
  // };

  const handleInputID = data => {
    setUserData(prev => ({...prev, user_id: data}));
    console.log(userData);
  };

  const handleFormSubmit = async () => {
    // try {
    console.log(userData);

    const response = await signup(userData);
    // Handle the response from the signup API
    //   console.log(response);
    // } catch (error) {
    //   // Handle any errors that occurred during the signup API call
    //   console.error(error);
    // }

    // Make an API call to send the data to the backend
    // Example using fetch:
    // fetch('https://example.com/api/endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then((response) => response.json())
    // .then((responseData) => {
    //   // Handle the response from the backend
    //   console.log(responseData);
    // })
    // .catch((error) => {
    //   // Handle any errors
    //   console.error(error);
    // });
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
          title="입주민 계정만들기"
        />
        <Spacing height={40} />
        <IconInput
          Icon="none"
          placeholder="아이디"
          onChangeText={text => setUserData(prev => ({...prev, user_id: text}))}
        />
        <Spacing height={10} />
        <IconInput
          Icon="none"
          placeholder="비밀번호"
          onChangeText={text => setUserData(prev => ({...prev, pw: text}))}
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
          onChangeText={text => setUserData(prev => ({...prev, email: text}))}
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
              setOpen(false);
              setUserData(prev => ({...prev, birth: date}));
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
            setUserData(prev => ({...prev, contact_number: text}))
          }
        />
        <Spacing height={10} />
        <IconInput
          Icon="none"
          placeholder="전화번호2(가족,친척 등 비상연락망)"
          onChangeText={text =>
            setUserData(prev => ({...prev, contact_number_sub: text}))
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
          <Text>집주소(동)</Text>
          <SpecificButton
            width={170}
            height={40}
            fontSize={14}
            text={addressData === undefined ? '주소찾기' : addressData.address}
            onPress={() => navigation.navigate('SearchAddress')}
          />
        </View>
        <Spacing height={20} />
        <IconInput
          Icon="none"
          placeholder="상세주소(호수)"
          onChangeText={text =>
            setUserData(prev => ({
              ...prev,
              address: addressData.address + ' ' + text + '호',
            }))
          }
        />
        <Spacing height={10} />
        <IconInput
          Icon="none"
          placeholder="계약자"
          onChangeText={text =>
            setUserData(prev => ({...prev, contractor: text}))
          }
        />
        <Spacing height={10} />
        <IconInput
          Icon="none"
          placeholder="세대주와의 관계"
          onChangeText={text => setUserData(prev => ({...prev, address: text}))}
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
          <Text>주인여부</Text>
          <View>
            <SelectList
              setSelected={val => handleSetOwner(val)}
              data={[
                {key: '1', value: '임차인'},
                {key: '2', value: '주인'},
              ]}
              save="value"
              boxStyles={{
                width: 170,
                borderRadius: 30,
                backgroundColor: '#f0f0f0',
                borderWidth: 0,
              }}
            />
          </View>
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
