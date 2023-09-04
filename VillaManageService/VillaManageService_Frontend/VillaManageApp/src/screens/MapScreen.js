import React, {Component} from 'react';
import styled from 'styled-components/native';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import Icon from '../components/Icon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NaverMap from '../components/Map';
import ChatBoard from '../fragments/ChatBoard';
import {UserContext} from '../contexts/UserProvider';

// interface ScreenProps {
//     title?: String;
//     children?: React.ReactNode;
// }

class UnLoginedMapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      reRender: false,
      toggleGlobalTouched: false,
    };
  }

  handleSearch = query => {
    console.log('query: ', query);
    console.log('searchQuery: ', this.state.searchQuery);
    this.setState({reRender: !this.state.reRender});
    this.setState({searchQuery: query});
  };

  handleScreenTouch = () => {
    // this.textInputRef.current.blur();
    console.log('out');
    this.setState({toggleGlobalTouched: !this.state.toggleGlobalTouched});
  };

  render() {
    const {searchQuery, reRender, toggleGlobalTouched} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.foreground}>
          {/* <TouchableWithoutFeedback
            style={{zIndex: 1}}
            onPress={this.handleScreenTouch}> */}
          <View style={styles.header}>
            <View style={styles.left} />
            <View style={styles.center}>
              <SearchBar
                onSearch={this.handleSearch}
                toggleGlobalTouched={toggleGlobalTouched}
              />
            </View>
            <View style={styles.right}>
              <Icon
                IconType="Ionicons"
                IconName="key-outline"
                borderRadius={30}
                backgroundColor="white"
                onPress={() =>
                  // console.log(this.props.navigation)
                  this.props.navigation.navigate('Login', {
                    nav: this.props.navigation,
                  })
                }
              />
            </View>
          </View>
          {/* </TouchableWithoutFeedback> */}
          <View style={styles.body}></View>
        </View>
        <View style={styles.background}>
          <NaverMap
            searchQuery={searchQuery}
            reRender={reRender}
            // onPress={() => this.props.navigation.navigate('Villa')}
            nav={this.props.navigation}
            style={{flex: 1}}
            onTouchStart={this.handleScreenTouch}
          />
        </View>
      </SafeAreaView>
    );
  }
}

