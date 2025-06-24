import axios from 'axios';

export const checkServerStatus = async () => {
  try {
    console.log('Checking server status...');
    const response = await axios.get('/api/customerdetail', {
      timeout: 5000 // 5 second timeout for status check
    });
    console.log('Server is responsive');
    return { status: 'online', data: response.data };
  } catch (error) {
    console.log('Server check failed:', error.message);
    
    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_INSUFFICIENT_RESOURCES') {
      return { 
        status: 'offline', 
        message: 'Server is currently unavailable. It might be starting up or experiencing issues.' 
      };
    } else if (error.code === 'ECONNABORTED') {
      return { 
        status: 'slow', 
        message: 'Server is responding slowly. Please wait a moment and try again.' 
      };
    } else {
      return { 
        status: 'error', 
        message: 'Unable to connect to server. Please check your internet connection.' 
      };
    }
  }
};

export const waitForServer = async (maxAttempts = 3, delay = 3000) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`Server check attempt ${attempt}/${maxAttempts}`);
    
    const result = await checkServerStatus();
    
    if (result.status === 'online') {
      return result;
    }
    
    if (attempt < maxAttempts) {
      console.log(`Waiting ${delay/1000} seconds before next attempt...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return { 
    status: 'failed', 
    message: 'Server is not responding after multiple attempts. Please try again later.' 
  };
};
