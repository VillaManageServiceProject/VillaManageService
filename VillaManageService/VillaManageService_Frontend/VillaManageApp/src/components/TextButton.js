import React from 'react';
import styled from 'styled-components/native';
// import {Ionicons} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'react-native';

const TextButton = styled.TouchableOpacity`
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-horizontal: 10px;
  background-color: ${props => props.backgroundColor};
`;

export default props => {
  return (
    <TextButton backgroundColor={props.backgroundColor} onPress={props.onPress}>
      <View>
        {props.IconType === 'Ionicons' && (
          <Ionicons
            name={props.IconName}
            size={25}
            color="#9AA0A6"
            style={{marginRight: 10}}
          />
        )}
        {props.IconType === 'MaterialCommunityIcons' && (
          <MaterialCommunityIcons
            name={props.IconName}
            size={25}
            color="#9AA0A6"
            style={{marginRight: 10}}
          />
        )}
      </View>
      <View>
        <Text
          style={{
            color: `${props.fontColor ? props.fontColor : 'black'}`,
          }}>
          {props.text}
        </Text>
      </View>
    </TextButton>
  );
};
