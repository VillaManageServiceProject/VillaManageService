import React from 'react';
import styled from 'styled-components/native';
// import {Ionicons} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'react-native';

const TextButton = styled.TouchableOpacity`
  width: ${props => (props.width === undefined ? 'auto' : props.width + '%')};
  height: ${props =>
    props.height === undefined ? 'auto' : props.height + '%'};
  border-radius: 30px;
  align-items: center;
  justify-content: ${props =>
    props.justifyContent === undefined ? 'center' : props.justifyContent};
  flex-direction: row;
  padding-horizontal: ${props =>
    props.paddingHorizontal === undefined ? 0 : props.paddingHorizontal}px;
  background-color: ${props => props.backgroundColor};
`;

export default props => {
  return (
    <TextButton
      backgroundColor={props.backgroundColor}
      paddingHorizontal={props.paddingHorizontal}
      width={props.width}
      height={props.height}
      justifyContent={props.justifyContent}
      onPress={props.onPress}>
      <View>
        {props.IconType === 'Ionicons' && (
          <Ionicons
            name={props.IconName}
            size={props.IconSize ? props.IconSize : 25}
            color={props.IconColor ? props.IconColor : '#9AA0A6'}
            style={{marginRight: 10}}
          />
        )}
        {props.IconType === 'MaterialCommunityIcons' && (
          <MaterialCommunityIcons
            name={props.IconName}
            size={props.IconSize ? props.IconSize : 25}
            color={props.IconColor ? props.IconColor : '#9AA0A6'}
            style={{marginRight: 10}}
          />
        )}
        {props.IconType === 'AntDesign' && (
          <AntDesign
            name={props.IconName}
            size={props.IconSize ? props.IconSize : 25}
            color={props.IconColor ? props.IconColor : '#9AA0A6'}
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
