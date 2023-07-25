import React from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';

const TitleView = styled.View`
  flex-direction: row;
`;

const TitleText = styled.Text`
  color: black;
  font-size: ${props => (props.fontSize === undefined ? 36 : props.fontSize)}px;
  font-weight: bold;
`;

export default props => {
  return (
    <TitleView>
      <View
        style={{
          justifyContent: 'center',
        }}>
        {props.IconType === 'MaterialIcons' && (
          <MaterialIcons
            name={props.IconName}
            size={23}
            color="#9AA0A6"
            style={{
              marginRight: 10,
            }}
          />
        )}
        {props.IconType === 'MaterialCommunityIcons' && (
          <MaterialCommunityIcons
            name={props.IconName}
            size={23}
            color="#9AA0A6"
            style={{
              marginRight: 10,
            }}
          />
        )}
      </View>
      <View
        style={{
          justifyContent: 'center',
          paddingBottom: 5,
        }}>
        <TitleText fontSize={props.fontSize}>{props.title}</TitleText>
      </View>
    </TitleView>
  );
};
