import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';
import IconInput from '../components/IconInput';
import {CommonButton} from '../components/Button';
import TextButton from '../components/TextButton';
import IconTitle from '../components/IconTitle';

// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');

// const handleLogin = async () => {
//   try {
//     const credentials = {email, password};
//     const response = await login(credentials);
//     // Handle successful login
//     console.log(response);
//   } catch (error) {
//     // Handle login error
//     Alert.alert('Login Failed', error.message);
//   }
// };

export const LoginScreen = ({route}) => {
  return (
    <Container>
      <View
        style={{
          width: '70%',
          height: '70%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IconTitle IconType="MaterialIcons" IconName="login" title="Login" />
        <Spacing height={40} />
        <IconInput IconName="person-outline" placeholder="아이디" />
        <Spacing height={10} />
        <IconInput IconName="key-outline" placeholder="비밀번호" />
        <Spacing height={15} />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextButton
            Icon="true"
            IconName="checkmark-circle-outline"
            text="자동로그인"
          />
          <TextButton Icon="false" text="아이디/비밀번호 찾기" />
        </View>
        <Spacing height={15} />
        <CommonButton text="로그인" />
        <Spacing height={10} />
        <CommonButton
          text="회원가입"
          onPress={() =>
            route.params.nav.navigate('Join', {
              nav: route.params.nav,
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
