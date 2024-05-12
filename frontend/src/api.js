/* axios interceptor */
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Creating an Axios instance with base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env
    .VITE_API_URL /* import anything that specified in the .env */,
});

// Adding an interceptor to automatically attach authentication headers to requests
api.interceptors.request.use(
  // This function runs before each request
  (config) => {
    // Getting access token from local storage
    const access_token = localStorage.getItem(ACCESS_TOKEN);
    // If access token exists, add Authorization header with Bearer token
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    // Return modified request configuration
    return config;
  },
  // Error handler for interceptor
  (error) => {
    // Rejecting promise with the error
    return Promise.reject(error);
  }
);

export default api;
