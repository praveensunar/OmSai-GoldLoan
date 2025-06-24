import { useState } from 'react';
import { FaImage, FaExclamationTriangle } from 'react-icons/fa';

const ImageDisplay = ({ imageUrl, alt = "Image", className = "", onError, onLoad }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = (e) => {
    console.error('Image failed to load:', imageUrl);
    setImageError(true);
    setImageLoading(false);
    if (onError) onError(e);
  };

  const handleImageLoad = (e) => {
    console.log('Image loaded successfully:', imageUrl);
    setImageError(false);
    setImageLoading(false);
    if (onLoad) onLoad(e);
  };

  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') return false;
    
    // Check if it's a base64 image
    if (url.startsWith('data:image/')) return true;
    
    // Check if it's a valid HTTP/HTTPS URL
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  if (!isValidImageUrl(imageUrl)) {
    return (
      <div className={`bg-gray-100 rounded-xl flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <FaImage className="text-4xl mx-auto mb-2" />
          <p>No image available</p>
          {imageUrl && (
            <p className="text-xs mt-1 text-red-500">
              Invalid URL format
            </p>
          )}
        </div>
      </div>
    );
  }

  if (imageError) {
    return (
      <div className={`bg-gray-100 rounded-xl flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <FaExclamationTriangle className="text-4xl mx-auto mb-2 text-red-400" />
          <p>Image failed to load</p>
          <p className="text-xs mt-1 text-red-500">
            {imageUrl.length > 50 ? `${imageUrl.substring(0, 50)}...` : imageUrl}
          </p>
          <button
            onClick={() => {
              setImageError(false);
              setImageLoading(true);
            }}
            className="mt-2 text-xs text-blue-500 hover:text-blue-700 underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className={`absolute inset-0 bg-gray-100 rounded-xl flex items-center justify-center ${className}`}>
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-2"></div>
            <p className="text-sm">Loading image...</p>
          </div>
        </div>
      )}
      <img
        src={imageUrl}
        alt={alt}
        className={`${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ImageDisplay;
