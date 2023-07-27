import axios from 'axios';

// const API_BASE_URL = 'http://210.91.9.65:8080';
const API_BASE_URL = 'http://14.39.9.98:8080';
// const API_BASE_URL = 'http://172.30.1.83:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// import CryptoJS from 'crypto-js';

// // Sample private data
// const privateData = {
//   name: 'John Doe',
//   birth: '1990-08-25', // This is the sensitive date field
//   // other fields...
// };

// // Encrypt the sensitive field (birth) using a secret key
// const secretKey = 'your_secret_key_here';
// const encryptedBirth = CryptoJS.AES.encrypt(privateData.birth, secretKey).toString();

// // Prepare the data to be sent to the server (with encrypted birth)
// const requestData = {
//   ...privateData,
//   birth: encryptedBirth,
// };

// // Now, you can send 'requestData' to the server using a secure HTTPS request
// // Be sure to handle decryption securely on the server-side before storing the data

export const signup = async ({userType, userData}) => {
  try {
    // const csrfToken = await getCSRFToken();
    console.log('/user/' + userType + '_signup');
    console.log(userData);
    const response = await api.post('/user/' + userType + '_signup', userData);

    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async credentials => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
