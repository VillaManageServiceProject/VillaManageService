import React, {useState, useNavigation} from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SpecificButton} from '../components/Button';
import DatePicker from 'react-native-date-picker';
import {RadioButton} from 'react-native-paper';
import {CommonButton} from '../components/Button';

export const AddChatScreen = ({route}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDateStartPickerOpened, setDateStartPickerOpen] = useState(false);
  const [isDateEndPickerOpened, setDateEndPickerOpen] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState('');
  const [selectManagerChecked, setSelectManagerChecked] = useState('');
  const [selectCCChecked, setSelectCCChecked] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.foreground}>
        <View style={styles.header}>
          <View style={styles.left} />
          <View style={styles.center}>
            <Text style={styles.headerTitle}>새로운 소통방</Text>
          </View>
          <View style={styles.right} />
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
              <Text style={{marginRight: 20}}>방명</Text>
              <TextInput
                style={{
                  width: '85%',
                  height: 45,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#DFE1E5',
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'flex-start',
                margin: 5,
              }}>
              <View style={{width: '100%', marginVertical: 10}}>
                <Text>초대</Text>
              </View>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 5,
                  backgroundColor: '#F2F2F2',
                }}>
                <Text>입주민</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                  }}>
                  <Text>전체선택</Text>
                  <RadioButton
                    value="Residents"
                    status={
                      selectAllChecked === 'Residents' ? 'checked' : 'unchecked'
                    }
                    onPress={() =>
                      setSelectAllChecked(prev =>
                        prev === 'Residents' ? '' : 'Residents',
                      )
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  // backgroundColor: 'blue',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 20,
                    // backgroundColor: 'red',
                  }}>
                  <Text style={{marginRight: 5}}>101호</Text>
                  <RadioButton
                    value="101"
                    status={
                      selectAllChecked === 'Residents' ? 'checked' : 'unchecked'
                    }
                    // onPress={() => setSelectAllChecked('Notice')}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 20,
                  }}>
                  <Text style={{marginRight: 5}}>102호</Text>
                  <RadioButton
                    value="102"
                    status={
                      selectAllChecked === 'Residents' ? 'checked' : 'unchecked'
                    }
                    // onPress={() => setSelectAllChecked('Common')}
                  />
                </View>
              </View>
            </View>
            <Spacing height={20} />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 5,
                backgroundColor: '#F2F2F2',
              }}>
              <Text>임대인</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <Text>전체선택</Text>
                <RadioButton
                  value="Landlords"
                  status={
                    selectAllChecked === 'Landlords' ? 'checked' : 'unchecked'
                  }
                  onPress={() =>
                    setSelectAllChecked(prev =>
                      prev === 'Landlords' ? '' : 'Landlords',
                    )
                  }
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                // backgroundColor: 'blue',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 20,
                  // backgroundColor: 'red',
                }}>
                <Text style={{marginRight: 5}}>101호</Text>
                <RadioButton
                  value="101"
                  status={
                    selectAllChecked === 'Landlords' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setSelectAllChecked('Landlords')}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                <Text style={{marginRight: 5}}>102호</Text>
                <RadioButton
                  value="102"
                  status={
                    selectAllChecked === 'Landlords' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setSelectAllChecked('Common')}
                />
              </View>
            </View>
            <Spacing height={20} />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 5,
                backgroundColor: '#F2F2F2',
              }}>
              <Text>공공기관</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <Text>전체선택</Text>
                <RadioButton
                  value="PublicInst"
                  status={
                    selectAllChecked === 'PublicInst' ? 'checked' : 'unchecked'
                  }
                  onPress={() =>
                    setSelectAllChecked(prev =>
                      prev === 'PublicInst' ? '' : 'PublicInst',
                    )
                  }
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                // backgroundColor: 'blue',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 20,
                  // backgroundColor: 'red',
                }}>
                <Text style={{marginRight: 5}}>주민센터</Text>
                <RadioButton
                  value="CommunityCenter"
                  status={
                    selectAllChecked === 'PublicInst' ||
                    selectCCChecked === 'CommunityCenter'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() =>
                    setSelectCCChecked(prev =>
                      prev === 'CommunityCenter' ? '' : 'CommunityCenter',
                    )
                  }
                />
              </View>
            </View>
            <Spacing height={20} />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 5,
                backgroundColor: '#F2F2F2',
              }}>
              <Text>건물관리자</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <Text>전체선택</Text>
                <RadioButton
                  value="BuildingManager"
                  status={
                    selectAllChecked === 'BuildingManager'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() =>
                    setSelectAllChecked(prev =>
                      prev === 'BuildingManager' ? '' : 'BuildingManager',
                    )
                  }
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                // backgroundColor: 'blue',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 20,
                  // backgroundColor: 'red',
                }}>
                <Text style={{marginRight: 5}}>관리인</Text>
                <RadioButton
                  value="Manager"
                  status={
                    selectAllChecked === 'BuildingManager' ||
                    selectManagerChecked === 'Manager'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() =>
                    setSelectManagerChecked(prev =>
                      prev === 'Manager' ? '' : 'Manager',
                    )
                  }
                />
              </View>
            </View>
            <Spacing height={50} />
            <CommonButton fontSize={15} text="확인" />
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
  separator: {
    backgroundColor: '#e0e0e0',
    marginRight: 20,
    width: 1,
    height: 55,
  },
});
