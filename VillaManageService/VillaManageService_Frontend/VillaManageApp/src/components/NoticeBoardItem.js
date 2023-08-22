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
  background-color: ${props =>
    props.backgroundColor === undefined ? 'white' : props.backgroundColor};
`;

export default props => {
  return (
    <TextButton onPress={props.onPress} backgroundColor={props.backgroundColor}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {props.noticeType === 'important' && (
          <View>
            <AntDesign
              name="exclamationcircle"
              size={25}
              color="#FF383890"
              style={{marginRight: 15}}
            />
          </View>
        )}
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
        <Text>{props.createDate}</Text>
      </View>
    </TextButton>
  );
};

const Spacing = ({height}) => <View style={{height}} />;
