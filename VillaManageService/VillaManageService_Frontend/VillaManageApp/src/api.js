import axios from 'axios';

// const API_BASE_URL = 'http://210.91.9.65:8080';
const API_BASE_URL = 'http://14.39.9.5:8080';
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
    console.log('/user/signup/' + userType);
    console.log(userData);
    const response = await api.post('/user/signup/' + userType, userData);
    // const response = await api.post('/user/signup/' + userType, userData);

    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async ({credentials}) => {
  try {
    console.log(credentials);
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkSession = async () => {
  // try {
  const response = await api.get('/checkSession');
  console.log(response);
  // } catch (error) {
  //   console.log(error);
  // }
};

const handleAuthenticatedRequest = async () => {
  try {
    // Make a subsequent authenticated request to the server with the stored session identifier in the request headers.
    const response = await axios.get(`${baseURL}/some/protected/resource`, {
      headers: {
        Cookie: `JSESSIONID=${storedSessionId}`,
      },
    });

    // Handle the response from the server (e.g., display the result)
    console.log(response.data);
  } catch (error) {
    // Handle the error for the authenticated request
    console.error(error);
  }
};
