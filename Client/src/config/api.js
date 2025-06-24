// API Configuration using environment variables
const API_CONFIG = {
  // Base URL - check if we're in development or production
  BASE_URL: import.meta.env.VITE_NODE_ENV === 'development'
    ? '/api'  // Use proxy in development
    : import.meta.env.VITE_API_PRODUCTION_URL || 'https://omsai-goldloan.onrender.com',

  // API Endpoints
  ENDPOINTS: {
    LOGIN: import.meta.env.VITE_API_LOGIN || '/',
    REGISTER: import.meta.env.VITE_API_REGISTER || '/register',
    VERIFY_TOKEN: import.meta.env.VITE_API_VERIFY_TOKEN || '/verify-token',
    CUSTOMERS: import.meta.env.VITE_API_CUSTOMERS || '/customerdetail',
    ADD_CUSTOMER: import.meta.env.VITE_API_ADD_CUSTOMER || '/addcustomer',
    UPDATE_CUSTOMER: import.meta.env.VITE_API_UPDATE_CUSTOMER || '/updatecustomer',
    DELETE_CUSTOMER: import.meta.env.VITE_API_DELETE_CUSTOMER || '/customer',
    GET_USERS: '/getusers'
  },
  
  // Configuration
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  RETRY_ATTEMPTS: parseInt(import.meta.env.VITE_RETRY_ATTEMPTS) || 3,
};

// Helper function to build full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get endpoint
export const getEndpoint = (endpointKey) => {
  return API_CONFIG.ENDPOINTS[endpointKey] || endpointKey;
};

// Export the full config
export default API_CONFIG;

// Environment info for debugging
export const ENV_INFO = {
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  BASE_URL: API_CONFIG.BASE_URL,
  IS_DEVELOPMENT: import.meta.env.VITE_NODE_ENV === 'development',
  IS_PRODUCTION: import.meta.env.VITE_NODE_ENV === 'production',
  ENABLE_DEBUG: import.meta.env.VITE_SHOW_DEBUG_INFO === 'true',
};

// Log API configuration in development
if (ENV_INFO.IS_DEVELOPMENT && ENV_INFO.ENABLE_DEBUG) {
  console.log('🔧 API Configuration:', {
    baseUrl: API_CONFIG.BASE_URL,
    environment: ENV_INFO.NODE_ENV,
    endpoints: API_CONFIG.ENDPOINTS
  });
}
