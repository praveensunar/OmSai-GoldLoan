import React from 'react';
import { MdArrowBack, MdHome, MdPeople, MdPerson } from 'react-icons/md';
import { useNavigation } from '../../hooks/useNavigation';
import { useLocation } from 'react-router-dom';

/**
 * Reusable BackButton component with intelligent navigation
 * Automatically determines appropriate back destination and text
 */
const BackButton = ({
  className = '',
  variant = 'default',
  customText = null,
  customDestination = null,
  showIcon = true,
  size = 'medium',
  checkUnsavedChanges = false,
  hasUnsavedChanges = false
}) => {
  const { goBack, getBackButtonText, getBackDestination } = useNavigation();
  const location = useLocation();

  const handleClick = () => {
    // Check for unsaved changes if enabled
    if (checkUnsavedChanges && hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) {
        return; // Don't navigate if user cancels
      }
    }

    if (customDestination) {
      // Use custom destination if provided
      window.location.href = customDestination;
    } else {
      // Use intelligent back navigation
      goBack();
    }
  };

  const buttonText = customText || getBackButtonText();
  const destination = customDestination || getBackDestination();

  // Get appropriate icon based on destination
  const getIcon = () => {
    if (!showIcon) return null;
    
    if (destination === '/home') {
      return <MdHome className="text-xl" />;
    } else if (destination === '/customerdetail') {
      return <MdPeople className="text-xl" />;
    } else if (destination.startsWith('/customer/')) {
      return <MdPerson className="text-xl" />;
    } else {
      return <MdArrowBack className="text-xl" />;
    }
  };

  // Size variants
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  // Style variants
  const variantClasses = {
    default: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700',
    primary: 'bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white hover:from-[#8B7D5A] hover:to-[#7A6C49]',
    secondary: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700',
    outline: 'border-2 border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-500',
    ghost: 'text-gray-600 hover:bg-gray-100'
  };

  const baseClasses = `
    btn-hover-effect flex items-center justify-center gap-3 
    rounded-xl font-semibold transition-all duration-300 
    shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  return (
    <button
      onClick={handleClick}
      className={baseClasses}
      title={`Navigate to ${buttonText.toLowerCase()}`}
    >
      {getIcon()}
      {buttonText}
    </button>
  );
};

/**
 * Specialized back button variants for common use cases
 */
export const BackToHome = (props) => (
  <BackButton 
    {...props} 
    customText="Back to Dashboard"
    customDestination="/home"
    variant="primary"
  />
);

export const BackToCustomers = (props) => (
  <BackButton 
    {...props} 
    customText="Back to Customers"
    customDestination="/customerdetail"
    variant="secondary"
  />
);

export const BackToCustomer = ({ customerId, ...props }) => (
  <BackButton 
    {...props} 
    customText="Back to Customer"
    customDestination={`/customer/${customerId}`}
    variant="secondary"
  />
);

/**
 * Floating back button for mobile-friendly navigation
 */
export const FloatingBackButton = ({ className = '', ...props }) => (
  <div className={`fixed bottom-6 left-6 z-50 ${className}`}>
    <BackButton 
      {...props}
      size="medium"
      className="rounded-full shadow-2xl"
      showIcon={true}
      customText=""
    />
  </div>
);

export default BackButton;
