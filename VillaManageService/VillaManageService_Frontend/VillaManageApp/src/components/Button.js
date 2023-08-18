import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

const CommonButtonOpacity = styled.TouchableOpacity`
  width: 100%;
  height: ${props => (props.height === undefined ? 53 : props.height)}px;
  border-width: 1px;
  border-color: #dfe1e5;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-horizontal: 15px;
  background-color: ${props => props.backgroundColor};
`;
// ${(props) => props.borderRadius}

const SpecificButtonOpacity = styled.TouchableOpacity`
  width: ${props => (props.width === undefined ? '100%' : props.width + 'px')};
  height: ${props => (props.height === undefined ? 53 : props.height)}px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-horizontal: 15px;
  background-color: #f0f0f0;
`;

const CommonButton = props => {
  return (
    <CommonButtonOpacity
      height={props.height}
      backgroundColor={props.backgroundColor}
      onPress={props.onPress}>
      <Text
        style={{
          color: props.color === undefined ? 'black' : props.color,
          fontSize: props.fontSize,
          fontWeight:
            props.fontWeight === undefined ? 'bold' : props.fontWeight,
        }}>
        {props.text}
      </Text>
    </CommonButtonOpacity>
  );
};

const SpecificButton = props => {
  return (
    <SpecificButtonOpacity
      width={props.width}
      height={props.height}
      onPress={props.onPress}>
      <Text
        style={{
          color: '#9AA0A6',
          fontSize: props.fontSize,
          fontWeight: 'bold',
        }}>
        {props.text}
      </Text>
    </SpecificButtonOpacity>
  );
};

export {CommonButton, SpecificButton};
