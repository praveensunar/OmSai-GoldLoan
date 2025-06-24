import { useEffect, useState } from 'react';
import { MdBackspace, MdOutlineSaveAlt, MdPerson, MdPhone, MdLocationOn, MdAttachMoney, MdPercent, MdDateRange, MdEdit } from "react-icons/md";
import { GiGoldBar, GiReceiveMoney } from "react-icons/gi";
import { FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
// Removed navigation hooks to prevent alert conflicts
import { BackToCustomer } from '../common/BackButton';

function UpdateCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resetAutoLogout } = useAuth();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setFetchLoading(true);
        resetAutoLogout();
        console.log(`Fetching customer for update: ${id}`);

        const response = await axios.get(`/api/customer/${id}`, {
          timeout: 15000 // 15 second timeout
        });
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer:", error);

        // Handle different types of errors without continuous popups
        if (error.code === 'ERR_NETWORK' || error.code === 'ERR_INSUFFICIENT_RESOURCES') {
          console.log('Network error - server might be down');
          // Don't show toast for network errors to avoid spam
          navigate('/customerdetail');
        } else if (error.response?.status === 404) {
          toast.error("Customer not found.");
          navigate('/customerdetail');
        } else if (error.code === 'ECONNABORTED') {
          toast.error("Request timed out. Please try again.");
          navigate('/customerdetail');
        } else {
          toast.error("Failed to load customer data.");
          navigate('/customerdetail');
        }
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]); // Remove all other dependencies to prevent infinite loops

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customer.name?.trim()) newErrors.name = "Name is required";
    if (!customer.mobile?.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(customer.mobile)) newErrors.mobile = "Mobile number must be 10 digits";
    if (!customer.address?.trim()) newErrors.address = "Address is required";
    if (!customer.loanAmount) newErrors.loanAmount = "Loan amount is required";
    else if (isNaN(customer.loanAmount) || parseFloat(customer.loanAmount) <= 0) newErrors.loanAmount = "Valid loan amount is required";
    if (!customer.interestRate) newErrors.interestRate = "Interest rate is required";
    else if (isNaN(customer.interestRate) || parseFloat(customer.interestRate) <= 0) newErrors.interestRate = "Valid interest rate is required";
    if (!customer.itemWeight) newErrors.itemWeight = "Item weight is required";
    else if (isNaN(customer.itemWeight) || parseFloat(customer.itemWeight) <= 0) newErrors.itemWeight = "Valid item weight is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!customer) return;

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    resetAutoLogout();

    try {
      await axios.put(`/api/updatecustomer/${id}`, customer, {
        timeout: 15000 // 15 second timeout
      });
      toast.success("Customer updated successfully!");
      setTimeout(() => navigate(`/customer/${id}`), 1500);
    } catch (error) {
      console.error("Error updating customer:", error);

      // Handle different types of errors
      if (error.code === 'ERR_NETWORK' || error.code === 'ERR_INSUFFICIENT_RESOURCES') {
        toast.error("Unable to connect to server. Please check your connection and try again.");
      } else if (error.response?.status === 404) {
        toast.error("Customer not found. It may have been deleted.");
      } else if (error.code === 'ECONNABORTED') {
        toast.error("Update request timed out. Please try again.");
      } else if (error.response?.status === 400) {
        toast.error("Invalid data provided. Please check your inputs.");
      } else {
        toast.error("Failed to update customer. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-[#9C8E6B] mx-auto mb-4" />
          <p className="text-gray-600 text-xl">Loading customer data...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md mx-auto p-8">
          <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Customer</h2>
          <p className="text-gray-600 text-lg mb-6">
            We couldn't load the customer data for editing. This might be due to:
          </p>
          <ul className="text-left text-gray-600 mb-6 space-y-2">
            <li>• Server connection issues</li>
            <li>• Customer record not found</li>
            <li>• Network connectivity problems</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
            <BackToCustomer
              customerId={id}
              variant="primary"
              size="medium"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="text-6xl text-[#9C8E6B] animate-float">
              <MdEdit />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Update Customer</h1>
          <p className="text-gray-600 text-lg">Modify customer information and loan details</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <div className="flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-[#9C8E6B]/10 to-[#ffd700]/10 rounded-2xl">
            <div className="text-4xl text-[#9C8E6B]">
              <MdPerson />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{customer.name}</h2>
              <p className="text-gray-600">Customer ID: {customer._id?.slice(-8).toUpperCase()}</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <MdPerson className="text-[#9C8E6B]" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <div className="relative">
                    <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={customer.name || ''}
                      onChange={handleChange}
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
                      name="mobile"
                      value={customer.mobile || ''}
                      onChange={handleChange}
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
                      name="address"
                      value={customer.address || ''}
                      onChange={handleChange}
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
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <GiReceiveMoney className="text-[#9C8E6B]" />
                Loan Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Loan Amount (₹) *</label>
                  <div className="relative">
                    <MdAttachMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="loanAmount"
                      value={customer.loanAmount || ''}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 ${
                        errors.loanAmount ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter loan amount"
                      min="1"
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
                      name="interestRate"
                      value={customer.interestRate || ''}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 ${
                        errors.interestRate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter interest rate"
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                  {errors.interestRate && <p className="text-red-500 text-sm">{errors.interestRate}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Loan Date</label>
                  <div className="relative">
                    <MdDateRange className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="loanDate"
                      value={customer.loanDate || ''}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Item Information Section */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <GiGoldBar className="text-[#9C8E6B]" />
                Item Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Item Name</label>
                  <input
                    type="text"
                    name="itemName"
                    value={customer.itemName || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300"
                    placeholder="e.g., Gold Chain, Ring, Bracelet"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Item Weight (grams) *</label>
                  <input
                    type="number"
                    name="itemWeight"
                    value={customer.itemWeight || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 ${
                      errors.itemWeight ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter weight in grams"
                    min="0.1"
                    step="0.1"
                  />
                  {errors.itemWeight && <p className="text-red-500 text-sm">{errors.itemWeight}</p>}
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="pb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FaCheckCircle className="text-[#9C8E6B]" />
                Loan Status
              </h3>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-red-700">Completion Date</label>
                  <div className="relative">
                    <MdDateRange className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" />
                    <input
                      type="date"
                      name="status"
                      value={customer.status || ''}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <p className="text-red-600 text-sm">
                    Set the completion date when the loan is fully repaid
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-200">
            <Link
              to={`/customer/${id}`}
              className="btn-hover-effect flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl text-lg font-semibold hover:from-gray-600 hover:to-gray-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MdBackspace className="text-xl" />
              Cancel & Go Back
            </Link>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className={`btn-hover-effect flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 text-white'
              }`}
            >
              {loading ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                <MdOutlineSaveAlt className="text-xl" />
              )}
              {loading ? 'Updating...' : 'Update Customer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCustomer;
