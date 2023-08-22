import React, {createContext, useState} from 'react';

export const UserContext = createContext({
  isLoggedIn: '',
  userInfo: '',
  setIsLoggedIn: () => {},
  setUserInfo: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
});

export const UserProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = () => {
    // Your login logic here, if login is successful, set isLoggedIn to true
    console.log(isLoggedIn);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Your login logic here, if login is successful, set isLoggedIn to true
    setIsLoggedIn(false);
    setUserInfo(null);
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
