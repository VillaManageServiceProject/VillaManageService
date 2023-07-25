import React from 'react';
import styled from 'styled-components/native';
// import {Ionicons} from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    <View style={{}}>
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
  );
};

const Spacing = ({height}) => <View style={{height}} />;