class LoginedMapScreen extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isFavoriteTouched: false,
      favoriteRecords: [],
      isChatListOpen: false,
      reRender: false,
      toggleGlobalTouched: false,
    };
  }

  handleToggleChatList = () => {
    console.log(!this.state.isChatListOpen);
    this.setState({isChatListOpen: !this.state.isChatListOpen});
    this.setState({isFavoriteTouched: false});
    this.setState({toggleGlobalTouched: true});
  };

  handleSearch = query => {
    console.log('searchQuery handleSearch: ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ', query);
    console.log(this.props.navigation.getState());
    this.setState({reRender: !this.state.reRender});
    this.setState({searchQuery: query});
    this.setState({isFavoriteTouched: false});
  };

  handleTouchFavorite = text => {
    this.setState({
      isFavoriteTouched: this.state.isFavoriteTouched ? false : true,
    });
    this.loadFavoriteRecords();
  };

  handleItemPress = item => {
    // this.textInputRef.current.value = item;
    // if (this.textInputRef.current) {
    //   this.textInputRef.current.setNativeProps({text: item});
    // }
    this.setState({
      searchQuery: item,
      isFavoriteTouched: false,
    });
  };

  loadFavoriteRecords = async () => {
    try {
      // const storedRecords = await AsyncStorage.getItem('searchRecords');
      // console.log(storedRecords);
      // if (storedRecords) {
      // this.setState({favoriteRecords: JSON.parse(storedRecords)});
      this.setState({favoriteRecords: this.context.userInfo.favorites});
      // }
    } catch (error) {
      console.log('Error loading favorite records:', error);
    }
  };

  handleScreenTouch = () => {
    // this.textInputRef.current.blur();
    console.log('out');
    this.setState({toggleGlobalTouched: !this.state.toggleGlobalTouched});
    this.setState({isFavoriteTouched: false});
  };

  render() {
    const {
      searchQuery,
      isFavoriteTouched,
      favoriteRecords,
      isChatListOpen,
      reRender,
      toggleGlobalTouched,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.foreground}>
          <View style={styles.header}>
            <View style={styles.left}>
              <Icon
                IconType="MaterialCommunityIcons"
                IconName="star-box-multiple-outline"
                backgroundColor="white"
                borderRadius={30}
                onPress={this.handleTouchFavorite}
              />
            </View>
            <View style={styles.center}>
              <SearchBar
                searchQuery={searchQuery}
                onSearch={this.handleSearch}
                toggleGlobalTouched={toggleGlobalTouched}
              />
            </View>
            <View style={styles.right}>
              <Icon
                IconType="MaterialCommunityIcons"
                IconName="account-cog-outline"
                backgroundColor="white"
                borderRadius={30}
                onPress={() =>
                  // console.log(this.props.navigation)
                  this.props.navigation.navigate('AccountSetting')
                }
              />
            </View>
          </View>
          <View
            style={{position: 'absolute', bottom: 25, right: 25, zIndex: 2}}>
            <Icon
              IconType="Ionicons"
              IconName="chatbubbles"
              borderRadius={30}
              backgroundColor="white"
              onPress={this.handleToggleChatList}
            />
          </View>

          {isFavoriteTouched && (
            <View>
              <FavoriteList
                data={favoriteRecords}
                renderItem={({item}) => (
                  <FavoriteListComp onPress={() => this.handleItemPress(item)}>
                    <AntDesign
                      name="staro"
                      size={20}
                      color="black"
                      style={{marginRight: 10}}
                      // borderRadius={30}
                      // onPress={() => this.props.navigation.navigate('Login')}
                    />
                    <Text>{item}</Text>
                  </FavoriteListComp>
                )}
                ListEmptyComponent={<EmptyListComponent />}
                keyExtractor={(item, index) => index.toString()}
                onLayout={
                  // e => console.log(e.nativeEvent.layout.height)
                  e =>
                    this.setState({
                      textInputHeight: e.nativeEvent.layout.height,
                    })
                }
                // style={{backgroundColor: 'red'}}
              />
            </View>
          )}
        </View>
        <View style={styles.background}>
          <NaverMap
            searchQuery={searchQuery}
            reRender={reRender}
            // onPress={() => this.props.navigation.navigate('Villa')}
            nav={this.props.navigation}
            style={{flex: 1}}
            onTouchStart={this.handleScreenTouch}
          />
          <ChatBoard onToggle={isChatListOpen} />
          {/* {isChatListOpen &&  */}
          {/* <ChatBoard onClose={this.handleToggleChatList} /> */}
          {/* } */}
        </View>
      </SafeAreaView>
    );
  }
}

const EmptyListComponent = () => {
  return (
    <View>
      <Text>등록된 즐겨찾기가 없습니다.</Text>
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
    // backgroundColor: 'yellow',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // zIndex: 1,
    // backgroundColor: 'red',
  },
  header: {
    // width: '100%',
    // height: 100,
    flexDirection: 'row',
    marginVertical: 10,
    // backgroundColor: 'red',
  },
  center: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 0,
    zIndex: 2,
    // backgroundColor: 'red',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const FavoriteList = styled.FlatList`
  width: 200px;
  padding-vertical: 10px;
  padding-horizontal: 15px;
  border-radius: 30px;
  margin-left: 15px;
  z-index: 3;
  background-color: white;
`;

const FavoriteListComp = styled.TouchableOpacity`
  width: 100%;
  border-radius: 10px;
  padding-vertical: 3px;
  flex-direction: row;
  background-color: white;
`;

export {UnLoginedMapScreen, LoginedMapScreen};
