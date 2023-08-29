import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SpecificButton} from '../components/Button';
import DatePicker from 'react-native-date-picker';
import {RadioButton} from 'react-native-paper';
import {CommonButton} from '../components/Button';
import {requestGET, requestPOST} from '../api';
import {VillaContext} from '../contexts/VillaProvider';

export const AddChatScreen = ({route}) => {
  const navigation = useNavigation();
  // const {villaId, villaLocalCC, villaHouses, villaBM} =
  //   useContext(VillaContext);

  const mapping = {
    residents: '입주민',
    landlords: '임대인',
    ccs: '주민센터',
    bms: '건물관리자',
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDateStartPickerOpened, setDateStartPickerOpen] = useState(false);
  const [isDateEndPickerOpened, setDateEndPickerOpen] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState('');
  const [selectManagerChecked, setSelectManagerChecked] = useState('');
  const [selectCCChecked, setSelectCCChecked] = useState('');
  const [defaultName, setDefaultName] = useState('');
  const [chatRoomInvitees, setChatRoomInvitees] = useState([
    {
      villaId: '',
      villaAddress: '',
      residents: [],
      landlords: [],
      ccs: [],
      bms: [],
    },
  ]);
  const [chatRoomInfo, setChatRoomInfo] = useState({
    name: '',
    invitees: [
      {
        villaId: '',
        villaAddress: '',
        residents: [],
        landlords: [],
        ccs: [],
        bms: [],
      },
    ],
  });

  useFocusEffect(
    React.useCallback(() => {
      requestGetChatMembers();

      return () => {
        console.log('ScreenOne is unfocused');
      };
    }, []),
  );

  useEffect(() => {
    createDefaultName();
  }, [chatRoomInvitees]);

  const requestGetChatMembers = async () => {
    try {
      const response = await requestGET(`/chat/chatMembers`);

      setChatRoomInvitees(
        response.map(({residents, landlords, ccs, bms, ...rest}) => ({
          ...rest,
          residents: [],
          landlords: [],
          ccs: [],
          bms: [],
        })),
      );
      setChatRoomInfo(prev => ({...prev, invitees: response}));
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

  const createChatRoom = async () => {
    try {
      let payload = null;
      if (chatRoomInfo.name === '') {
        // let output = [];

        // Object.keys(invitees).forEach(key => {
        //   const value = invitees[key];

        //   if (Array.isArray(value)) {
        //     value.forEach(name => output.push(`${mapping[key]} ${name}`));
        //   } else if (value === true) {
        //     output.push(mapping[key]);
        //   }
        // });

        const defaultName = createDefaultName();

        payload = {
          name: defaultName,
          invitees: chatRoomInvitees,
        };
      } else {
        payload = {
          name: chatRoomInfo.name,
          invitees: chatRoomInvitees,
        };
      }

      const response = await requestPOST('/chat/createRoom', payload);

      console.log(response);
      navigation.navigate('LoginedMap');
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

  const createDefaultName = () => {
    let output = [];

    Object.keys(chatRoomInvitees).forEach(key => {
      const value = chatRoomInvitees[key];

      if (Array.isArray(value)) {
        value.forEach(name => output.push(`${mapping[key]} ${name}`));
      }
      // else if (value === true) {
      //   output.push(mapping[key]);
      // }
    });

    setDefaultName(output.join(', '));
    return output.join(', ');
  };

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
                placeholder={defaultName}
                onChangeText={text =>
                  setChatRoomInfo(prev => ({...prev, name: text}))
                }
              />
            </View>
            {chatRoomInfo.invitees.map((members, index) => (
              <View style={{width: '100%'}}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // justifyContent: 'flex-start',
                    margin: 5,
                  }}>
                  <View style={{width: '100%', marginVertical: 10}}>
                    <Text>{members.villaAddress}</Text>
                  </View>
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
                          chatRoomInvitees[index].residents.length ===
                            members.residents.length &&
                          members.residents.length !== 0
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          console.log(chatRoomInvitees);
                          setChatRoomInvitees(prev =>
                            prev.map(item => {
                              if (item.villaId === members.villaId) {
                                if (item.residents.length > 0) {
                                  return {...item, residents: []};
                                } else {
                                  return {
                                    ...item,
                                    residents: members.residents,
                                  };
                                }
                              }
                              return item;
                            }),
                          );
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      // backgroundColor: 'blue',
                    }}>
                    {/* {members.residents.map((house, index) => ( */}
                    <FlatList
                      data={members.residents}
                      renderItem={({item}) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: 10,
                          }}>
                          <Text style={{marginRight: 5}}>{item}</Text>
                          <RadioButton
                            value={item}
                            status={
                              chatRoomInvitees[index].residents.includes(item)
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() => {
                              console.log(chatRoomInvitees);
                              setChatRoomInvitees(prev =>
                                prev.map(address => {
                                  if (address.villaId === members.villaId) {
                                    if (address.residents.includes(item))
                                      return {
                                        ...address,
                                        residents: address.residents.filter(
                                          resident => resident !== item,
                                        ),
                                      };
                                    else {
                                      return {
                                        ...address,
                                        residents: [...address.residents, item],
                                      };
                                    }
                                  }
                                }),
                              );
                            }}
                          />
                        </View>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={4} // n은 원하는 열의 개수
                    />
                    {/* <View
                        style={{
                          // position: 'absolute',
                          // top: 50,
                          // right: 30,
                          flexDirection: 'row',
                          alignItems: 'center',
                          margin: 10,
                          backgroundColor: 'red',
                        }}>
                        <Text style={{marginRight: 5}}>{house}</Text>
                        <RadioButton
                          value={house}
                          status={
                            selectAllChecked === 'Residents'
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={(value, status) =>
                            status
                              ? setChatRoomInfo({
                                  ...prev,
                                  invitees: [...invitees, value],
                                })
                              : null
                          }
                        />
                      </View> */}
                    {/* ))} */}
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
                          chatRoomInvitees[index].landlords.length ===
                            members.landlords.length &&
                          members.landlords.length !== 0
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          console.log(chatRoomInvitees);
                          setChatRoomInvitees(prev =>
                            prev.map(item => {
                              if (item.villaId === members.villaId) {
                                if (item.landlords.length > 0) {
                                  return {...item, landlords: []};
                                } else {
                                  return {
                                    ...item,
                                    landlords: members.landlords,
                                  };
                                }
                              }
                              return item;
                            }),
                          );
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      // backgroundColor: 'blue',
                    }}>
                    {/* {members.landlords.map((house, index) => ( */}
                    <FlatList
                      data={members.landlords}
                      renderItem={({item}) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: 10,
                            // backgroundColor: 'red',
                          }}>
                          <Text style={{marginRight: 5}}>{item}</Text>
                          <RadioButton
                            value={item}
                            status={
                              chatRoomInvitees[index].landlords.includes(item)
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() => {
                              console.log(chatRoomInvitees);
                              setChatRoomInvitees(prev =>
                                prev.map(address => {
                                  if (address.villaId === members.villaId) {
                                    if (address.landlords.includes(item))
                                      return {
                                        ...address,
                                        landlords: address.landlords.filter(
                                          landlord => landlord !== item,
                                        ),
                                      };
                                    else {
                                      return {
                                        ...address,
                                        landlords: [...address.landlords, item],
                                      };
                                    }
                                  }
                                }),
                              );
                            }}
                          />
                        </View>
                        // ))}
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={4} // n은 원하는 열의 개수
                    />
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
                    <Text>주민센터</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // backgroundColor: 'red',
                      }}>
                      <Text>전체선택</Text>
                      <RadioButton
                        value="CommunityCenter"
                        status={
                          chatRoomInvitees[index].ccs.length ===
                            members.ccs.length && members.ccs.length !== 0
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          console.log(chatRoomInvitees);
                          setChatRoomInvitees(prev =>
                            prev.map(item => {
                              if (item.villaId === members.villaId) {
                                if (item.ccs.length > 0) {
                                  return {...item, ccs: []};
                                } else {
                                  return {
                                    ...item,
                                    ccs: members.ccs,
                                  };
                                }
                              }
                              return item;
                            }),
                          );
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      // backgroundColor: 'blue',
                    }}>
                    {/* {members.landlords.map((house, index) => ( */}
                    <FlatList
                      data={members.ccs}
                      renderItem={({item}) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: 10,
                            // backgroundColor: 'red',
                          }}>
                          <Text style={{marginRight: 5}}>{item}</Text>
                          <RadioButton
                            value={item}
                            status={
                              chatRoomInvitees[index].ccs.includes(item)
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() => {
                              console.log(chatRoomInvitees);
                              setChatRoomInvitees(prev =>
                                prev.map(address => {
                                  if (address.villaId === members.villaId) {
                                    if (address.ccs.includes(item))
                                      return {
                                        ...address,
                                        ccs: address.ccs.filter(
                                          cc => cc !== item,
                                        ),
                                      };
                                    else {
                                      return {
                                        ...address,
                                        ccs: [...address.ccs, item],
                                      };
                                    }
                                  }
                                }),
                              );
                            }}
                          />
                        </View>
                        // ))}
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={4} // n은 원하는 열의 개수
                    />
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
                          chatRoomInvitees[index].bms.length ===
                            members.bms.length && members.bms.length !== 0
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          console.log(chatRoomInvitees);
                          setChatRoomInvitees(prev =>
                            prev.map(item => {
                              if (item.villaId === members.villaId) {
                                if (item.bms.length > 0) {
                                  return {...item, bms: []};
                                } else {
                                  return {
                                    ...item,
                                    bms: members.bms,
                                  };
                                }
                              }
                              return item;
                            }),
                          );
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      // backgroundColor: 'blue',
                    }}>
                    {/* {members.landlords.map((house, index) => ( */}
                    <FlatList
                      data={members.bms}
                      renderItem={({item}) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: 10,
                            // backgroundColor: 'red',
                          }}>
                          <Text style={{marginRight: 5}}>{item}</Text>
                          <RadioButton
                            value={item}
                            status={
                              chatRoomInvitees[index].bms.includes(item)
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() => {
                              console.log(chatRoomInvitees);
                              setChatRoomInvitees(prev =>
                                prev.map(address => {
                                  if (address.villaId === members.villaId) {
                                    if (address.bms.includes(item))
                                      return {
                                        ...address,
                                        bms: address.bms.filter(
                                          bm => bm !== item,
                                        ),
                                      };
                                    else {
                                      return {
                                        ...address,
                                        bms: [...address.bms, item],
                                      };
                                    }
                                  }
                                }),
                              );
                            }}
                          />
                        </View>
                        // ))}
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={4} // n은 원하는 열의 개수
                    />
                  </View>
                </View>
              </View>
            ))}
            <Spacing height={50} />
            <CommonButton fontSize={15} text="확인" onPress={createChatRoom} />
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
    // backgroundColor: 'red',
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
