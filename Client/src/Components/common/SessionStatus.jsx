import React, { useState, useEffect } from 'react';
import { FaClock, FaShieldAlt, FaSync } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { useAuth } from '../../contexts/AuthContext';

const SessionStatus = ({ className = '', showDetails = false }) => {
  const { token, lastActivity, refreshToken, sessionWarningShown } = useAuth();
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessionAge, setSessionAge] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!token) return;

    const updateTimer = () => {
      const sessionStart = localStorage.getItem('sessionStartTime');
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');
      
      if (sessionStart && tokenTimestamp) {
        const now = Date.now();
        const sessionDuration = 30   * 60 * 1000; // 30 minutes
        const sessionStartTime = parseInt(sessionStart);
        const tokenTime = parseInt(tokenTimestamp);
        
        const sessionElapsed = now - sessionStartTime;
        const tokenElapsed = now - tokenTime;
        const remaining = sessionDuration - Math.max(sessionElapsed, tokenElapsed);
        
        setTimeLeft(Math.max(0, remaining));
        setSessionAge(sessionElapsed);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [token, lastActivity]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    if (timeLeft > 10 * 60 * 1000) return 'text-green-600'; // > 10 min
    if (timeLeft > 5 * 60 * 1000) return 'text-red-600';  // > 5 min
    return 'text-red-600'; // < 5 min
  };

  const getStatusIcon = () => {
    if (timeLeft > 10 * 60 * 1000) return <FaShieldAlt className="text-green-600" />;
    if (timeLeft > 5 * 60 * 1000) return <FaClock className="text-red-600" />;
    return <MdSecurity className="text-red-600" />;
  };

  const handleRefreshToken = async () => {
    await refreshToken();
  };

  if (!token) return null;

  return (
    <div className={`${className}`}>
      {/* Compact Status Indicator */}
      {!showDetails && (
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsVisible(!isVisible)}
          title="Click to view session details"
        >
          {getStatusIcon()}
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      )}

      {/* Detailed Status Panel */}
      {(showDetails || isVisible) && (
        <div className="bg-white rounded-lg shadow-lg border p-4 min-w-64">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <MdSecurity className="text-blue-600" />
              Session Status
            </h3>
            {!showDetails && (
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          <div className="space-y-3">
            {/* Time Remaining */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Time Remaining:</span>
              <span className={`font-mono font-semibold ${getStatusColor()}`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Session Age */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Session Age:</span>
              <span className="font-mono text-sm text-gray-700">
                {formatTime(sessionAge)}
              </span>
            </div>

            {/* Warning Status */}
            {sessionWarningShown && (
              <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                <FaClock className="text-yellow-600" />
                <span className="text-sm text-yellow-800">Session expiring soon</span>
              </div>
            )}

            {/* Refresh Button */}
            <button
              onClick={handleRefreshToken}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
            >
              <FaSync className="text-sm" />
              Refresh Session
            </button>

            {/* Auto-refresh Info */}
            <div className="text-xs text-gray-500 text-center">
              Session auto-refreshes at 25 minutes
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionStatus;
