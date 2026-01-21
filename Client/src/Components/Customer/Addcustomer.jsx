import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiShakingHands, GiGoldBar } from "react-icons/gi";
import { MdBackspace, MdOutlineSaveAlt, MdPerson, MdPhone, MdLocationOn, MdAttachMoney, MdPercent, MdDateRange, MdCloudUpload, MdCameraAlt, MdPhotoLibrary } from 'react-icons/md';
import { FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
// Removed useBrowserBackButton import to fix alert issue
import BackButton from '../common/BackButton';

function Addcustomer() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [loanDate, setLoanDate] = useState(new Date().toISOString().split('T')[0]);
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [itemName, setItemname] = useState("");
  const [itemWeight, setItemweight] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { resetAutoLogout } = useAuth();
  // const API_URL = import.meta.env.VITE_API_URL;

  // Detect mobile device and camera support
  useEffect(() => {
  const checkMobile = async () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileDevice = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

    // Check if getUserMedia is supported
    const hasCamera = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

    setIsMobile(isMobileDevice && hasCamera);
  };

  checkMobile();
}, []);


  // Check if form has unsaved changes (only meaningful data, not empty strings)
  const hasUnsavedChanges = Boolean(
    (name && name.trim()) ||
    (mobile && mobile.trim()) ||
    (address && address.trim()) ||
    (loanAmount && loanAmount.trim()) ||
    (interestRate && interestRate.trim()) ||
    (itemName && itemName.trim()) ||
    (itemWeight && itemWeight.trim()) ||
    imageUrl
  );

  // Simple browser navigation protection (only for page refresh/close)
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ''; // Required for Chrome
        return 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);
 
  const validateForm = () => {
    const newErrors = {};
    const errorMessages = [];

    // Required field validations
    if (!name.trim()) {
      newErrors.name = "Name is required";
      errorMessages.push("• Customer name is mandatory");
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      errorMessages.push("• Mobile number is mandatory");
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
      errorMessages.push("• Mobile number must be exactly 10 digits");
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
      errorMessages.push("• Address is mandatory");
    }

    if (!loanAmount.trim()) {
      newErrors.loanAmount = "Loan amount is required";
      errorMessages.push("• Loan amount is mandatory");
    } else if (isNaN(loanAmount) || parseFloat(loanAmount) <= 0) {
      newErrors.loanAmount = "Valid loan amount is required";
      errorMessages.push("• Loan amount must be a valid positive number");
    }

    if (!interestRate.trim()) {
      newErrors.interestRate = "Interest rate is required";
      errorMessages.push("• Interest rate is mandatory");
    } else if (isNaN(interestRate) || parseFloat(interestRate) <= 0) {
      newErrors.interestRate = "Valid interest rate is required";
      errorMessages.push("• Interest rate must be a valid positive number");
    }

    if (!itemName.trim()) {
      newErrors.itemName = "Item name is required";
      errorMessages.push("• Item name is mandatory");
    }

    if (!itemWeight.trim()) {
      newErrors.itemWeight = "Item weight is required";
      errorMessages.push("• Item weight is mandatory");
    } else if (isNaN(itemWeight) || parseFloat(itemWeight) <= 0) {
      newErrors.itemWeight = "Valid item weight is required";
      errorMessages.push("• Item weight must be a valid positive number");
    }

    if (!loanDate) {
      newErrors.loanDate = "Loan date is required";
      errorMessages.push("• Loan date is mandatory");
    }

    setErrors(newErrors);

    // Show validation modal if there are errors
    if (errorMessages.length > 0) {
      setValidationErrors(errorMessages);
      setShowValidationModal(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    resetAutoLogout();

    // TEMPORARY: Development mode fallback for CORS issues
    const isDevelopment = window.location.hostname === 'localhost';

    // Debug: Log the exact values being processed
    console.log('Form values before processing:', {
      itemWeight: itemWeight,
      itemWeightType: typeof itemWeight,
      interestRate: interestRate,
      interestRateType: typeof interestRate,
      loanAmount: loanAmount,
      loanAmountType: typeof loanAmount
    });

    // Process values with proper decimal handling
    const processedLoanAmount = Number(parseFloat(loanAmount).toFixed(2));
    const processedInterestRate = Number(parseFloat(interestRate).toFixed(3));
    const processedItemWeight = Number(parseFloat(itemWeight).toFixed(3));

    console.log('Processed values:', {
      processedItemWeight,
      processedInterestRate,
      processedLoanAmount
    });

    try {
      await axios.post('https://omsai-goldloan.onrender.com/addcustomer',
        // await axios.post(`${API_URL}/addcustomer`, 
        {
        name: name.trim(),
        mobile: mobile.trim(),
        address: address.trim(),
        loanDate,
        loanAmount: processedLoanAmount,
        interestRate: processedInterestRate,
        itemName: itemName.trim(),
        itemWeight: processedItemWeight,
        status: 'Active', // Default status for new customers
        imageUrl: imageUrl || '' // Use empty string if no image uploaded
      }, {
        timeout: isDevelopment ? 5000 : 15000 // Shorter timeout in development
      });

      toast.success("Customer added successfully!");
      setTimeout(() => navigate('/customerdetail'), 1500);
    } catch (error) {
      console.error("Error adding customer:", error);

      // Development mode fallback for CORS issues
      if (isDevelopment && (error.code === 'ERR_NETWORK' || error.message?.includes('CORS'))) {
        console.warn('Using development fallback due to CORS/Network error');

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create mock customer data
        const mockCustomer = {
          _id: `mock_${Date.now()}`,
          name: name.trim(),
          mobile: mobile.trim(),
          address: address.trim(),
          loanDate,
          loanAmount: processedLoanAmount,
          interestRate: processedInterestRate,
          itemName: itemName.trim(),
          itemWeight: processedItemWeight,
          status: 'Active',
          imageUrl: imageUrl || '',
          createdAt: new Date().toISOString()
        };

        // Store in localStorage for development
        const existingCustomers = JSON.parse(localStorage.getItem('mockCustomers') || '[]');
        existingCustomers.push(mockCustomer);
        localStorage.setItem('mockCustomers', JSON.stringify(existingCustomers));

        toast.success("✅ Customer added successfully! (Development Mode - Mock Data)");
        toast.info("💡 CORS issue detected. Using local storage for development.");

        // Show image storage info
        if (imageUrl) {
          if (imageUrl.startsWith('data:image/')) {
            toast.info("📷 Image stored locally as base64 (will work in development)");
          } else {
            toast.success("📷 Image uploaded to Cloudinary successfully!");
          }
        }

        setTimeout(() => navigate('/customerdetail'), 2000);
        return;
      }

      // Handle different types of errors for production
      if (error.code === 'ERR_NETWORK' || error.code === 'ERR_INSUFFICIENT_RESOURCES') {
        toast.error("Unable to connect to server. Please check your connection and try again.");
      } else if (error.response?.status === 413) {
        toast.error("Data too large! Please use a smaller image (under 2MB) and try again.");
      } else if (error.message?.includes('CORS') || error.message?.includes('Access-Control-Allow-Origin')) {
        toast.error("Server configuration issue (CORS). Please contact administrator or try again later.");
      } else if (error.response?.status === 400) {
        toast.error("Mobile number is already registered or invalid data provided.");
      } else if (error.code === 'ECONNABORTED') {
        toast.error("Request timed out. Please try again.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Failed to add customer. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Native camera capture function - opens device camera app
  const openNativeCamera = () => {
    // Create a hidden file input with camera capture
    const cameraInput = document.createElement('input');
    cameraInput.type = 'file';
    cameraInput.accept = 'image/*';
    cameraInput.capture = 'environment'; // Use back camera
    cameraInput.style.display = 'none';

    // Handle the captured photo
    cameraInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log('📷 Photo captured from camera:', file.name);
        handleFileUpload({ target: { files: [file] } });
      }
      // Clean up
      document.body.removeChild(cameraInput);
    };

    // Add to DOM and trigger click
    document.body.appendChild(cameraInput);
    cameraInput.click();
  };

  // Test Cloudinary configuration
  const testCloudinaryConfig = async () => {
    try {
      console.log('Testing Cloudinary configuration...');
      const testResponse = await fetch('https://api.cloudinary.com/v1_1/praveensunar/image/upload', {
        method: 'POST',
        body: new FormData() // Empty form data just to test endpoint
      });
      console.log('Cloudinary test response:', testResponse.status);
      return testResponse.status !== 404; // 404 means wrong cloud name
    } catch (error) {
      console.error('Cloudinary test failed:', error);
      return false;
    }
  };

  // Image compression function
  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP)");
      return;
    }

    // Initial file size check (before compression)
    const maxInitialSize = 10 * 1024 * 1024; // 10MB initial limit
    if (file.size > maxInitialSize) {
      toast.error("File size must be less than 10MB. Please choose a smaller file.");
      return;
    }

    const isDevelopment = window.location.hostname === 'localhost';

    // Try Cloudinary first, fallback to base64
    try {
      setUploadProgress(10);
      resetAutoLogout();

      console.log('Starting image upload...');
      console.log('Original file details:', {
        name: file.name,
        size: file.size,
        type: file.type
      });

      // Compress image if it's too large
      let processedFile = file;
      if (file.size > 1 * 1024 * 1024) { // If larger than 1MB, compress
        console.log('Compressing image...');
        setUploadProgress(20);
        toast.info("Compressing image for better upload...");

        processedFile = await compressImage(file);
        console.log('Compressed file size:', processedFile.size);

        // Check if compressed file is still too large
        if (processedFile.size > 2 * 1024 * 1024) { // 2MB limit
          toast.error("Image is still too large after compression. Please use a smaller image.");
          setUploadProgress(0);
          return;
        }
      }

      // Always try Cloudinary upload first (both development and production)
      console.log('Trying Cloudinary upload...');
      const data = new FormData();
      data.append("file", processedFile);
      data.append("upload_preset", "goldloan");
      data.append("cloud_name", "praveensunar");

      try {
        setUploadProgress(40);
        const response = await fetch("https://api.cloudinary.com/v1_1/praveensunar/image/upload", {
          method: 'POST',
          body: data
        });

        console.log('Cloudinary response status:', response.status);

        if (response.ok) {
          const result = await response.json();
          console.log('Cloudinary upload result:', result);
          setUploadProgress(100);
          setImageUrl(result.secure_url || result.url);
          toast.success("✅ Image uploaded to Cloudinary successfully!");
          // toast.info(`📷 Image URL: ${result.secure_url || result.url}`);
          setTimeout(() => setUploadProgress(0), 2000);
          return;
        } else {
          const errorText = await response.text();
          console.error('Cloudinary error response:', errorText);
          throw new Error(`Cloudinary upload failed: ${response.status} - ${errorText}`);
        }
      } catch (cloudinaryError) {
        console.error('Cloudinary upload failed:', cloudinaryError);
        toast.error(`❌ Cloudinary upload failed: ${cloudinaryError.message}`);

        // Only use base64 as last resort
        if (isDevelopment) {
          toast.warning("⚠️ Falling back to base64 storage for development...");
        } else {
          toast.error("❌ Image upload failed. Please try again or contact support.");
          setUploadProgress(0);
          return;
        }
      }

      // Fallback to base64 conversion (only in development when Cloudinary fails)
      if (isDevelopment) {
        console.log('Using base64 fallback for development...');
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result;
          setUploadProgress(100);
          setImageUrl(base64);
          toast.warning("⚠️ Image stored as base64 (development fallback)");
          toast.info("💡 For production, fix Cloudinary configuration");
          setTimeout(() => setUploadProgress(0), 2000);
        };

        reader.onerror = () => {
          console.error('FileReader error');
          toast.error("Failed to process image file");
          setUploadProgress(0);
        };

        setUploadProgress(60);
        reader.readAsDataURL(processedFile);
      }

    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try again.");

      // Clear the file input
      event.target.value = '';
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="text-6xl text-[#9C8E6B] animate-float">
              <GiShakingHands />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Add New Customer</h1>
          <p className="text-gray-600 text-lg">Register a new customer for gold loan services</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <MdPerson className="text-[#9C8E6B]" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <div className="relative">
                    <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter customer's full name"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                  <div className="relative">
                    <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 ${
                        errors.mobile ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                    />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address *</label>
                  <div className="relative">
                    <MdLocationOn className="absolute left-3 top-4 text-gray-400" />
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows="3"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 resize-none ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter complete address"
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>
              </div>
            </div>

            {/* Loan Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <MdAttachMoney className="text-[#9C8E6B]" />
                Loan Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Loan Amount (₹) *</label>
                  <div className="relative">
                    <MdAttachMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 ${
                        errors.loanAmount ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter loan amount (e.g., 50000.50)"
                      min="0"
                      step="any"
                    />
                  </div>
                  {errors.loanAmount && <p className="text-red-500 text-sm">{errors.loanAmount}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Interest Rate (%) *</label>
                  <div className="relative">
                    <MdPercent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 ${
                        errors.interestRate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter interest rate (e.g., 3 for 3%)"
                      min="0"
                      step="any"
                    />
                  </div>
                  {errors.interestRate && <p className="text-red-500 text-sm">{errors.interestRate}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Loan Date *</label>
                  <div className="relative">
                    <MdDateRange className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={loanDate}
                      onChange={(e) => setLoanDate(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 ${
                        errors.loanDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.loanDate && <p className="text-red-500 text-sm">{errors.loanDate}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Default Status</label>
                  <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 font-medium">Active</span>
                      <span className="text-green-600 text-sm">(Auto-assigned)</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">New customers are automatically set to Active status</p>
                </div>
              </div>
            </div>

            {/* Item Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <GiGoldBar className="text-[#9C8E6B]" />
                Item Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Item Name *</label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemname(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 ${
                      errors.itemName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Gold Chain, Ring, Bracelet"
                  />
                  {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Item Weight (grams) *</label>
                  <input
                    type="number"
                    value={itemWeight}
                    onChange={(e) => setItemweight(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 ${
                      errors.itemWeight ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter weight in grams (e.g., 10.5)"
                    min="0"
                    step="any"
                  />
                  {errors.itemWeight && <p className="text-red-500 text-sm">{errors.itemWeight}</p>}
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="pb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <MdCloudUpload className="text-[#9C8E6B]" />
                Item Image
                <span className="text-sm text-gray-500 font-normal">(Optional)</span>
              </h2>
              <div className="space-y-4">
                <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-300 ${
                  uploadProgress > 0 && uploadProgress < 100
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-300 hover:border-[#9C8E6B]'
                }`}>
                  <MdCloudUpload className={`mx-auto text-4xl mb-4 ${
                    uploadProgress > 0 && uploadProgress < 100 ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  {/* Upload Options */}
                  <div className="space-y-3">
                    {isMobile ? (
                      // Mobile: Show camera and gallery options
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        {/* Native Camera Button */}
                        <button
                          type="button"
                          onClick={openNativeCamera}
                          disabled={uploadProgress > 0 && uploadProgress < 100}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#9C8E6B] text-white rounded-xl hover:bg-[#8B7D5A] transition-colors duration-300 disabled:opacity-50"
                        >
                          <MdCameraAlt className="text-lg" />
                          📷 Open Camera
                        </button>

                        {/* Alternative: Direct Camera Input */}
                        <label className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
                          <MdCameraAlt className="text-lg" />
                          📸 Take Photo
                          <input
                            type="file"
                            onChange={handleFileUpload}
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            disabled={uploadProgress > 0 && uploadProgress < 100}
                          />
                        </label>

                        {/* Gallery Option */}
                        <label className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                          <MdPhotoLibrary className="text-lg" />
                          📁 Gallery
                          <input
                            type="file"
                            onChange={handleFileUpload}
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            className="hidden"
                            disabled={uploadProgress > 0 && uploadProgress < 100}
                          />
                        </label>
                      </div>
                    ) : (
                      // Desktop: Traditional file upload
                      <label className="cursor-pointer">
                        <span className="text-[#9C8E6B] font-medium hover:text-[#8B7D5A]">
                          {uploadProgress > 0 && uploadProgress < 100 ? 'Uploading...' : 'Click to upload'}
                        </span>
                        <span className="text-gray-500"> or drag and drop</span>
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                          className="hidden"
                          disabled={uploadProgress > 0 && uploadProgress < 100}
                        />
                      </label>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {isMobile ? '📷 Open Camera: Opens camera app | 📸 Take Photo: Quick capture | 📁 Gallery: Choose existing photo' : 'JPEG, PNG, GIF, WebP up to 10MB (auto-compressed for upload)'}
                  </p>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <p className="text-sm text-blue-600 mt-2 font-medium">Uploading: {uploadProgress}%</p>
                  )}
                  <div className="mt-3 text-xs text-gray-400">
                    <p>• Image upload is optional - you can save customer without image</p>
                    <p>• If upload fails, image will be stored locally as backup</p>
                  </div>
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}

                {uploadProgress === 100 && !imageUrl && (
                  <div className="text-center py-4">
                    <FaSpinner className="animate-spin text-2xl text-blue-500 mx-auto mb-2" />
                    <p className="text-sm text-blue-600">Processing image...</p>
                  </div>
                )}

                {imageUrl && (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt="Uploaded item"
                          className="max-w-xs rounded-xl shadow-lg border-2 border-green-200"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                          <FaCheckCircle className="text-sm" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setImageUrl('');
                          setUploadProgress(0);
                        }}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove Image
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`btn-hover-effect flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <FaSpinner className="animate-spin text-xl" />
                ) : (
                  <MdOutlineSaveAlt className="text-xl" />
                )}
                {loading ? 'Saving...' : 'Save Customer'}
              </button>

              <BackButton
                variant="default"
                size="large"
                className="flex-1 sm:flex-none"
                checkUnsavedChanges={true}
                hasUnsavedChanges={hasUnsavedChanges}
              />
            </div>
          </form>
        </div>

        {/* Validation Modal */}
        {showValidationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FaExclamationTriangle className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Form Validation Error</h3>
                    <p className="text-gray-600">Please fix the following issues:</p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <ul className="space-y-2 text-red-700">
                    {validationErrors.map((error, index) => (
                      <li key={index} className="text-sm">{error}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowValidationModal(false)}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                  >
                    Fix Issues
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Addcustomer;
