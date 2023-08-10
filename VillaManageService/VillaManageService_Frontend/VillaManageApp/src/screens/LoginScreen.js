import React, {useState, useContext} from 'react';
import {UserContext} from '../context/UserProvider';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {View, Text} from 'react-native';
import IconInput from '../components/IconInput';
import {CommonButton} from '../components/Button';
import TextButton from '../components/TextButton';
import IconTitle from '../components/IconTitle';
import {login, checkSession} from '../api';

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

// export const LoginScreen = ({route, handleLogin}) => {
export const LoginScreen = ({route}) => {
  const navigation = useNavigation();

  const {userInfo, setUserInfo, handleLogin} = useContext(UserContext);
  const [submitError, setSubmitError] = useState('');

  const [userData, setUserData] = useState({
    id: '',
    password: '',
  });

  const handleFormSubmit = async () => {
    try {
      const response = await login({credentials: userData});
      // Handle the response from the signup API
      console.log(response);

      if (response === 200) {
        console.log('hi3');
        handleLogin();
        setUserInfo(response.data);
      }
    } catch (error) {
      if (error.response) {
        // The server responded with a status other than 2xx
        console.log('Response Data:', error.response.data);
        console.log('Response Status:', error.response.status);
        console.log('Response Headers:', error.response.headers);

        setSubmitError(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Request:', error.request);
      } else {
        // Something happened in setting up the request
        console.log('Error:', error.message);
      }
    }

    // const response = await checkSession();
  };

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
        <IconInput
          IconName="person-outline"
          placeholder="아이디"
          onChangeText={text => setUserData(prev => ({...prev, id: text}))}
        />
        <Spacing height={10} />
        <IconInput
          IconName="key-outline"
          placeholder="비밀번호"
          onChangeText={text =>
            setUserData(prev => ({...prev, password: text}))
          }
        />
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
        <Text style={{color: 'red'}}>{submitError}</Text>
        <Spacing height={15} />
        <CommonButton text="로그인" onPress={handleFormSubmit} />
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
