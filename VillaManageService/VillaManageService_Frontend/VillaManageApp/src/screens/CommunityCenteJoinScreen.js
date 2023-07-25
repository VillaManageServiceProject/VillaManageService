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

export const CommunityCenteJoinScreen = ({route}) => {
  const navigation = useNavigation();
  const {addressData} = route.params;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabIndex, setTabIndex] = React.useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isModal, setModal] = useState(false);
  const [position, setPosition] = React.useState('');

  const handleTabsChange = index => {
    setTabIndex(index);
  };

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
  };

  const handleAddressSelect = data => {
    setAddress(data);
    setModal(false);
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
          title="공공기관 계정만들기"
          fontSize={30}
        />
        <Spacing height={40} />
        <IconInput Icon="none" placeholder="아이디" />
        <Spacing height={10} />
        <IconInput Icon="none" placeholder="비밀번호" />
        <Spacing height={10} />
        <IconInput Icon="none" placeholder="담당지역" />
        <Spacing height={10} />
        <IconInput Icon="none" placeholder="담당자명" />
        <Spacing height={10} />
        <IconInput Icon="none" placeholder="직함(부서)" />
        <Spacing height={10} />
        <IconInput Icon="none" placeholder="연락처" />
        <Spacing height={40} />
        <CommonButton text="완료" fontSize={15} backgroundColor="#DFE1E5" />
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
