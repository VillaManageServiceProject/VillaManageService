import React, {createContext, useState} from 'react';

export const UserContext = createContext({
  isLoggedIn: '',
  userInfo: {},
  setIsLoggedIn: () => {},
  setUserInfo: () => {},
  setUserType: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
});

export const UserProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({name: '비회원', role: 'ananymous'});

  const handleLogin = () => {
    // Your login logic here, if login is successful, set isLoggedIn to true
    console.log(isLoggedIn);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Your login logic here, if login is successful, set isLoggedIn to true
    setIsLoggedIn(false);
    setUserInfo({name: '비회원', role: 'ananymous'});
  };

  return (
    <UserContext.Provider
      value={{
        handleLogin,
        handleLogout,
        isLoggedIn,
        userInfo,
        setUserInfo,
        setIsLoggedIn,
      }}>
      {children}
    </UserContext.Provider>
  );
};
