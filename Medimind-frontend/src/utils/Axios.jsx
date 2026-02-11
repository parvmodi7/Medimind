import axios from 'axios';

const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://medimind-back-1.onrender.com';
const Instance = axios.create({
  baseURL,
  withCredentials: true,
})

Instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("utoken");

    // Check if token exists and contains only ASCII characters
    if (token && /^[\x00-\x7F]*$/.test(token)) {
      config.headers.utoken = token;
    } else if (token) {
      console.warn("Invalid token detected (non-ASCII characters), clearing token.");
      localStorage.removeItem("utoken");
    }

    return config;
  },
  (error) => {
    // Handle any request errors
    return Promise.reject(error);
  }
);


export default Instance;