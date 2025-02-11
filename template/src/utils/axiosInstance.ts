import axios from 'axios';
// import {storage} from './storage';

const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com/', // Replace with your API base URL
  headers: {
    Accept: 'application/json',
  },
});

let isRefreshing = false; // Flag to indicate if a token refresh is in progress
let refreshSubscribers: ((token: string) => void)[] = []; // Queue for pending requests during token refresh

function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function onTokenRefreshed(newToken: string) {
  refreshSubscribers.forEach(callback => callback(newToken));
  refreshSubscribers = [];
}

const MAX_RETRY_COUNT = 3; // Maximum number of retries for non-401 errors

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    // const accessToken = await storage.getItem('accessToken'); // Get the access token from storage
    // if (accessToken) {
    //   // Set the Authorization header
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }
    return config;
  },
  error => {
    // Handle request errors
    if (axios.isAxiosError(error)) {
      throw error.request?.data;
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error occurred.');
    }
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response, // Return the response if successful
  async error => {
    const {config, response} = error;

    // Retry non-401 errors up to MAX_RETRY_COUNT
    if (!response && config?.retryCount < MAX_RETRY_COUNT) {
      config.retryCount = (config.retryCount || 0) + 1; // Increment retry count
      return axiosInstance(config); // Retry the request
    }

    // Handle 401 errors for token refresh
    if (response?.status === 401 && !config._retry) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Notify all queued requests with the new token
          // TODO : Refresh your token here post that passed newToken in onTokenRefreshed
          onTokenRefreshed('');
          isRefreshing = false;
        } catch (err) {
          //   storage.deleteItem('accessToken');
          //   storage.deleteItem('refreshToken');
          throw err;
        }
      }

      // Queue the current request until the refresh is complete
      const retryOriginalRequest = new Promise(resolve => {
        subscribeTokenRefresh(newToken => {
          config._retry = true; // Mark the request as retried
          config.headers.Authorization = `Bearer ${newToken}`;
          resolve(axiosInstance(config)); // Retry the original request
        });
      });

      return retryOriginalRequest;
    } else {
      throw error;
    }
  },
);

export default axiosInstance;
