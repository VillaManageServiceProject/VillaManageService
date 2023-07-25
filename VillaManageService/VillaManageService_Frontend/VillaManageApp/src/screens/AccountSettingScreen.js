import React, {useState} from 'react';
import styled from 'styled-components/native';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import IconInput from '../components/IconInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CommonButton, SpecificButton} from '../components/Button';
import TextButton from '../components/TextButton';
import IconTitle from '../components/IconTitle';
import Icon from '../components/Icon';
import DatePicker from 'react-native-date-picker';
import Postcode from '@actbase/react-daum-postcode';
import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';

export const AccountSettingScreen = ({route}) => {
  const navigation = useNavigation();
  // const {addressData} = route.params;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabIndex, setTabIndex] = React.useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isModal, setModal] = useState(false);
  const [position, setPosition] = React.useState('');
  const [newFavoriteAddress, setNewFavoriteAddress] = useState('');
  const [favoriteRecordes, setFavoriteRecordes] = useState(['a', 'b']);

  const handleTabsChange = index => {
    setTabIndex(index);
  };

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
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
    }
  };

  const handleDeletePress = index => {
    console.log(favoriteRecordes);
    const updatedRecords = [
      ...favoriteRecordes.slice(0, index),
      ...favoriteRecordes.slice(index + 1),
    ];
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
          IconName="account-cog-outline"
          title="계정 정보"
          fontSize={30}
        />
        <Spacing height={40} />
        <View style={styles.section}>
          <View style={styles.borderTextArea}>
            <Text>즐겨찾기</Text>
          </View>
          <FavoriteArea>
            <FavoriteView>
              {/* <TouchableWithoutFeedback onPress={this.handleScreenTouch}> */}
              <FavoriteTextInput
                placeholder="Add Favorite"
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
  section: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
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
