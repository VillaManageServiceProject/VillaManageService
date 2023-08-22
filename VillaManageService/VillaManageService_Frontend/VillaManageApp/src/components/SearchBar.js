import React, {Component} from 'react';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
// import {Ionicons} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from './Icon';

import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  FlatList,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Animatable.createAnimatableComponent(
const SearchTextInput = styled.TextInput`
  width: 90%;
  height: 100%;
  font-size: 15px;
`;
// padding-bottom: 0px;

const SearchView = styled.View`
  width: 100%;
  height: 53px;
  padding-horizontal: 15px;
  border-width: 1px;
  border-color: #dfe1e5;
  border-radius: 30px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
`;
// flex: 1;

const SearchArea = Animatable.createAnimatableComponent(styled.View`
  width: 100%;
  height: ${props => (props.touched ? 53 + props.height : 53)}px;
  border-width: 1px;
  border-color: #dfe1e5;
  border-radius: 30px;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
`);

const RecentSearchList = styled.FlatList`
  width: 100%;
  padding-vertical: 10px;
  padding-bottom: 40px;
  padding-horizontal: 15px;
  border-radius: 30px;
  flex: 1;
  background-color: white;
`;

const RecentSearchListComp = styled.TouchableOpacity`
  width: 100%;
  border-radius: 10px;
  padding-vertical: 2px;
  flex-direction: row;
  background-color: white;
`;

// text-align-vertical: top;///

// onChangeText={(search_address) => getRecentSearched(search_address)}
// export default () => {
//   return <SearchTextInput placeholder="Search Address" onFocus={() => this.setState({ isTextInputTouched: true, textInputHeight: 60 })}/>;
// };

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextInputTouched: false,
      textInputHeight: 53, // Initial height
      searchQuery: '',
      searchRecords: [],
    };
    this.textInputRef = React.createRef();
    // this.onPress = () => setCount(prevCount => prevCount + 1);
  }

  // componentDidMount() {
  //   const {isTextInputTouched, textInputHeight} = this.state;
  //   console.log(isTextInputTouched);
  //   console.log(textInputHeight);
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      console.log(
        'searchQuery componentDidUpdate: ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ',
        this.state.searchQuery,
      );
      this.handleItemPress(this.props.searchQuery);
    }
  }

  loadSearchRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem('searchRecords');
      console.log(storedRecords);
      if (storedRecords) {
        this.setState({searchRecords: JSON.parse(storedRecords)});
      }
    } catch (error) {
      console.log('Error loading search records:', error);
    }
  };

  handleInputFocus = text => {
    this.setState({isTextInputTouched: true});
    this.loadSearchRecords();
  };

  handleInputChange = text => {
    this.setState({searchQuery: text});
  };

  handleItemPress = item => {
    // this.textInputRef.current.value = item;
    console.log(
      'searchQuery handleItemPress: ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ',
      this.state.searchQuery,
    );
    if (this.textInputRef.current) {
      this.textInputRef.current.setNativeProps({text: item});
    }
    this.setState({
      searchQuery: item,
      isTextInputTouched: false,
    });
  };

  handleSearch = () => {
    console.log(
      'searchQuery SearchBarhandleSearch: ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ',
      this.state.searchQuery,
    );
    const {searchQuery, searchRecords} = this.state;
    this.props.onSearch(searchQuery);
    Keyboard.dismiss();
    this.setState({isTextInputTouched: false});

    // add the searchQuery to searchRecords
    if (searchQuery !== '' && !searchRecords.includes(searchQuery)) {
      const updatedRecords = [searchQuery, ...searchRecords].slice(0, 3);
      console.log(updatedRecords);
      this.setState({searchRecords: updatedRecords});

      // Save the updated searchRecords to AsyncStorage
      this.saveSearchRecords(updatedRecords);
    }
  };

  // handleScreenTouch = () => {
  //   this.textInputRef.current.blur();
  // };

  saveSearchRecords = async records => {
    try {
      const jsonRecords = JSON.stringify(records);
      await AsyncStorage.setItem('searchRecords', jsonRecords);
    } catch (error) {
      console.log('Error saving search records:', error);
    }
  };

  recentSearchList = () => {
    return searchRecords.map((record, index) => (
      <Text key={index}>{record}</Text>
    ));
  };

  render() {
    const {isTextInputTouched, textInputHeight, searchRecords} = this.state;

    return (
      <SearchArea
        // animation={isTextInputTouched ? 'slideInUp' : null}
        duration={500}
        touched={isTextInputTouched}
        height={textInputHeight}>
        <SearchView>
          {/* <TouchableWithoutFeedback onPress={this.handleScreenTouch}> */}
          <SearchTextInput
            placeholder="Search Address"
            onFocus={this.handleInputFocus}
            // onBlur={() => this.setState({isTextInputTouched: false})}/
            onChangeText={this.handleInputChange}
            // value={selectedRecord}
            ref={this.textInputRef}
          />
          {/* </TouchableWithoutFeedback> */}
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={this.handleSearch}>
            <Ionicons name="search" size={20} color="black" />
          </TouchableOpacity>
        </SearchView>
        {isTextInputTouched && (
          <RecentSearchList
            data={searchRecords}
            renderItem={({item}) => (
              <RecentSearchListComp onPress={() => this.handleItemPress(item)}>
                <Ionicons
                  name="timer-outline"
                  size={20}
                  color="black"
                  style={{marginRight: 10}}
                  // borderRadius={30}
                  // onPress={() => this.props.navigation.navigate('Login')}
                />
                <Text>{item}</Text>
              </RecentSearchListComp>
            )}
            keyExtractor={(item, index) => index.toString()}
            onLayout={
              // e => console.log(e.nativeEvent.layout.height)
              e => this.setState({textInputHeight: e.nativeEvent.layout.height})
            }
            // style={{backgroundColor: 'red'}}
          />
        )}
      </SearchArea>
    );
  }
}

{
  /* <FlatList
          data={searchRecords}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        /> */
}

export default SearchBar;
