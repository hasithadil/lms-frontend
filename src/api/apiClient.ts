import axios from 'axios';
import keycloak from '../keycloak';

// ============================================
// Create Axios Instance with Base URL
// ============================================
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// Request Interceptor - Adds JWT Token to ALL Requests
// ============================================
apiClient.interceptors.request.use(
  (config) => {
    // Get token from Keycloak
    const token = keycloak.token;
    
    if (token) {
      // Add Authorization header with Bearer token
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token added to request:', config.url);
    } else {
      console.warn('⚠️ No token available for request:', config.url);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// Response Interceptor - Handle Errors
// ============================================
apiClient.interceptors.response.use(
  (response) => {
    // Successful response - return as is
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      const status = error.response.status;
      
      if (status === 401) {
        // Unauthorized - token expired or invalid
        console.error('❌ 401 Unauthorized - Please login again');
        // Optionally redirect to login
        keycloak.login();
      } else if (status === 403) {
        // Forbidden - user doesn't have permission
        console.error('❌ 403 Forbidden - Access denied');
      } else {
        console.error(`❌ API Error ${status}:`, error.response.data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('❌ Network error - no response from server');
    } else {
      // Something else went wrong
      console.error('❌ Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;