import React from 'react';
import styled from 'styled-components/native';
// import {Ionicons} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IconButton = styled.TouchableOpacity`
  width: ${props => (props.width === undefined ? 53 : props.width + 10)}px;
  height: ${props => (props.width === undefined ? 53 : props.width + 10)}px;
  border-width: ${props =>
    props.borderWidth === undefined ? 1 : props.borderWidth}px;
  border-color: #dfe1e5;
  border-radius: ${props =>
    props.borderRadius === undefined ? 30 : props.borderRadius}px;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.backgroundColor === undefined ? null : props.backgroundColor};
`;
// ${(props) => props.borderRadius}

export default props => {
  return (
    <IconButton
      width={props.size}
      borderWidth={props.borderWidth}
      borderRadius={props.borderRadius}
      backgroundColor={props.backgroundColor}
      onPress={props.onPress}>
      {props.IconType === 'Ionicons' && (
        <Ionicons
          name={props.IconName}
          size={props.size === undefined ? 25 : props.size}
          color={props.IconColor === undefined ? '#4F4F4F' : props.IconColor}
        />
      )}
      {props.IconType === 'AntDesign' && (
        <AntDesign
          name={props.IconName}
          size={props.size === undefined ? 25 : props.size}
          color={props.IconColor === undefined ? '#4F4F4F' : props.IconColor}
        />
      )}
      {props.IconType === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons
          name={props.IconName}
          size={props.size === undefined ? 25 : props.size}
          color={props.IconColor === undefined ? '#4F4F4F' : props.IconColor}
        />
      )}
    </IconButton>
  );
};
