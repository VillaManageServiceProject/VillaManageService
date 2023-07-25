import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CommonButton} from '../components/Button';
import IconTitle from '../components/IconTitle';

export const JoinScreen = ({route}) => {
  return (
    <Container>
      <View
        style={{
          width: '70%',
          height: '70%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IconTitle
          IconType="MaterialCommunityIcons"
          IconName="account-multiple-plus-outline"
          title="계정만들기"
        />
        <Spacing height={40} />
        <CommonButton
          text="입주민"
          height={130}
          fontSize={23}
          onPress={() =>
            route.params.nav.navigate('ResidentsJoin', {
              navigation: route.params.nav,
            })
          }
        />
        <Spacing height={10} />
        <CommonButton
          text="임대인"
          height={130}
          fontSize={23}
          onPress={() =>
            route.params.nav.navigate('LandlordJoin', {
              navigation: route.params.nav,
            })
          }
        />
        <Spacing height={10} />
        <CommonButton
          text="공공기관"
          height={130}
          fontSize={23}
          onPress={() =>
            route.params.nav.navigate('CommunityCenteJoin', {
              navigation: route.params.nav,
            })
          }
        />
        <Spacing height={10} />
        <CommonButton
          text="건물관리자"
          height={130}
          fontSize={23}
          onPress={() =>
            route.params.nav.navigate('BuildingManagerJoin', {
              navigation: route.params.nav,
            })
          }
        />
      </View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Spacing = ({height}) => <View style={{height}} />;
