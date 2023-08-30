import React from 'react';
import styled from 'styled-components/native';
// import {Ionicons} from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TextButton = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-horizontal: 10px;
  background-color: white;
`;

export default props => {
  return (
    <TextButton onPress={props.onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 15,
            borderWidth: 1,
            marginRight: 15,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#1A73E840',
          }}>
          <MaterialCommunityIcons
            name={props.IconName}
            size={25}
            color="black"
          />
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
            }}>
            {props.title}
          </Text>
          <Spacing height={5} />
          <Text
            style={{
              color: 'black',
            }}>
            {props.text}
          </Text>
        </View>
      </View>
      <View>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 30,
            backgroundColor: '#FF383890',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>{props.newMessageCount}</Text>
        </View>
      </View>
    </TextButton>
  );
};

const Spacing = ({height}) => <View style={{height}} />;
