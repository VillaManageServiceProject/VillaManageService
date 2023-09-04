import React from 'react';
import styled from 'styled-components/native';
// import {Ionicons} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput, View, Text} from 'react-native';

const IconInputView = styled.View`
  width: 100%;
  height: 53px;
  border-width: 1px;
  border-color: #dfe1e5;
  border-radius: 20px;
  align-items: center;
  flex-direction: row;
  padding-horizontal: 15px;
  background-color: white;
`;
// ${(props) => props.borderRadius}

export default props => {
  return (
    <IconInputView>
      {props.Icon !== 'none' && (
        <View>
          <Ionicons
            name={props.IconName}
            size={20}
            color="#9AA0A6"
            style={{marginRight: 10}}
          />
        </View>
      )}

      <View style={{width: '100%'}}>
        {props.title !== 'none' && (
          <View
            style={{
              position: 'absolute',
              top: -10,
              left: 0,
              backgroundColor: 'white',
              paddingHorizontal: 5,
            }}>
            <Text>{props.title}</Text>
          </View>
        )}
        <TextInput
          value={props.value}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry}
        />
      </View>
    </IconInputView>
  );
};
