import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const [refreshTimeout, setRefreshTimeout] = useState(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [sessionWarningShown, setSessionWarningShown] = useState(false);

  // Set up axios interceptor for token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Constants for session management
  const DEBUG_MODE = false; // Set to true for testing with shorter timeouts (2 min instead of 30 min)
  const SESSION_DURATION = DEBUG_MODE ? 2 * 60 * 1000 : 30 * 60 * 1000; // 2 min for debug, 30 min for production
  const WARNING_TIME = DEBUG_MODE ? 30 * 1000 : 5 * 60 * 1000; // 30 sec for debug, 5 min for production
  const REFRESH_INTERVAL = DEBUG_MODE ? 1 * 60 * 1000 : 25 * 60 * 1000; // 1 min for debug, 25 min for production

  // Generate new token (simulate token refresh)
  const generateNewToken = () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `token_${timestamp}_${randomString}`;
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      console.log('🔄 Refreshing token...');

      // In a real app, you would call your backend to refresh the token
      // For now, we'll simulate it by generating a new token
      const newToken = generateNewToken();

      // Update token in state and localStorage
      setToken(newToken);
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('tokenTimestamp', Date.now().toString());

      // Update axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      console.log('✅ Token refreshed successfully');
      toast.success('Session refreshed automatically', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
      });

      // Reset timers
      setupAutoLogout();

      return true;
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      toast.error('Session refresh failed. Please login again.');
      logout();
      return false;
    }
  };

  // Show session warning
  const showSessionWarning = () => {
    if (!sessionWarningShown) {
      setSessionWarningShown(true);
      toast.warning('Your session will expire in 5 minutes. Activity will extend your session.', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        onClose: () => setSessionWarningShown(false)
      });
    }
  };

  // Auto logout after 30 minutes with token refresh
  const setupAutoLogout = () => {
    console.log('🔧 Setting up auto logout timers');
    console.log('Current time:', new Date().toLocaleTimeString());
    console.log('Session will expire at:', new Date(Date.now() + SESSION_DURATION).toLocaleTimeString());

    // Clear existing timeouts
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      console.log('Cleared existing session timeout');
    }
    if (refreshTimeout) {
      clearTimeout(refreshTimeout);
      console.log('Cleared existing refresh timeout');
    }

    // Reset warning flag
    setSessionWarningShown(false);

    // Set up token refresh (25 minutes)
    const refreshTimer = setTimeout(() => {
      refreshToken();
    }, REFRESH_INTERVAL);

    // Set up session warning (25 minutes)
    const warningTimer = setTimeout(() => {
      showSessionWarning();
    }, SESSION_DURATION - WARNING_TIME);

    // Set up auto logout (30 minutes)
    const logoutTimer = setTimeout(() => {
      console.log('⏰ Session expired - auto logout triggered');
      console.log('Current time:', new Date().toLocaleTimeString());
      console.log('Session duration:', SESSION_DURATION / 1000 / 60, 'minutes');

      // Show logout message first
      toast.error('Session expired. Redirecting to login...', {
        position: "top-center",
        autoClose: 2000,
      });

      // Force logout with complete page refresh after short delay
      setTimeout(() => {
        logout(true, true); // Force redirect with page refresh
      }, 2000);
    }, SESSION_DURATION);

    setRefreshTimeout(refreshTimer);
    setSessionTimeout(logoutTimer);

    // Store session start time
    localStorage.setItem('sessionStartTime', Date.now().toString());

    console.log('✅ Auto logout timers set successfully');
    console.log('Refresh timer ID:', refreshTimer);
    console.log('Logout timer ID:', logoutTimer);
  };

  // Reset auto logout timer on user activity
  const resetAutoLogout = () => {
    if (token) {
      const now = Date.now();
      setLastActivity(now);

      // Only reset if there's been significant activity (prevent too frequent resets)
      const timeSinceLastReset = now - lastActivity;
      if (timeSinceLastReset > 60000) { // 1 minute threshold
        console.log('🔄 Resetting session timer due to user activity');
        setupAutoLogout();

        // Reset warning flag if user is active
        if (sessionWarningShown) {
          setSessionWarningShown(false);
        }
      }
    }
  };

  // Check session validity
  const checkSessionValidity = () => {
    const sessionStart = localStorage.getItem('sessionStartTime');
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');

    if (!sessionStart || !tokenTimestamp) {
      return false;
    }

    const now = Date.now();
    const sessionAge = now - parseInt(sessionStart);
    const tokenAge = now - parseInt(tokenTimestamp);

    // Session is valid if less than 30 minutes old
    return sessionAge < SESSION_DURATION && tokenAge < SESSION_DURATION;
  };

  // Set up activity listeners
  useEffect(() => {
    if (!token) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    const handleActivity = () => {
      resetAutoLogout();
    };

    // Add throttling to prevent excessive calls
    let throttleTimer = null;
    const throttledActivity = () => {
      if (throttleTimer) return;

      throttleTimer = setTimeout(() => {
        handleActivity();
        throttleTimer = null;
      }, 5000); // Throttle to once every 5 seconds
    };

    events.forEach(event => {
      document.addEventListener(event, throttledActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, throttledActivity, true);
      });
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
    };
  }, [token]);

  // Complete session cleanup function
  const completeSessionCleanup = () => {
    console.log('🧹 Performing complete session cleanup');

    // Clear all possible authentication-related storage
    const keysToRemove = [
      'authToken', 'sessionStartTime', 'tokenTimestamp',
      'user', 'lastActivity', 'sessionWarning'
    ];

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    // Clear any cached data
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }

    console.log('✅ Session cleanup completed');
  };

  // Initialize auth on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      console.log('🚀 App startup - checking stored token:', !!storedToken);

      if (storedToken) {
        // Check if session is still valid
        if (checkSessionValidity()) {
          console.log('✅ Valid session found, restoring authentication');

          // Set token and create user session
          setToken(storedToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

          // Create user session based on stored token
          const userData = {
            id: 'admin',
            name: 'Admin',
            email: 'admin@omsai.com'
          };

          setUser(userData);
          setupAutoLogout();

          toast.success('Welcome back! Session restored.', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
          });
        } else {
          console.log('❌ Session expired, clearing stored data');
          // Complete cleanup for expired session
          completeSessionCleanup();

          toast.warning('Previous session expired. Please login again.', {
            position: "top-center",
            autoClose: 5000,
          });
        }
      } else {
        console.log('ℹ️ No stored token found');
      }
      setLoading(false);
    };

    // Add page visibility change listener for additional cleanup
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Check session validity when page becomes visible
        if (token && !checkSessionValidity()) {
          console.log('🔍 Session expired while page was hidden');
          logout(true, true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    initializeAuth();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://omsai-goldloan.onrender.com/', {
        email,
        password
      });

      console.log('Login response:', response.data); // Debug log

      if (response.data.message === 'success') {
        // Check if server returns token and user data
        const newToken = response.data.token || `temp_token_${Date.now()}`;
        const userData = response.data.user || {
          id: 'admin',
          name: 'Admin',
          email: email
        };

        console.log('Setting token and user:', { newToken, userData }); // Debug log

        // Set token and user state synchronously
        setToken(newToken);
        setUser(userData);

        // Store token and timestamps
        const now = Date.now();
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('sessionStartTime', now.toString());
        localStorage.setItem('tokenTimestamp', now.toString());

        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        // Initialize session management
        setupAutoLogout();
        setLastActivity(now);

        console.log('Authentication state updated successfully'); // Debug log
        console.log('Current state after update:', {
          tokenSet: !!newToken,
          userSet: !!userData,
          isAuthenticatedNow: !!(newToken && userData)
        });

        return { success: true, message: 'Login successful!' };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Something went wrong. Please try again later.' };
    }
  };

  const logout = (redirectToLogin = true, forceRefresh = false) => {
    console.log('🚪 Logging out user');

    // Clear state
    setToken(null);
    setUser(null);
    setLastActivity(0);
    setSessionWarningShown(false);

    // Clear localStorage completely
    localStorage.removeItem('authToken');
    localStorage.removeItem('sessionStartTime');
    localStorage.removeItem('tokenTimestamp');

    // Clear all localStorage items related to the app (optional - for complete cleanup)
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('auth') || key.startsWith('session') || key.startsWith('token')) {
        localStorage.removeItem(key);
      }
    });

    // Clear sessionStorage as well
    sessionStorage.clear();

    // Clear axios headers
    delete axios.defaults.headers.common['Authorization'];

    // Clear all timers
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      setSessionTimeout(null);
    }
    if (refreshTimeout) {
      clearTimeout(refreshTimeout);
      setRefreshTimeout(null);
    }

    console.log('✅ Logout completed');

    // Redirect to landing page (which contains login)
    if (redirectToLogin) {
      console.log('🔄 Redirecting to landing page');

      if (forceRefresh) {
        console.log('🔄 Force refreshing page for complete cleanup');
        // Force complete page refresh and redirect
        window.location.replace('/');
        // Backup method in case replace doesn't work
        setTimeout(() => {
          window.location.reload(true);
        }, 100);
      } else {
        // Use window.location to ensure complete redirect and clear any cached state
        window.location.href = '/';
      }
    }
  };

  const isAuthenticated = () => {
    // Check both state and localStorage for token
    const hasToken = token || localStorage.getItem('authToken');
    const hasUser = user;
    const authenticated = !!(hasToken && hasUser);

    return authenticated;
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    resetAutoLogout,
    refreshToken,
    lastActivity,
    sessionWarningShown
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
