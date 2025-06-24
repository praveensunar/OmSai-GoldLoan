import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

/**
 * Custom hook for enhanced navigation with proper back button handling
 * Handles both UI back buttons and browser back button functionality
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationHistoryRef = useRef([]);

  useEffect(() => {
    // Track navigation history
    const currentPath = location.pathname;
    const history = navigationHistoryRef.current;
    
    // Don't add duplicate consecutive entries
    if (history.length === 0 || history[history.length - 1] !== currentPath) {
      navigationHistoryRef.current.push(currentPath);
    }
  }, [location.pathname]);

  /**
   * Navigate back with intelligent routing
   * Falls back to appropriate default pages if no history
   */
  const goBack = () => {
    const history = navigationHistoryRef.current;
    
    // If we have navigation history, go back
    if (history.length > 1) {
      // Remove current page from history
      history.pop();
      const previousPage = history[history.length - 1];
      navigate(previousPage);
    } else {
      // Fallback navigation based on current page
      const currentPath = location.pathname;
      
      if (currentPath.startsWith('/customer/')) {
        // From individual customer view, go to customer list
        navigate('/customerdetail');
      } else if (currentPath === '/addcustomer') {
        // From add customer, go to customer list
        navigate('/customerdetail');
      } else if (currentPath.startsWith('/updatecustomer/')) {
        // From update customer, go to customer view
        const customerId = currentPath.split('/')[2];
        navigate(`/customer/${customerId}`);
      } else if (currentPath === '/customerdetail') {
        // From customer list, go to home
        navigate('/home');
      } else if (currentPath === '/loanamount') {
        // From loan amount, go to home
        navigate('/home');
      } else {
        // Default fallback to home
        navigate('/home');
      }
    }
  };

  /**
   * Navigate to a specific route and update history
   */
  const navigateTo = (path, options = {}) => {
    navigate(path, options);
  };

  /**
   * Get the appropriate back destination without navigating
   */
  const getBackDestination = () => {
    const history = navigationHistoryRef.current;
    
    if (history.length > 1) {
      return history[history.length - 2];
    }
    
    // Return fallback destination
    const currentPath = location.pathname;
    
    if (currentPath.startsWith('/customer/')) {
      return '/customerdetail';
    } else if (currentPath === '/addcustomer') {
      return '/customerdetail';
    } else if (currentPath.startsWith('/updatecustomer/')) {
      const customerId = currentPath.split('/')[2];
      return `/customer/${customerId}`;
    } else if (currentPath === '/customerdetail') {
      return '/home';
    } else if (currentPath === '/loanamount') {
      return '/home';
    } else {
      return '/home';
    }
  };

  /**
   * Get user-friendly back button text
   */
  const getBackButtonText = () => {
    const destination = getBackDestination();
    
    switch (destination) {
      case '/home':
        return 'Back to Dashboard';
      case '/customerdetail':
        return 'Back to Customers';
      case destination.startsWith('/customer/') ? destination : null:
        return 'Back to Customer';
      default:
        return 'Back';
    }
  };

  return {
    goBack,
    navigateTo,
    getBackDestination,
    getBackButtonText,
    currentPath: location.pathname
  };
};

/**
 * Hook to handle browser back button behavior
 * Prevents accidental navigation away from forms with unsaved changes
 */
export const useBrowserBackButton = (hasUnsavedChanges = false, onBackAttempt = null) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasUnsavedChanges) return; // Only add protection if there are unsaved changes

    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ''; // Required for Chrome
        return 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    const handlePopState = (event) => {
      if (hasUnsavedChanges) {
        // Show confirmation dialog
        const confirmLeave = window.confirm(
          'You have unsaved changes. Are you sure you want to leave this page?'
        );

        if (confirmLeave) {
          // Allow navigation
          if (onBackAttempt) {
            onBackAttempt();
          } else {
            navigate(-1);
          }
        } else {
          // Stay on current page by pushing current state again
          window.history.pushState(null, '', window.location.pathname);
        }
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // Push current state to enable popstate detection
    window.history.pushState(null, '', window.location.pathname);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [hasUnsavedChanges, onBackAttempt, navigate]);
};
